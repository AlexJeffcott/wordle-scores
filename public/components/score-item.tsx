import type { FunctionalComponent } from 'preact'
import type { Score } from '../models'
import styles from './score-item.module.css'

const getMatchStyle = (word: string, letter: string, letterIndex: number): string => {
  if (word[letterIndex] === letter) {
    return styles.fullMatch
  } else if (word.includes(letter)) {
    return styles.partialMatch
  } else {
    return ''
  }
}

const getFormattedDate = (dateStr: string, locale = 'en-US') => {
  return new Date(dateStr).toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

type Props = {
  score: Score
}

export const ScoreItem: FunctionalComponent<Props> = ({ score }) => (
  <li class={styles.item}>
    <div class={styles.header}>
      <b>{getFormattedDate(score.date)}</b>
      <p>
        {score.word === score.tries[score.tries.length - 1]
          ? `You did it in ${score.tries.length} tries!`
          : `Better luck next time!`}
      </p>
    </div>
    <div class={styles.tries}>
      {score.tries.map(word => {
        return Array.from(word).map((letter, letterIndex) => {
          return (
            <span
              key={letterIndex}
              class={`${styles.letter} ${getMatchStyle(score.word, letter, letterIndex)}`}
            >
              {letter}
            </span>
          )
        })
      })}
    </div>
    <i class={styles.footer}>#{score.id}</i>
  </li>
)
