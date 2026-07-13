import { expect, test } from "@playwright/test";
import { mockNowPlaying } from "./support/mock-now-playing";

test("clicking while text is typing reveals the complete message", async ({
  page,
}) => {
  await mockNowPlaying(page);
  await page.goto("/");

  const dialog = page.locator("#box-content");
  const typedText = dialog.locator(":scope > span");

  // Wait for the initial question mark to finish, then advance to a message
  // long enough to observe while it is still typing.
  await expect(page.locator("#box-content + i")).toBeVisible();
  await dialog.click();
  await expect(dialog).toContainText("here");
  await expect(dialog.getByRole("link", { name: "github" })).toHaveCount(0);

  await dialog.click();

  const completedHtml = await typedText.evaluate((element) => element.innerHTML);
  expect(completedHtml).toContain("here are some links to click:");
  expect(completedHtml).toContain("linkedin.com/in/ndrww");
  await expect(dialog.getByRole("link", { name: "github" })).toBeVisible();
  await expect(page.locator("#box-content + i")).toBeVisible();
});
