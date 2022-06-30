# Shareup PWA Frontend Engineering Interview Project

## Description

At Shareup, we love to play [Wordle](https://www.nytimes.com/games/wordle/). We have a channel in our company Discord dedicated to sharing our Wordle scores each day.

Although we love Wordle, we wish there was a way to look back at our previous games to see how well we did and compare them with others.

Your challenge will be to work on an existing PWA intended to list and display previous Wordle scores in an attractive and interesting way. The design should be inspired by Wordle’s native way of showing a person’s score without revealing the actual word or the guesses a person made. Wordle does this by creating something that looks like this:

`Wordle 281 4/6`  
⬛⬛⬛⬛🟨  
🟨⬛🟨⬛⬛  
⬛⬛⬛🟨⬛  
🟩🟩🟩🟩🟩

*The above score was for the word “nymph”. The guesses were “train”, “ponds”, “blume”, and “nymph”.*

## Goals

The app needs to:

0. Be written in TypeScript and use Preact, which is already setup for you here in this repo. 💪
1. Periodically poll for the latest Wordle scores from the scores API. The API is described in more detail below.
2. Notify the UI after updates in the worker: this feature is already started, but the UI doesn’t react yet.
3. (If you have time) display the scores in the UI in a more pleasent way.

**Please include a `SOLUTION.md` in which you explain the design you came up with and the next improvements you'd make if you had time.**

## Starting point

We’ve put together a basic PWA using [wmr][] and [preact-iso][] that is currently rendering hard-coded test scores, includes a vanilla service worker for caching and offline support, and can be pre-built for fast hydration. See the tech stack links all the way at the bottom of this README for more info.

You can search for `TODO` to find some starting places for the above goals.

# Wordle Scores API

See the [API.md](API.md) file for details about the API.

- - -

# Repo details

## Project setup

```sh
# make sure either brew or node is installed, then
$ bin/install
```

## Dev server

Start a local http server on port 8080:

```sh
$ bin/start
```

## Build for production 💪

```sh
$ bin/build
```

_One can test the built files using `npx wmr serve` which will only serve files out of `dist`, it won’t compile files from source._

## Format and lint your code

```sh
$ bin/fmt
$ bin/lint
```

## What's the tech stack for this PWA?

* All the code is written in [TypeScript][] and [CSS modules][]
* We use [dprint][] for code style formatting
* [wmr][] is our dev server and bundler
  * [wmr’s types file][types] is very useful to reference from time-to-time
* [Preact][] and [preact-iso][] renders HTML both server-side and client-side, provides routing in both cases, and hydrates the interactive parts client-side
	* We are biased and only use [functional components][] + [hooks][]
* [idb][] is the fantastic library we are using to promisify IndexedDB access
* [CSS custom properties][] are in here
* A [vanilla service worker][] handles the caching and offline access
* And [Modules in Workers][], which means the app doesn’t work in Firefox right now. We are open to bundling the worker as an IIFE sometime in the future, but not right now.

[TypeScript]: https://www.typescriptlang.org
[CSS modules]: https://github.com/css-modules/css-modules
[CSS custom properties]: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
[dprint]: https://dprint.dev
[wmr]: https://github.com/preactjs/wmr
[types]: https://github.com/preactjs/wmr/blob/1d304458829ebf18f219851eb4e55b313d1f7d65/packages/wmr/types.d.ts
[Preact]: https://preactjs.com
[preact-iso]: https://github.com/preactjs/wmr/tree/main/packages/preact-iso
[functional components]: https://preactjs.com/guide/v10/components#functional-components
[hooks]: https://preactjs.com/guide/v10/hooks
[idb]: https://github.com/jakearchibald/idb
[vanilla service worker]: https://github.com/shareup/pwa-resources/blob/main/public/service-worker.ts
[Modules in Workers]: https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker#parameters
