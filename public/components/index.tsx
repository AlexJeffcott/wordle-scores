import type { FunctionalComponent } from 'preact'
import { useEffect } from 'preact/hooks'
import { useBackground } from '../background-context'
import { useDB } from '../db-context'
import { useFetched } from '../hooks/use-fetched'
import type { Score } from '../models'
import { Layout } from './layout'
import { ScoresList } from './scores-list'

type Props = {
  preloadedScores?: Score[]
}

export const Index: FunctionalComponent<Props> = ({ preloadedScores }) => {
  const db = useDB()

  const { state: scores, error, refetch } = useFetched(preloadedScores, async () => {
    if (!db) { return preloadedScores }
    return db.getAll('scores')
  }, [db])

  const bgWorker = useBackground()

  const messageHandler = (e: MessageEvent) => {
    if (e.data.type === 'scoresUpdated') {
      refetch()
    }
  }

  useEffect(() => {
    if (bgWorker) {
      bgWorker.addEventListener('message', messageHandler)
    }
    return () => bgWorker?.removeEventListener('message', messageHandler)
  }, [bgWorker, db])

  return (
    <Layout>
      <main>
        <Switch hasDB={!!db} scores={scores} />
      </main>
    </Layout>
  )
}

type SwitchProps = {
  hasDB: boolean
  scores?: Score[]
}

const Switch: FunctionalComponent<SwitchProps> = ({ hasDB, scores }) => {
  if (Array.isArray(scores)) {
    return <ScoresList scores={scores} />
  } else if (hasDB && !scores) {
    return <Fetching />
  } else {
    return <Initializing />
  }
}

const Initializing: FunctionalComponent = () => <p>Initializing database…</p>
const Fetching: FunctionalComponent = () => <p>Fetching scores…</p>
