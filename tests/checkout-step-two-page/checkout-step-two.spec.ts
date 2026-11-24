import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage/InventoryPage";
import { credentials, checkout_user } from "../../test-data/credentials.data";
import { CartPage } from "../../pages/CartPage/CartPage";
import { CheckoutStepOnePage } from "../../pages/CheckoutStepOnePage/CheckoutStepOnePage";
import { items } from "../../test-data/inventory.data";
import { CheckoutStepTwoPage } from "../../pages/CheckoutStepTwoPage/CheckoutStepTwoPage";

test.describe("Checkout (Step One) page tests", () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutStepOnePage: CheckoutStepOnePage;
    let checkoutStepTwoPage: CheckoutStepTwoPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutStepOnePage = new CheckoutStepOnePage(page);
        checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        await loginPage.open();
        await loginPage.login(credentials.standardUser);
        await inventoryPage.addToCartByTitle(items[0].title);
        await inventoryPage.addToCartByTitle(items[1].title);
        await inventoryPage.openCart();
        await cartPage.checkout();
        await checkoutStepOnePage.submitCheckoutForm(
            checkout_user.firstName,
            checkout_user.lastName,
            checkout_user.postalCode,
        );
    });

    test("Continue (Checkout Step One) button opens Checkout Step Two page", async ({
        page,
    }) => {
        await expect(checkoutStepTwoPage.currentPage).toHaveURL(
            /\/checkout-step-two\.html$/,
        );
    });

    test("Item total is accurately calculated", async ({ page }) => {
        const expectedTotal =
            await checkoutStepTwoPage.calculateExpectedTotal();

        await expect(checkoutStepTwoPage.locators.subtotalLabel).toHaveText(
            `Item total: $${expectedTotal}`,
        );
    });
});
