import { test } from "../../../fixtures/fixtures";
import { testsData } from "./login-form-validation-cases";

test.describe("Login page tests", () => {
    test.beforeEach(async ({ page, loginPage }) => {
        await loginPage.open();
    });

    for (const testData of testsData) {
        test(testData.title, async ({ loginPage }) => {
            await loginPage.login(testData.userName, testData.password);
            await testData.verify(loginPage);
        });
    }
});
