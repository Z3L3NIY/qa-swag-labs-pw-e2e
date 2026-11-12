import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage/InventoryPage";
import { credentials } from "../../test-data/credentials.data";
import { items } from "../../test-data/inventory.data";
import { testsData } from "./sorting-cases";
import { CartPage } from "../../pages/CartPage/CartPage";

test.describe("Inventory page tests", () => {
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

    test("The correct price is displayed for each item", async ({ page }) => {
        for (const item of items) {
            expect(await inventoryPage.getPriceByTitle(item.title)).toBe(
                item.price,
            );
        }
    });

    test("Cart badge has the correct number of added items", async ({
        page,
    }) => {
        for (const item of items) {
            await inventoryPage.addToCartByTitle(item.title);
        }
        expect(await inventoryPage.getCartBadgeCounterValue()).toEqual(
            items.length.toString(),
        );
    });

    for (const testData of testsData) {
        test(`Sort by ${testData.title}`, async ({ page }) => {
            await inventoryPage.sortProducts(testData.filterOption);
            await testData.verify(inventoryPage);
        });
    }

    test("Continue Shopping button opens Inventory page", async ({ page }) => {
        await inventoryPage.openCart();
        await cartPage.continueShopping();
        await expect
            .poll(() => inventoryPage.getUrl())
            .toMatch(/\/inventory\.html$/);
    });
});
