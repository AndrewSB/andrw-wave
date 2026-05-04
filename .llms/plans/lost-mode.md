# Lost Mode Plan

## Concept

Turn the existing "remember to make time to be lost" motif into a navigable hidden layer of the site. Instead of treating `/404` as a simple error page, make it the entrance to a small surreal overworld where visitors can wander into secret rooms, fragments, and one-off experiments.

## Why It Fits

- The home dialog already sends users to `/404` after the final dialog state.
- The site already has a fake-phone frame, pixel typography, route fade transitions, and playful hidden behavior.
- The feature can grow room-by-room without requiring a full redesign.

## User Experience

- `/404` becomes the first "lost" screen, still preserving the 404 joke visually.
- Small invisible or semi-visible hotspots lead to secret routes like `/lost/radio`, `/lost/color`, `/lost/window`, or `/lost/bench`.
- A minimal map can be implied rather than explicit: the visitor learns by clicking, waiting, pressing space, or following dialog clues.
- Some rooms should be intentionally quiet: one animated object, one sentence, one hidden exit.

## First Version

- Keep the current 404 background and ok-hand composition.
- Add 3 clickable hotspots:
  - The ok-hand image opens a "lost radio" room.
  - The left `4` opens a "color well" room.
  - The right `4` returns home or routes deeper depending on local progress.
- Store discovered rooms in `localStorage` so repeat visitors see small changes.
- Add a tiny "you have been here before" variation after the first visit.

## Suggested Routes

- `/404`: entrance to Lost Mode.
- `/lost/radio`: distorted miniature audio page.
- `/lost/color`: color-memory room tied to the site's teal and pink palette.
- `/lost/window`: idle animated room with a single piece of text.

## Implementation Notes

- Reuse `FakePhonePanel` for every room so Lost Mode still feels like part of the same artifact.
- Reuse or extend `PokemonDialogBox` only where dialog adds meaning; avoid putting a dialog box on every room.
- Add a small `src/lib/lost-mode.ts` helper for discovered-room state if more than one page needs it.
- Keep each room as a plain Next page at first; avoid building a routing engine until there are enough rooms to justify it.

## Acceptance Criteria

- A visitor can enter Lost Mode from the current 404 path.
- At least 3 hotspots lead to distinct experiences.
- Returning visitors get at least one changed detail based on local progress.
- The original "lost" theme feels intentional rather than like an error fallback.
