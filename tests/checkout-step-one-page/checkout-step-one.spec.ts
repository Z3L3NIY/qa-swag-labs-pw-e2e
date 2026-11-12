import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage/InventoryPage";
import { credentials } from "../../test-data/credentials.data";
import { CartPage } from "../../pages/CartPage/CartPage";
import { CheckoutStepOnePage } from "../../pages/CheckoutStepOnePage/CheckoutStepOnePage";
import { testsData } from "./checkout-form-validation-cases";
import { items } from "../../test-data/inventory.data";

test.describe("Checkout (Step One) page tests", () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutStepOnePage: CheckoutStepOnePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutStepOnePage = new CheckoutStepOnePage(page);
        await loginPage.open();
        await loginPage.login(
            credentials.standardUser.username,
            credentials.standardUser.password,
        );
        await inventoryPage.addToCartByTitle(items[0].title);
        await inventoryPage.openCart();
        await cartPage.checkout();
    });

    test("Checkout button opens Checkout (Step One) page", async ({ page }) => {
        await expect
            .poll(() => checkoutStepOnePage.getUrl())
            .toMatch(/\/checkout-step-one\.html$/);
    });

    for (const testData of testsData) {
        test(testData.title, async ({ page }) => {
            await checkoutStepOnePage.submitCheckoutForm(
                testData.firstName,
                testData.lastName,
                testData.postalCode,
            );
            await testData.verify(checkoutStepOnePage);
        });
    }
});
