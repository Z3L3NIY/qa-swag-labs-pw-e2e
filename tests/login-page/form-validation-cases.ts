import { expect } from "@playwright/test";
import { credentials } from "../../test-data/credentials.data";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { Errors } from "../../test-data/login-errors.data";

async function loginErrorMessageCheck(loginPage: LoginPage, message: string) {
    await expect(loginPage.locators.errorMessage).toBeVisible();
    await expect(loginPage.locators.errorMessage).toHaveText(message);
}

export const testsData = [
    {
        title: "Login with valid credentials",
        userName: credentials.standardUser.username,
        password: credentials.standardUser.password,
        verify: async (loginPage: LoginPage) => {
            await expect
                .poll(() => loginPage.getUrl())
                .toMatch(/\/inventory\.html$/);
        },
    },
    {
        title: "Login with invalid credentials",
        userName: credentials.invalidUser.username,
        password: credentials.invalidUser.password,
        verify: async (loginPage: LoginPage) => {
            await loginErrorMessageCheck(loginPage, Errors.invalidCredentials);
        },
    },
    {
        title: "Login with invalid username",
        userName: credentials.invalidUser.username,
        password: credentials.standardUser.password,
        verify: async (loginPage: LoginPage) => {
            await loginErrorMessageCheck(loginPage, Errors.invalidUsername);
        },
    },
    {
        title: "Login with invalid password",
        userName: credentials.standardUser.username,
        password: credentials.invalidUser.password,
        verify: async (loginPage: LoginPage) => {
            await loginErrorMessageCheck(loginPage, Errors.invalidPassword);
        },
    },
    {
        title: "Login with empty credentials",
        userName: "",
        password: "",
        verify: async (loginPage: LoginPage) => {
            await loginErrorMessageCheck(loginPage, Errors.fieldsAreRequired);
        },
    },
    {
        title: "Login with empty username",
        userName: "",
        password: credentials.standardUser.password,
        verify: async (loginPage: LoginPage) => {
            await loginErrorMessageCheck(loginPage, Errors.usernameIsRequired);
        },
    },
    {
        title: "Login with empty password",
        userName: credentials.standardUser.username,
        password: "",
        verify: async (loginPage: LoginPage) => {
            await loginErrorMessageCheck(loginPage, Errors.passwordIsRequired);
        },
    },
    {
        title: "Login with locked out credentials",
        userName: credentials.lockedOutUser.username,
        password: credentials.lockedOutUser.password,
        verify: async (loginPage: LoginPage) => {
            await loginErrorMessageCheck(loginPage, Errors.userIsLockedOut);
        },
    },
];
