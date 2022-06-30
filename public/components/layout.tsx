import type { FunctionalComponent, VNode } from 'preact'
import styles from './layout.module.css'

type Props = {
  title?: VNode | string
}

const defaultTitle = 'Wordle Scores'

export const Layout: FunctionalComponent<Props> = ({ children }) => (
  <div class={styles.wrapper}>
    {children}
    <footer class={styles.footer}>
      <p>
        Created with <span class={styles.heart}>♥</span> by the folks at{' '}
        <a href='https://shareup.app' class={styles.link}>Shareup</a>
      </p>
    </footer>
  </div>
)
