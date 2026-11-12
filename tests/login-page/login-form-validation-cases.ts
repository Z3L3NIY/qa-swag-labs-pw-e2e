import { expect } from "@playwright/test";
import { credentials } from "../../test-data/credentials.data";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { loginErrors } from "../../test-data/forms-validation-errors.data";
import { errorMessageCheck } from "../../utils/form-error-message-check";

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
        title: "Login with invalid username",
        userName: credentials.invalidUser.username,
        password: credentials.standardUser.password,
        verify: async (loginPage: LoginPage) => {
            await errorMessageCheck(loginPage.locators.errorMessage, [
                loginErrors.invalidUsername,
            ]);
        },
    },
    {
        title: "Login with invalid password",
        userName: credentials.standardUser.username,
        password: credentials.invalidUser.password,
        verify: async (loginPage: LoginPage) => {
            await errorMessageCheck(loginPage.locators.errorMessage, [
                loginErrors.invalidPassword,
            ]);
        },
    },
    {
        title: "Login with empty credentials",
        userName: "",
        password: "",
        verify: async (loginPage: LoginPage) => {
            await errorMessageCheck(loginPage.locators.errorMessage, [
                loginErrors.usernameIsRequired,
                //loginErrors.passwordIsRequired,
            ]);
        },
    },
    {
        title: "Login with empty username",
        userName: "",
        password: credentials.standardUser.password,
        verify: async (loginPage: LoginPage) => {
            await errorMessageCheck(loginPage.locators.errorMessage, [
                loginErrors.usernameIsRequired,
            ]);
        },
    },
    {
        title: "Login with empty password",
        userName: credentials.standardUser.username,
        password: "",
        verify: async (loginPage: LoginPage) => {
            await errorMessageCheck(loginPage.locators.errorMessage, [
                loginErrors.passwordIsRequired,
            ]);
        },
    },
    {
        title: "Login with locked out credentials",
        userName: credentials.lockedOutUser.username,
        password: credentials.lockedOutUser.password,
        verify: async (loginPage: LoginPage) => {
            await errorMessageCheck(loginPage.locators.errorMessage, [
                loginErrors.userIsLockedOut,
            ]);
        },
    },
];
