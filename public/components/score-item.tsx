import type { FunctionalComponent } from 'preact'
import type { Score } from '../models'
import styles from './score-item.module.css'

type AttemptStatus = 'unmatched' | 'noMatch' | 'partialMatch' | 'fullMatch'
type Attempt = [string, AttemptStatus[]]

const getFormattedDate = (dateStr: string, locale = 'en-US') => (
  new Date(dateStr).toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
)

type Props = {
  score: Score
}

export const ScoreItem: FunctionalComponent<Props> = ({ score }) => {
  const attempts: Attempt[] = score.tries.reduce((acc: Attempt[], cur) => {
    const word = Array.from(score.word)

    const statuses: AttemptStatus[] = word.map((letter, i) => {
      if (letter === cur[i]) {
        word[i] = '2'
        return 'fullMatch'
      }
      return 'unmatched'
    })

    Array.from(cur).forEach((c, i) => {
      if (statuses[i] !== 'unmatched') {
        return
      }

      const matchIndex = word.indexOf(c)
      if (matchIndex !== -1) {
        word[matchIndex] = '1'
        statuses[i] = 'partialMatch'
      } else {
        statuses[i] = 'noMatch'
      }
    })

    return [...acc, [cur, statuses]]
  }, [])

  return (
    <li class={styles.item}>
      <div class={styles.header}>
        <b>{getFormattedDate(score.date)}</b>
        <p>
          {score.word === score.tries[score.tries.length - 1]
            ? `You did it in ${score.tries.length} tries!`
            : `Better luck next time! The word was "${score.word}"`}
        </p>
      </div>
      <div class={styles.tries}>
        {attempts.map(([attempt, statuses]) => (
          statuses.map((letterStatus, i) => (
            <span key={i} class={`${styles.letter} ${styles[letterStatus]}`}>
              {attempt[i]}
            </span>
          ))
        ))}
      </div>
      <i class={styles.footer}>#{score.id}</i>
    </li>
  )
}
