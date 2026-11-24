import { test } from "../../../fixtures/fixtures";
import { testsData } from "./login-form-validation-cases";

test.describe("Login page tests", () => {
    for (const { title, userToLogin, verify } of testsData) {
        test.describe("", () => {
            test.use({ userToLogin });
            test(title, async ({ loginPage }) => {
                await verify(loginPage);
            });
        });
    }
});
