import { createContext } from 'preact'
import type { FunctionalComponent } from 'preact'
import { useContext } from 'preact/hooks'

const Context = createContext<boolean>(false)

export function isPrerenderContext(): boolean {
  return useContext(Context)
}

type Props = {
  isPrenderer: boolean
}

export const PrerenderContext: FunctionalComponent<Props> = ({ isPrenderer, children }) => {
  return (
    <Context.Provider value={isPrenderer}>
      {children}
    </Context.Provider>
  )
}
