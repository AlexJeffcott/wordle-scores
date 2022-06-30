import { openDB } from 'idb'
import type { DBSchema, IDBPDatabase } from 'idb'
import type { Score } from './models'

interface Schema extends DBSchema {
  scores: {
    key: number
    value: Score
    indexes: {
      date: string
    }
  }
}

export type DB = IDBPDatabase<Schema>

export async function open() {
  return openDB<Schema>('wordleScores', 1, {
    upgrade(db, old, cur, tx) {
      const scores = db.createObjectStore('scores', { keyPath: 'id' })
      scores.createIndex('date', 'date')
    }
  })
}
