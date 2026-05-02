import { expect, test } from "@playwright/test";

test("keeps the current page visible while the route transition exits", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.locator('a[href="/404"]').first()).toBeVisible();
  await expect(page.getByAltText("ok hand")).toHaveCount(0);

  const transitionStarted = page.waitForSelector(".transition-fade-exit-active", {
    state: "attached",
    timeout: 500,
  });

  await page
    .locator('a[href="/404"]')
    .first()
    .click({ position: { x: 8, y: 8 } });

  await transitionStarted;

  await page.waitForFunction(() => {
    const exiting = document.querySelector(".transition-fade-exit-active");
    if (!exiting) {
      return false;
    }

    return Number(window.getComputedStyle(exiting).opacity) < 1;
  });

  await expect(page.getByAltText("ok hand")).toHaveCount(0);

  await expect(page.getByAltText("ok hand")).toBeVisible({ timeout: 3_000 });
  await expect(page).toHaveURL(/\/404$/);
});

test("keeps homepage overlay layout anchored inside the phone panel", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.route("**/api/now-playing", async (route) => {
    await route.fulfill({
      json: {
        item: {
          is_playing: true,
          progress_ms: 0,
          track: "Zehir - Motive Remix",
          artist: "manifest",
          album: "test album",
          album_art: "/jax.png",
          external_link: "https://example.com",
          preview_url: "https://example.com/preview.mp3",
        },
      },
    });
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

    return {
      dialogRight: dialogBox?.right ?? 0,
      spotifyTop: spotifyOverlay?.top ?? 0,
    };
  });

  expect(layout.dialogRight).toBeLessThanOrEqual(875);
  expect(layout.spotifyTop).toBeGreaterThan(500);
});
