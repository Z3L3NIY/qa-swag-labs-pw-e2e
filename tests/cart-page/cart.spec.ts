import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage/InventoryPage";
import { credentials } from "../../test-data/credentials.data";
import { items } from "../../test-data/inventory.data";
import { CartPage } from "../../pages/CartPage/CartPage";

test.describe("Cart page tests", () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        await loginPage.open();
        await loginPage.login(
            credentials.standardUser.username,
            credentials.standardUser.password,
        );
    });

    test("Cart page opens", async ({ page }) => {
        await inventoryPage.openCart();

        await expect.poll(() => cartPage.getUrl()).toMatch(/\/cart\.html$/);
    });

    test("Added products are present on the Cart page", async ({ page }) => {
        for (const item of items) {
            await inventoryPage.addToCartByTitle(item.title);
        }
        await inventoryPage.openCart();

        const allTitles = items.map((item) => item.title);
        expect(
            await cartPage.locators.inventoryItemName.allInnerTexts(),
        ).toEqual(allTitles);
    });

    test("Product can be removed from the Cart page", async ({ page }) => {
        for (const item of items) {
            await inventoryPage.addToCartByTitle(item.title);
        }
        await inventoryPage.openCart();

        for (const item of items) {
            await cartPage.removeFromCartByTitle(item.title);
        }

        expect(await cartPage.locators.inventoryItem.count()).toBe(0);
    });

    test("Continue Shopping button opens Inventory page", async ({ page }) => {
        await inventoryPage.openCart();
        await cartPage.continueShopping();
        await expect
            .poll(() => cartPage.getUrl())
            .toMatch(/\/inventory\.html$/);
    });
});
