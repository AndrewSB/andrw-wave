# Web Shrine Plan

## Concept

Create a maximalist single-object shrine: a page that treats one personal object, color, phrase, song, place, or image as if it deserves a tiny museum. The shrine should be specific, tactile, and slightly obsessive.

## Shrine Ideas

### Recommended First Shrine: `#284650`

The site's dominant teal already appears in metadata, backgrounds, and the home palette. Make a shrine to that color as if it is a place, weather system, and emotional anchor.

Possible route: `/shrine/284650`.

Page elements:

- A large field of the color with subtle pixel texture.
- A label like `rgb(40, 70, 80)`.
- Small annotations: "background color," "deep water," "phone glass," "almost night."
- A click interaction that reveals neighboring colors from the current site palette.
- A tiny guest prompt: "what does this color remember?"

### Alternate Shrine: The Ok Hand

Use the current 404 ok-hand GIF as a devotional object. Treat it like a relic found in the error page.

Possible route: `/shrine/ok`.

Page elements:

- The GIF centered like an icon.
- Fake provenance text: where it was found, what it does, what it refuses to explain.
- Clicks make the surrounding page become more 404-like.
- A hidden exit appears after enough clicks.

### Alternate Shrine: The Current Song

Use Spotify now-playing data to create a temporary shrine to the song Andrew is hearing right now.

Possible route: `/shrine/song`.

Page elements:

- Track title as sacred text.
- Artist name as inscription.
- Progress bar as candle burn.
- Album art, if later added to the home card, as the central object.
- If nothing is playing, the shrine becomes an empty altar.

## First Version

- Build `/shrine/284650` first.
- Use static content and CSS only.
- Include 4-6 clickable annotations around the color field.
- Each annotation reveals a short sentence or changes the page tint.
- Add one hidden link back to Lost Mode.

## Visual Direction

- Minimal but reverent: large color field, small labels, old-web hyperlink blue, pixel type.
- The shrine should not look like a portfolio case study.
- It should feel like an object someone made because they were paying too much attention.

## Implementation Notes

- Add a reusable `ShrineAnnotation` component only if the page has enough repeated annotation UI.
- Keep shrine content inline for the first version so it is easy to make personal and weird.
- If the shrine grows into a series, later introduce a `src/data/shrines.ts` file.

## Acceptance Criteria

- `/shrine/284650` exists as a focused, specific shrine.
- It has at least 4 interactive annotations.
- It connects back into the broader site mythology through Lost Mode or the home dialog.
- The result feels personal, not like a generic gallery page.
