import { expect, Page, test } from "@playwright/test";

async function payTicketWithCard(page: Page) {
  const cardSection = page.locator("#rp-content-card-section");
  await expect(cardSection).toBeVisible({ timeout: 10_000 });

  const checkoutUrl = page.url();
  expect(checkoutUrl).toContain("https://checkout.reepay.com/#/checkout/");

  // TODO: create test session instead
  
  await page.locator("#frmCCNum").fill("4111 1111 1111 1111");
  await page.locator("#frmCCExp").fill("12/99");
  await page.locator("#frmCCCVC").fill("123");
  await page.locator("#rp-card-button").click();

  const challengeFrame = page
    .locator("#threed-secure-v2-challenge-frame")
    .contentFrame();

  await challengeFrame.getByText("Pass challenge").click();
}

test("show guess access within guest hours", async ({ page }) => {
  await page.goto("http://localhost:3000?pw_time=2025-11-05T12:00Z");

  const guestAccess = await page.getByTestId("guest-access");
  await expect(guestAccess).toBeVisible();

  const getTicketButton = guestAccess.getByTestId("get-ticket-button");
  await getTicketButton.click();

  await payTicketWithCard(page);

  const qrCode = page.getByTestId("day-ticket-qr-code");
  await expect(qrCode).toBeVisible();
});
