import { expect, test } from "@playwright/test";

test("keeps the current page visible while the route transition exits", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.locator('a[href="/404"]').first()).toBeVisible();
  await expect(page.getByAltText("ok hand")).toHaveCount(0);

  await page
    .locator('a[href="/404"]')
    .first()
    .click({ position: { x: 8, y: 8 } });

  await page.waitForSelector(".transition-fade-exit-active", {
    state: "attached",
  });

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
