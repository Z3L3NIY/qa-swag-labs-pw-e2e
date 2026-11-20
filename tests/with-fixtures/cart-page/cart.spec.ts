import { test, expect } from "../../../fixtures/fixtures";
import { credentials } from "../../../test-data/credentials.data";
import { items } from "../../../test-data/inventory.data";

test.describe("Cart page tests", () => {
    test("Cart page opens", async ({ inventoryPage, cartPage }) => {
        await inventoryPage.openCart();

        await expect(cartPage.currentPage).toHaveURL(/\/cart\.html$/);
    });

    test("Added products are present on the Cart page", async ({
        inventoryPage,
        cartPage,
    }) => {
        for (const item of items) {
            await inventoryPage.addToCartByTitle(item.title);
        }
        await inventoryPage.openCart();

        const allTitles = items.map((item) => item.title);
        expect(
            await cartPage.locators.inventoryItemName.allInnerTexts(),
        ).toEqual(allTitles);
    });

    test("Removed products aren't present on the Cart page", async ({
        inventoryPage,
        cartPage,
    }) => {
        for (const item of items) {
            await inventoryPage.addToCartByTitle(item.title);
        }
        await inventoryPage.openCart();

        expect(await cartPage.locators.inventoryItem.count()).toBe(
            items.length,
        );

        for (const item of items) {
            await cartPage.removeFromCartByTitle(item.title);
        }

        expect(await cartPage.locators.inventoryItem.count()).toBe(0);
    });

    test("Cancel (Checkout) button opens Cart page", async ({
        inventoryPage,
        cartPage,
        checkoutStepOnePage,
    }) => {
        await inventoryPage.openCart();
        await cartPage.checkout();
        await checkoutStepOnePage.cancel();
        await expect(inventoryPage.currentPage).toHaveURL(/\/cart\.html$/);
    });
});
