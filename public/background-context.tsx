import { createContext } from 'preact'
import type { FunctionalComponent } from 'preact'
import { useContext, useEffect, useState } from 'preact/hooks'

type Value = Worker | undefined

const Context = createContext<Value>(undefined)

export function useBackground(): Value {
  return useContext(Context)
}

export const BackgroundContext: FunctionalComponent = ({ children }) => {
  const [state, setWorker] = useState<Value>(undefined)

  useEffect(() => {
    const url = new URL('./background.ts', import.meta.url)
    const worker = new Worker(url, { type: 'module' })
    console.debug({ worker })
    setWorker(worker)
  }, [])

  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  )
}
