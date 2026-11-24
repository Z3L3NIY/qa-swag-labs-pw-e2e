import { test, expect } from "../../../fixtures/fixtures";
import { checkout_user } from "../../../test-data/credentials.data";
import { items } from "../../../test-data/inventory.data";

test.describe("Checkout (Step One) page tests", () => {
    test.beforeEach(
        async ({ inventoryPage, cartPage, checkoutStepOnePage }) => {
            await inventoryPage.addToCartByTitle(items[0].title);
            await inventoryPage.addToCartByTitle(items[1].title);
            await inventoryPage.openCart();
            await cartPage.checkout();
            await checkoutStepOnePage.submitCheckoutForm(
                checkout_user.firstName,
                checkout_user.lastName,
                checkout_user.postalCode,
            );
        },
    );

    test("Continue (Checkout Step One) button opens Checkout Step Two page", async ({
        checkoutStepTwoPage,
    }) => {
        await expect(checkoutStepTwoPage.currentPage).toHaveURL(
            /\/checkout-step-two\.html$/,
        );
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
