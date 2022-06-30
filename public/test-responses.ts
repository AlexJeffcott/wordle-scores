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
