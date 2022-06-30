import swUrl from 'bundle:./service-worker.ts'
import type { FunctionalComponent } from 'preact'
import {
  ErrorBoundary,
  hydrate,
  lazy,
  LocationProvider,
  prerender as ssr,
  Route,
  Router
} from 'preact-iso'
import { useCallback, useEffect } from 'preact/hooks'
import { BackgroundContext } from './background-context'
import { Index } from './components/index'
import { NotFound } from './components/not-found'
import { DBContext } from './db-context'
import { getScores } from './get-scores'
import type { Score } from './models'
import { PrerenderContext } from './prerender-context'

if ('navigator' in self && 'serviceWorker' in navigator) {
  // NOTE: work around a problem with wmr's support for keeping assets at the root
  const betterUrl = swUrl.toString().replace(/chunks\//, '')

  navigator.serviceWorker.register(betterUrl, { scope: '/' })
    .then(reg => {
      return reg.update()
    })
    .catch(e => {
      console.error('error registering or updating the service worker', e)
    })
}

type Props = {
  isPrerender?: boolean
  preloadedScores?: Score[]
}

const App: FunctionalComponent<Props> = ({ isPrerender, preloadedScores }) => {
  return (
    <PrerenderContext isPrenderer={!!isPrerender}>
      <BackgroundContext>
        <DBContext>
          <LocationProvider>
            <ErrorBoundary>
              <Router>
                <Route path='/' component={Index} preloadedScores={preloadedScores} />
                <Route default component={NotFound} />
              </Router>
            </ErrorBoundary>
          </LocationProvider>
        </DBContext>
      </BackgroundContext>
    </PrerenderContext>
  )
}

hydrate(<App {...getPrerenderedData()} />)

export async function prerender() {
  // NOTE: prerender only happens in node
  require('isomorphic-fetch')

  const response = await getScores()

  const data: Props = {
    preloadedScores: response.scores
  }

  const result = await ssr(
    <App {...data} isPrerender={true} />
  )

  return { data, ...result }
}

function getPrerenderedData(): Props {
  // NOTE: preload isodata if possible, not sure why preact-iso or wmr doesn't do this for us
  let preData: Props = {}

  if ('document' in globalThis) {
    const dataTag = document.querySelector('script[type="isodata"]')
    if (dataTag) {
      const data = JSON.parse(dataTag.innerHTML) as Props
      preData.preloadedScores = data.preloadedScores
    }
  }

  return preData
}
