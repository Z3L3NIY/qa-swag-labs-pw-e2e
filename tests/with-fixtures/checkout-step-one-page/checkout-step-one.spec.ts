import { test, expect } from "../../../fixtures/fixtures";
import { credentials } from "../../../test-data/credentials.data";
import { testsData } from "./checkout-form-validation-cases";
import { items } from "../../../test-data/inventory.data";

test.describe("Checkout (Step One) page tests", () => {
    test.beforeEach(async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addToCartByTitle(items[0].title);
        await inventoryPage.openCart();
        await cartPage.checkout();
    });

    test("Checkout button opens Checkout (Step One) page", async ({
        checkoutStepOnePage,
    }) => {
        await expect(checkoutStepOnePage.currentPage).toHaveURL(
            /\/checkout-step-one\.html$/,
        );
    });

    for (const {
        title,
        firstName,
        lastName,
        postalCode,
        verify,
    } of testsData) {
        test(title, async ({ checkoutStepOnePage }) => {
            await checkoutStepOnePage.submitCheckoutForm(
                firstName,
                lastName,
                postalCode,
            );
            await verify(checkoutStepOnePage);
        });
    }
});
