# Wordle Scores API

We’ve built an API you can use to fetch Wordle scores. It's your goal to hookup this API inside of the app.

In order to access the API, you’ll need to include an `Authorization` header with your personal access token, which you'll receive in an email.

Although the Wordle Scores API supports creating and deleting scores, those APIs are mostly available to aid you in developing and debugging the app. You should only need to use the “List scores” API inside of the app.

## Get all the scores

```sh
$ AUTH_TOKEN=... bin/get-scores
```

## Create a new score

```sh
$ AUTH_TOKEN=... bin/create-new-score
```

## Reset all scores

```sh
$ AUTH_TOKEN=... bin/reset-scores
```

This call uses `DELETE` to reset your account’s scores to the initial state, which means your account will have three scores in it after this call completes.

## Responses

Depending on the request, you'll either get back a JSON object or an array of JSON objects. In either case, the core type you'll receive back is a `score`, which has the following shape:

```json
{
  "id": 262,
  "date": "2022-03-08",
  "word": "sweet",
  "tries": ["corgi", "pause", "sleds", "sweet"]
}
```

In the case of an error, you may or may not receive a JSON object with an `error` key explaining the problem.

```json
{ "error": "missing id" }
```
