import { expect, Page, test } from "@playwright/test";
import { TicketType } from "@/types/enums/TicketType";
import { payTicketWithCard } from "./utils/frisbii.util";

const BASE_URL = "http://localhost:3000";
const GUEST_HOURS_TIME = "2025-11-05T12:00Z";
const OUTSIDE_GUEST_HOURS_TIME = "2025-11-05T20:00Z";

async function navigateToHomePage(page: Page, time?: string) {
  await page.goto(`${BASE_URL}${time ? `?pw_time=${time}` : ""}`);
}

async function navigateToTicketPage(page: Page, invoiceHandle?: string) {
  await page.goto(`${BASE_URL}/ticket?id=cs_example&invoice=${invoiceHandle}`);
}

async function purchaseGuestTicket(page: Page) {
  const guestAccess = page.getByTestId("guest-access");
  await expect(guestAccess).toBeVisible();
  const getTicketButton = guestAccess.getByTestId("get-ticket-button");
  await getTicketButton.click();
  await payTicketWithCard(page);
}

async function purchaseBuddyTicket(page: Page) {
  const buddySystem = page.getByTestId("buddy-system");
  await expect(buddySystem).toBeVisible();
  await page.getByTestId("button-with-member").click();
  await page.getByTestId("button-confirm").click();
  await payTicketWithCard(page);
}

test("Show QR code after purchase within guest hours", async ({ page }) => {
  await navigateToHomePage(page, GUEST_HOURS_TIME);
  await purchaseGuestTicket(page);

  const qrCode = page.getByTestId("day-ticket-qr-code");
  await expect(qrCode).toBeVisible();
});

test("Show ticket receipt after purchase outside guest hours", async ({
  page,
}) => {
  await navigateToHomePage(page, OUTSIDE_GUEST_HOURS_TIME);
  await purchaseBuddyTicket(page);

  const receiptText = page.getByTestId("day-ticket-receipt");
  await expect(receiptText).toBeVisible();
  await expect(page.getByTestId("ticket-id")).toContainText(TicketType.BUDDY);
});

test("Show invalid ticket message when viewing expired ticket", async ({
  page,
}) => {
  await navigateToTicketPage(page, "guest-ticket-1700000000000");

  const expiredTicket = page.getByTestId("ticket-not-valid-message");
  await expect(expiredTicket).toBeVisible();
});

test("Show purchased ticket prompt when ticket is valid", async ({ page }) => {
  const homePageUrl = `${BASE_URL}?pw_time=${GUEST_HOURS_TIME}`;

  await navigateToTicketPage(page, `guest-ticket-${Date.now()}`);

  await page.goto(homePageUrl);
  const purchasedTicketPrompt = page.getByTestId("purchased-ticket-prompt");
  await expect(purchasedTicketPrompt).toBeVisible();

  const viewTicketButton =
    purchasedTicketPrompt.getByTestId("view-ticket-button");
  await viewTicketButton.click();

  const qrCode = page.getByTestId("day-ticket-qr-code");
  await expect(qrCode).toBeVisible();

  await page.goto(homePageUrl);
  await expect(purchasedTicketPrompt).toBeVisible();

  const dismissButton = page.getByTestId("buy-another-ticket-button");
  await dismissButton.click();

  const buddySystem = page.getByTestId("guest-access");
  await expect(buddySystem).toBeVisible();
});

test("Don't show purchased ticket prompt when ticket is expired", async ({
  page,
}) => {
  await navigateToTicketPage(page, "guest-ticket-1700000000000");
  await navigateToHomePage(page, OUTSIDE_GUEST_HOURS_TIME);

  const purchasedTicketPrompt = page.getByTestId("purchased-ticket-prompt");
  await expect(purchasedTicketPrompt).not.toBeVisible();
});

test("Open terms and conditions page on click", async ({ page }) => {
  await navigateToHomePage(page);

  const termsAndConditionsLink = page.getByTestId("terms-and-conditions-link");
  await expect(termsAndConditionsLink).toBeVisible();
  await termsAndConditionsLink.click();

  await expect(page.getByTestId("terms-and-conditions-page")).toBeVisible();
});
