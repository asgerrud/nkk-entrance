import { expect, test } from "@playwright/test";
import { TicketType } from "@/types/enums/TicketType";
import { payTicketWithCard } from "./utils/frisbii.util";

test("Show QR code after purchase within guest hours", async ({ page }) => {
  await page.goto("http://localhost:3000?pw_time=2025-11-05T12:00Z");

  const guestAccess = await page.getByTestId("guest-access");
  await expect(guestAccess).toBeVisible();

  const getTicketButton = guestAccess.getByTestId("get-ticket-button");
  await getTicketButton.click();

  await payTicketWithCard(page);

  const qrCode = page.getByTestId("day-ticket-qr-code");
  await expect(qrCode).toBeVisible();
});

test("Show ticket receipt after purchase outside guest hours", async ({
  page,
}) => {
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

test("Show purchased ticket prompt when ticket is valid", async ({ page }) => {
  const homePageUrl = "http://localhost:3000?pw_time=2025-11-05T12:00Z";

  await page.goto(
    `http://localhost:3000/ticket?id=cs_example&invoice=guest-ticket-${Date.now()}`,
  );
  await page.goto(homePageUrl);

  const purchasedTicketPrompt = page.getByTestId("purchased-ticket-prompt");
  await expect(purchasedTicketPrompt).toBeVisible();

  const viewTicketButton =
    purchasedTicketPrompt.getByTestId("view-ticket-button");
  await expect(viewTicketButton).toBeVisible();
  await viewTicketButton.click();

  const qrCode = page.getByTestId("day-ticket-qr-code");
  await expect(qrCode).toBeVisible();

  await page.goto(homePageUrl);
  await expect(purchasedTicketPrompt).toBeVisible();

  const closeButton = purchasedTicketPrompt.getByTestId(
    "buy-another-ticket-button",
  );
  await expect(closeButton).toBeVisible();
  await closeButton.click();

  const guestAccess = page.getByTestId("guest-access");
  await expect(guestAccess).toBeVisible();
  await expect(purchasedTicketPrompt).not.toBeVisible();

  await page.reload();

  await expect(purchasedTicketPrompt).toBeVisible();
});

test("Don't show purchased ticket prompt when ticket is expired", async ({
  page,
}) => {
  await page.goto(
    "http://localhost:3000/ticket?id=cs_example&invoice=guest-ticket-1700000000000",
  );
  await page.goto("http://localhost:3000?pw_time=2025-11-05T20:00Z");

  const purchasedTicketPrompt = page.getByTestId("purchased-ticket-prompt");
  await expect(purchasedTicketPrompt).not.toBeVisible();
});

test("Show invalid ticket message when viewing expired ticket", async ({
  page,
}) => {
  await page.goto(
    "http://localhost:3000/ticket?id=cs_example&invoice=guest-ticket-1700000000000",
  );

  const expiredTicket = page.getByTestId("ticket-not-valid-message");
  await expect(expiredTicket).toBeVisible();
});

test("show terms and conditions", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const termsAndConditionsLink = page.getByTestId("terms-and-conditions-link");
  await expect(termsAndConditionsLink).toBeVisible();
  await termsAndConditionsLink.click();

  const termsAndConditionsPage = page.getByTestId("terms-and-conditions-page");
  await expect(termsAndConditionsPage).toBeVisible();
});
