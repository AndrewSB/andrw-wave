import type { Page } from "@playwright/test";

interface NowPlayingItem {
  is_playing: boolean;
  progress_ms: number;
  track: string;
  artist: string;
  album: string;
  album_art: string;
  external_link: string;
  preview_url: string | null;
}

const defaultItem: NowPlayingItem = {
  is_playing: false,
  progress_ms: 0,
  track: "",
  artist: "",
  album: "",
  album_art: "/jax.png",
  external_link: "https://example.com",
  preview_url: null,
};

export async function mockNowPlaying(
  page: Page,
  item: Partial<NowPlayingItem> = {}
) {
  await page.route("**/api/now-playing", async (route) => {
    await route.fulfill({
      json: { item: { ...defaultItem, ...item } },
    });
  });
}
