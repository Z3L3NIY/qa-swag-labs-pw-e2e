import { test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { testsData } from "./form-validation-cases";

test.describe("Login page tests", () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.open();
    });

    for (const testData of testsData) {
        test(testData.title, async ({ page }) => {
            await loginPage.login(testData.userName, testData.password);
            await testData.verify(loginPage);
        });
    }
});
