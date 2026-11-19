import { test, expect } from "../../../fixtures/fixtures";
import { credentials } from "../../../test-data/credentials.data";
import { items } from "../../../test-data/inventory.data";

test.describe("Checkout (Step One) page tests", () => {
    test.beforeEach(
        async ({ loginPage, inventoryPage, cartPage, checkoutStepOnePage }) => {
            await loginPage.open();
            await loginPage.login(
                credentials.standardUser.username,
                credentials.standardUser.password,
            );
            await inventoryPage.addToCartByTitle(items[0].title);
            await inventoryPage.addToCartByTitle(items[1].title);
            await inventoryPage.openCart();
            await cartPage.checkout();
            await checkoutStepOnePage.submitCheckoutForm(
                credentials.standardUser.checkout.firstName,
                credentials.standardUser.checkout.lastName,
                credentials.standardUser.checkout.postalCode,
            );
        },
    );

    test("Continue (Checkout Step One) button opens Checkout Step Two page", async ({
        checkoutStepTwoPage,
    }) => {
        await expect
            .poll(() => checkoutStepTwoPage.getUrl())
            .toMatch(/\/checkout-step-two\.html$/);
    });

    test("Item total is accurately calculated", async ({
        checkoutStepTwoPage,
    }) => {
        const expectedTotal =
            await checkoutStepTwoPage.calculateExpectedTotal();

        await expect(checkoutStepTwoPage.locators.subtotalLabel).toHaveText(
            `Item total: $${expectedTotal}`,
        );
    });
});
