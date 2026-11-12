import { expect, Locator } from "@playwright/test";

export async function errorMessageCheck(
    errorLocator: Locator,
    messages: Array<string>,
) {
    await expect(errorLocator).toBeVisible();
    for (const message of messages) {
        await expect.soft(errorLocator).toContainText(message);
    }
}
