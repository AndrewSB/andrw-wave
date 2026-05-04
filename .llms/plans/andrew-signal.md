# Andrew Signal Plan

## Concept

Transform the existing Spotify "now playing" card into a full signal page: a live, abstract broadcast of Andrew's current state through music. The page should feel less like a music widget and more like tuning into a personal radio frequency.

## Why It Fits

- The site already has `/api/now-playing`, `useNowPlaying`, and a visible `NowPlayingBox`.
- The existing copy says "wherever he may be in the world," which is already halfway to a signal/broadcast concept.
- The feature can use live data without becoming a dashboard.

## User Experience

- Route: `/signal`.
- The page opens like a receiver: scanning lines, static, then a lock-on state if music is playing.
- When Andrew is listening, the page displays:
  - Track and artist as a transmission.
  - A visualizer-like signal shape.
  - A "distance" or "clarity" value generated from track progress.
  - Optional album art colors if available later.
- When nothing is playing, it becomes an offline broadcast: "carrier lost," with subtle static and last-known fallback copy.

## First Version

- Use the existing `useNowPlaying` hook.
- Render a full-screen fake receiver inside `FakePhonePanel`.
- Animate bars, scanlines, or waveform blocks with CSS.
- Derive visual state from:
  - `nowPlaying.is_playing`
  - `nowPlaying.track`
  - `nowPlaying.artist`
  - `nowPlaying.progress_ms`
- Add one interaction: click or press space to "retune," causing the text and signal animation to scramble briefly.

## Visual Direction

- Pixel radio / CRT monitor / aircraft black box.
- Colors should stay close to the current teal `#284650`, white, black, and the existing Spotify-card orange.
- Use text like:
  - `SIGNAL LOCKED`
  - `CURRENT TRANSMISSION`
  - `CARRIER: SPOTIFY`
  - `LOCATION: UNKNOWN`
  - `CLARITY: 72%`

## Implementation Notes

- Keep the current `NowPlayingBox` on the home page.
- Build a new `SignalPage` experience rather than overloading the home widget.
- Consider extracting a small presentational `SignalBars` component once the visualizer markup becomes nontrivial.
- Avoid adding new dependencies for the first version; CSS keyframes are enough.

## Acceptance Criteria

- `/signal` shows a distinct live broadcast experience.
- It handles playing and not-playing states gracefully.
- It uses the existing now-playing API.
- It has at least one interaction that makes the page feel tuned, unstable, or alive.
