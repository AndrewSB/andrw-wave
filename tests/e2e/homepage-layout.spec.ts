import { expect, test } from "@playwright/test";
import { mockNowPlaying } from "./support/mock-now-playing";

test("keeps homepage overlay layout anchored inside the phone panel", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await mockNowPlaying(page, {
    is_playing: true,
    track: "Zehir - Motive Remix",
    artist: "manifest",
    album: "test album",
    preview_url: "https://example.com/preview.mp3",
  });

  await page.goto("/");
  await expect(page.getByAltText("Jax")).toBeVisible();
  await expect(page.locator("#box-content")).toBeVisible();

  const layout = await page.evaluate(() => {
    const dialogBox = document
      .querySelector("#box-content")
      ?.parentElement?.getBoundingClientRect();
    const spotifyOverlay = document
      .querySelector('img[alt="Jax"]')
      ?.closest(".fixed")
      ?.getBoundingClientRect();
    const spotifyBackgroundColor = window.getComputedStyle(
      document.querySelector('[data-testid="now-playing-card"]')!
    ).backgroundColor;
    const spotifyBackgroundAlpha =
      Number(spotifyBackgroundColor.match(/,\s*([.\d]+)\)$/)?.[1]) ||
      Number(spotifyBackgroundColor.match(/\/\s*([.\d]+)\)/)?.[1]) ||
      1;

    return {
      dialogRight: dialogBox?.right ?? 0,
      spotifyTop: spotifyOverlay?.top ?? 0,
      spotifyBackgroundAlpha,
    };
  });

  expect(layout.dialogRight).toBeLessThanOrEqual(875);
  expect(layout.spotifyTop).toBeGreaterThan(500);
  expect(layout.spotifyBackgroundAlpha).toBeCloseTo(0.3);
});
