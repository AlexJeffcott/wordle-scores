export const getAllInitialResponseBody = {
  'scores': [{
    'id': 264,
    'date': '2022-03-10',
    'word': 'lapse',
    'tries': ['stair', 'peony', 'lapse']
  }, {
    'id': 263,
    'date': '2022-03-09',
    'word': 'month',
    'tries': ['stair', 'tuned', 'monty', 'month']
  }, {
    'id': 262,
    'date': '2022-03-08',
    'word': 'sweet',
    'tries': ['corgi', 'pause', 'sleds', 'sweet']
  }, {
    'id': 261,
    'date': '2022-03-07',
    'word': 'nymph',
    'tries': ['mommy']
  }, {
    'id': 260,
    'date': '2022-03-06',
    'word': 'sweet',
    'tries': ['eerie']
  }]
}

export async function getAllInitialResponse() {
  return new Response(JSON.stringify(getAllInitialResponseBody), {
    status: 200,
    headers: {
      'Content-type': 'application/json'
    }
  })
}
