import type { FunctionalComponent } from 'preact'
import { useCallback } from 'preact/hooks'
import { Layout } from '../components/layout'
import styles from './not-found.module.css'

export const NotFound: FunctionalComponent = () => {
  const goBack = useCallback((e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    history.back()
  }, [])

  return (
    <Layout>
      <div class={styles.wrapper}>
        <nav class={styles.nav}>
          <a href='/' onClick={goBack} class={styles.backButton}>↩ Back</a>
        </nav>
        <h1 class={styles.header}>404 not found 🤷</h1>
      </div>
    </Layout>
  )
}
