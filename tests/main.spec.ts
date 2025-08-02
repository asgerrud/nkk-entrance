import { expect, test } from "@playwright/test";
import { TicketType } from "@/types/enums/TicketType";
import { payTicketWithCard } from "./utils/frisbii.util";

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

test("show buddy system outside guest hours", async ({ page }) => {
  await page.goto("http://localhost:3000?pw_time=2025-11-05T20:00Z");

  const buddySystem = page.getByTestId("buddy-system");
  await expect(buddySystem).toBeVisible();

  await page.getByTestId("button-with-member").click();
  await page.getByTestId("button-confirm").click();

  await payTicketWithCard(page);

  const receiptText = page.getByTestId("day-ticket-receipt");
  await expect(receiptText).toBeVisible();

  await expect(page.getByTestId("ticket-id")).toContainText(TicketType.BUDDY);
});

test("show terms and conditions", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const termsAndConditionsLink = page.getByTestId("terms-and-conditions-link");
  await expect(termsAndConditionsLink).toBeVisible();
  await termsAndConditionsLink.click();

  const termsAndConditionsPage = page.getByTestId("terms-and-conditions-page");
  await expect(termsAndConditionsPage).toBeVisible();
});
