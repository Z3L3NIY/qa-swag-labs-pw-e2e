import { test, expect } from "../../../fixtures/fixtures";
import { credentials } from "../../../test-data/credentials.data";
import { testsData } from "./checkout-form-validation-cases";
import { items } from "../../../test-data/inventory.data";

test.describe("Checkout (Step One) page tests", () => {
    test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {
        await loginPage.open();
        await loginPage.login(
            credentials.standardUser.username,
            credentials.standardUser.password,
        );
        await inventoryPage.addToCartByTitle(items[0].title);
        await inventoryPage.openCart();
        await cartPage.checkout();
    });

    test("Checkout button opens Checkout (Step One) page", async ({
        checkoutStepOnePage,
    }) => {
        await expect
            .poll(() => checkoutStepOnePage.getUrl())
            .toMatch(/\/checkout-step-one\.html$/);
    });

    for (const testData of testsData) {
        test(testData.title, async ({ checkoutStepOnePage }) => {
            await checkoutStepOnePage.submitCheckoutForm(
                testData.firstName,
                testData.lastName,
                testData.postalCode,
            );
            await testData.verify(checkoutStepOnePage);
        });
    }
});
