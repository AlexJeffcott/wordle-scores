import type { FunctionalComponent } from 'preact'
import type { Score } from '../models'
import styles from './score-item.module.css'

type Props = {
  score: Score
}

export const ScoreItem: FunctionalComponent<Props> = ({ score }) => (
  <li class={styles.item}>
    <dl>
      <dt>id</dt>
      <dd>{score.id}</dd>
      <dt>date</dt>
      <dd>{score.date}</dd>
      <dt>word</dt>
      <dd>{score.word}</dd>
      <dt>tries</dt>
      <dd>{score.tries.join(', ')}</dd>
    </dl>
  </li>
)
