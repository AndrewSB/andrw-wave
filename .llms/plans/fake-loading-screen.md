# Fake Loading Screen Plan

## Concept

Create a page where the loading screen is the artwork. It should pretend to boot, recover, scan, or initialize something personal, then only partially resolve. The fun is in the ritual of waiting and the feeling that the site is hiding a machine underneath.

## Why It Fits

- The site already has a route fade transition, pixel fonts, hidden paths, and playful dead ends.
- A fake boot/loading page can become a transition into other experimental pages like Lost Mode or Andrew Signal.
- It can be implemented with simple timed state changes and CSS, without a heavy animation system.

## User Experience

- Route: `/boot` or `/loading`.
- The page starts with a black or dark teal boot screen.
- Text appears line-by-line in a fake terminal/BIOS style.
- Some lines should be funny, intimate, or uncanny rather than technical filler.
- At the end, the page can:
  - Reveal a secret link.
  - Route into `/404` / Lost Mode.
  - Freeze at `99%` until the visitor presses a key.

## First Version

- Build a `FakeLoadingScreen` component with a list of timed lines.
- Use `setTimeout` or `requestAnimationFrame` to reveal lines in sequence.
- Add one branch:
  - If the visitor presses space during loading, it "skips" into `/signal`.
  - If the visitor waits, it ends in `/404`.
- Add glitch text near the end to make the loading feel unstable.

## Example Loading Lines

- `booting andrw.wave`
- `checking for unfinished thoughts`
- `mounting /lost`
- `recovering color memory #284650`
- `spotify carrier: pending`
- `opening door that should not be here`
- `complete enough`

## Implementation Notes

- Keep the component client-only through normal React state; no API needed.
- Reuse the existing page transition rather than introducing a new transition framework.
- Use `FakePhonePanel` only if the page should feel like part of the phone world. A full-screen terminal may be stronger for the first version.
- Add `prefers-reduced-motion` handling for glitch or flicker effects.

## Acceptance Criteria

- `/boot` or `/loading` feels like an intentional page, not a real performance delay.
- It reveals text over time.
- It has at least one keypress interaction.
- It can route into either Lost Mode or Andrew Signal.
