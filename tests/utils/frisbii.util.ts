import { expect, Page } from "@playwright/test";

export async function payTicketWithCard(page: Page) {
    const cardSection = page.locator("#rp-content-card-section");
    await expect(cardSection).toBeVisible({ timeout: 10_000 });

    const checkoutUrl = page.url();
    expect(checkoutUrl).toContain("https://checkout.reepay.com/#/checkout/");

    await page.locator("#frmCCNum").fill("4111 1111 1111 1111");
    await page.locator("#frmCCExp").fill("12/99");
    await page.locator("#frmCCCVC").fill("123");
    await page.locator("#rp-card-button").click();

    const challengeFrame = page
        .locator("#threed-secure-v2-challenge-frame")
        .contentFrame();

    await challengeFrame.getByText("Pass challenge").click();
}