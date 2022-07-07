import type { ScoresResponse } from './models'
import { getAllInitialResponse } from './test-responses'

async function getRealScoresFromNetwork() {
  const myHeaders = new Headers()
  myHeaders.append('X-Authorization', import.meta.env.AUTH_TOKEN)

  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  }

  return fetch('https://wordle.shareup.fun/scores', requestOptions)
}

export async function getScores(): Promise<ScoresResponse> {
  console.debug('getting scores…')

  // const response = await getRealScoresFromNetwork()
  const response = await getAllInitialResponse()

  if (response.ok) {
    const json = await response.json()
    return json as ScoresResponse
  } else {
    throw new Error('failed to get scores')
  }
}
