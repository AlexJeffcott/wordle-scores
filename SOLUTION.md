# Solution Overview

## Web Worker

In `background.ts`, as suggested, I enabled a simple polling solution that would call sync no more often than every 10000ms after the first pass.

I left it at that, but would likely want to add a cleanup or optimisation to this. For example, if the browser is minimised.

The choice of 10 seconds is arbitrary, and would be chosen more consciously with more context.

It is also highly likely that there is a more elegant / less wasteful solution, but I felt this was out of scope in this task.

## Listening to the Web Worker

In `components/index.tsx`, as suggested, I access the Web Worker instance via the custom hook (`useBackground`) which utilises the so-called Context/Provider pattern.

I then added a listener to the MessageEvent (emitted via `postMessage`), whose callback calls `refetch`. The refetch function handles getting new data via the API and updating the component’s state.

## Connecting to the API

In `get-scores.ts`, as suggested, I replaced `getAllInitialResponse()` with `getRealScoresFromNetwork()`.

I included the simple fetch implementation of this function in the same file.

It uses `import.meta.env.AUTH_TOKEN` to get the auth_token from the environment. I did so using a `.env` file during development.

## Styling the Solution

I really like the ‘standard’ solution to display scores visually, as I feel that this transmits a lot of information quickly but with minimal effort.

On a scores list level, I wanted to display all the score cards in a vertical stack in newest to oldest order. I felt that this would meet user expectations (wanting to see the newest updates most easily). I achieved this through `flex-direction: column-reverse`, so this could be fairly easily linked to a toggle which could reverse the ordering of items. In a full implementation, I could imagine users wanting to both filter and order the score cards more flexibly, which would be done on a state level.

This stacking implementation has the further advantage of being small-screen friendly. I have not sort to make it more responsive than that, but a fuller implementation would take better account of utilising screen real estate.

On a score card level, I wanted to display the date, the number of tries, the progression of those tries and the id of the score. I chose not to show the target word. I could imagine users wanting this to be configurable, on a list level, or toggleable, on a score card level.

With regards to ‘tries’, I decided to map over the words, and then over their letters, rendering them as `spans`. Styling these letters as a grid of 5 columns meant that it was both simple and terse to create the desired layout with styling on each individual letter, to indicate its status as ‘hit’, ‘miss’ or ‘partial’. A further advantage of this approach is that it would be a small adjustment to make the number of columns configurable; for Wordle variations.

On a letter level, I wanted to represent the ‘hit’, ‘miss’ or ‘partial’ states using colors and I opted to utilise those provided as custom properties. A fuller implementation would have paid more attention to contrast ratio.

It might be worth noting that the size of the letter element essentially dictates the size of the card.

## Changes not Strictly Related to the Task

Apart from a few changes prompted by complaints from my IDE, the changes in `service-worker.ts` were due to Typescript informing me about an inconsistent return type — as it appeared that the code could potentially return `undefined`.

## Final Thoughts

Thank you for taking the time to create such an interesting task. I must admit that I spent quite some time looking things over, simply as a matter of interest in exploring how things fit together!