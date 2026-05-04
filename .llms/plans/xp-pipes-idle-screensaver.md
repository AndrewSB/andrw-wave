# XP Pipes Idle Screensaver Plan

## Concept

Add an idle screensaver that takes over the site after inactivity and recreates the spirit of the classic Microsoft 3D Pipes screensaver in a web-native, pixel-art-friendly way. It should feel nostalgic, strange, and a little haunted rather than like a literal Windows clone.

## Why It Fits

- The site already hides the default cursor and uses cursor effects.
- The home page is already interactive but can become more alive when the visitor stops interacting.
- The fake phone frame makes an old screensaver takeover feel especially uncanny.

## User Experience

- After 20-30 seconds with no mouse, keyboard, touch, or scroll input, the page dims and pipes begin to grow.
- Any interaction exits the screensaver immediately.
- Pipes appear as chunky 2D or pseudo-3D segments rather than full WebGL.
- Rarely, a pipe can pass behind or around existing site elements, making the page feel inhabited.

## First Version

- Add a global `IdleScreensaver` component mounted from `_app.tsx`.
- Track user activity events:
  - `mousemove`
  - `mousedown`
  - `keydown`
  - `touchstart`
  - `scroll`
- After the idle timeout, show a full-screen overlay.
- Draw pipes using either:
  - CSS grid div segments for a simple pixel style, or
  - a `<canvas>` for smoother randomized growth.
- Exit on any input.

## Recommended Rendering Approach

Use `<canvas>` for the first implementation. It gives better randomness and avoids creating hundreds of React elements.

Pipe behavior:

- Start from a random grid cell.
- Move one cell per tick.
- Continue straight most of the time.
- Occasionally turn left, right, up, or down.
- Draw each segment with a highlight and shadow to mimic the XP 3D-pipe look.
- When a pipe hits an edge or occupied cell, start a new pipe.

## Visual Direction

- Background: transparent black overlay or deep teal tint.
- Pipes: bright but slightly softened greens, pinks, blues, and whites.
- Style: old Windows screensaver meets personal website dream sequence.
- Optional tiny text in one corner: `screensaver: andrw.wave pipes`.

## Implementation Notes

- Respect `prefers-reduced-motion` by disabling auto-start or using a static overlay.
- Keep the component global so it works on home, Lost Mode, shrine pages, and signal pages.
- Avoid adding a dependency; canvas drawing is enough.
- Pause animation when the tab is hidden.

## Acceptance Criteria

- The screensaver starts after a configurable idle delay.
- It exits instantly on user activity.
- It appears globally across pages.
- It visually reads as XP Pipes-inspired without relying on external assets.
- It does not interfere with normal page interactions when inactive.
