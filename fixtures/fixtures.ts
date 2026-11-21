import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { InventoryPage } from "../pages/InventoryPage/InventoryPage";
import { CartPage } from "../pages/CartPage/CartPage";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOnePage/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwoPage/CheckoutStepTwoPage";
import { credentials } from "../test-data/credentials.data";
import { MenuComponent } from "../components/MenuComponent/MenuComponent";

type CustomFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutStepOnePage: CheckoutStepOnePage;
    checkoutStepTwoPage: CheckoutStepTwoPage;
    login: void;
    logout: void;
    userToLogin: { username: string; password: string };
    menuComponent: MenuComponent;
};

const test = base.extend<CustomFixtures>({
    login: [
        async ({ loginPage, userToLogin }, use) => {
            await loginPage.open();
            await loginPage.login(userToLogin);
            await use();
        },
        { auto: true },
    ],
    logout: [
        async ({ menuComponent }, use) => {
            await use();
            if (await menuComponent.locators.burgerBT.isVisible()) {
                await menuComponent.open();
                await menuComponent.resetAppState();
                await menuComponent.logout();
            }
        },
        { auto: true },
    ],
    userToLogin: credentials.standardUser,
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await use(loginPage);
    },
    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);

        await use(inventoryPage);
    },
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);

        await use(cartPage);
    },
    checkoutStepOnePage: async ({ page }, use) => {
        const checkoutStepOnePage = new CheckoutStepOnePage(page);

        await use(checkoutStepOnePage);
    },
    checkoutStepTwoPage: async ({ page }, use) => {
        const checkoutStepTwoPage = new CheckoutStepTwoPage(page);

        await use(checkoutStepTwoPage);
    },
    menuComponent: async ({ page }, use) => {
        const menuComponent = new MenuComponent(page);

        await use(menuComponent);
    },
});

export { test, expect };
