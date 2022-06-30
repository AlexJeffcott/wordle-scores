export type Score = {
  id: number
  date: string
  word: string
  tries: string[]
}

export type ScoresResponse = {
  scores: Score[]
}
