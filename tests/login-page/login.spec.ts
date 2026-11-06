import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { credentials } from "../../test-data/cretantials.data";
import { Errors } from "../../test-data/login-errors.data";

test.describe("Login page tests", () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        loginPage.open();
    });

    test("Login with valid credentials", async ({ page }) => {
        await loginPage.login(
            credentials.standardUser.username,
            credentials.standardUser.password,
        );
        expect(page).toHaveURL(/\/inventory\.html$/);
    });

    test("Login with empty credentials", async ({ page }) => {
        await loginPage.login();

        await expect(loginPage.locators.errorMessage).toBeVisible();
        await expect(loginPage.locators.errorMessage).toHaveText(
            Errors.fieldsAreRequired,
        );
    });

    test("Login with invalid credentials", async ({ page }) => {
        await loginPage.login(
            credentials.invalidUser.username,
            credentials.invalidUser.password,
        );

        await expect(loginPage.locators.errorMessage).toBeVisible();
        await expect(loginPage.locators.errorMessage).toHaveText(
            Errors.invalidPassword,
        );
    });

    test("Login with locked out credentials", async ({ page }) => {
        await loginPage.login(
            credentials.lockedOutUser.username,
            credentials.lockedOutUser.password,
        );

        await expect(loginPage.locators.errorMessage).toBeVisible();
        await expect(loginPage.locators.errorMessage).toHaveText(
            Errors.userIsLockedOut,
        );
    });
});
