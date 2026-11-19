import { test, expect } from "../../../fixtures/fixtures";
import { credentials } from "../../../test-data/credentials.data";
import { items } from "../../../test-data/inventory.data";
import { testsData } from "./sorting-cases";

test.describe("Inventory page tests", () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.open();
        await loginPage.login(
            credentials.standardUser.username,
            credentials.standardUser.password,
        );
    });

    test("The correct price is displayed for each item", async ({
        inventoryPage,
    }) => {
        for (const item of items) {
            expect(await inventoryPage.getPriceByTitle(item.title)).toBe(
                item.price,
            );
        }
    });

    test("Cart badge has the correct number of added items", async ({
        inventoryPage,
    }) => {
        for (const item of items) {
            await inventoryPage.addToCartByTitle(item.title);
        }
        expect(await inventoryPage.getCartBadgeCounterValue()).toEqual(
            items.length.toString(),
        );
    });

    for (const testData of testsData) {
        test(`Sort by ${testData.title}`, async ({ inventoryPage }) => {
            await inventoryPage.sortProducts(testData.filterOption);
            await testData.verify(inventoryPage);
        });
    }

    test("Continue Shopping button opens Inventory page", async ({
        inventoryPage,
        cartPage,
    }) => {
        await inventoryPage.openCart();
        await cartPage.continueShopping();
        await expect
            .poll(() => inventoryPage.getUrl())
            .toMatch(/\/inventory\.html$/);
    });
});
