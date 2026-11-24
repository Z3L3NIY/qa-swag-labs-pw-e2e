import { expect } from "@playwright/test";
import { credentials } from "../../test-data/credentials.data";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { loginErrors } from "../../test-data/forms-validation-errors.data";
import { errorMessageCheck } from "../../utils/form-error-message-check";

type LoginCase = {
    title: string;
    userToLogin: { username: string; password: string };
    verify: (loginPage: LoginPage) => Promise<void>;
};

export const testsData = [
    {
        title: "Login with valid credentials",
        userToLogin: credentials.standardUser,
        verify: async (loginPage: LoginPage) => {
            await expect(loginPage.currentPage).toHaveURL(/\/inventory\.html$/);
        },
    },
    {
        title: "Login with invalid username",
        userToLogin: credentials.invalidUsernameUser,
        verify: async (loginPage: LoginPage) => {
            await errorMessageCheck(loginPage.locators.errorMessage, [
                loginErrors.invalidUsername,
            ]);
        },
    },
    {
        title: "Login with invalid password",
        userToLogin: credentials.invalidPasswordUser,
        verify: async (loginPage: LoginPage) => {
            await errorMessageCheck(loginPage.locators.errorMessage, [
                loginErrors.invalidPassword,
            ]);
        },
    },
    {
        title: "Login with empty credentials",
        userToLogin: credentials.emptyUsernameAndPasswordUser,
        verify: async (loginPage: LoginPage) => {
            await errorMessageCheck(loginPage.locators.errorMessage, [
                loginErrors.usernameIsRequired,
                //loginErrors.passwordIsRequired,
            ]);
        },
    },
    {
        title: "Login with empty username",
        userToLogin: credentials.emptyUsernameUser,
        verify: async (loginPage: LoginPage) => {
            await errorMessageCheck(loginPage.locators.errorMessage, [
                loginErrors.usernameIsRequired,
            ]);
        },
    },
    {
        title: "Login with empty password",
        userToLogin: credentials.emptyPasswordUser,
        verify: async (loginPage: LoginPage) => {
            await errorMessageCheck(loginPage.locators.errorMessage, [
                loginErrors.passwordIsRequired,
            ]);
        },
    },
    {
        title: "Login with locked out credentials",
        userToLogin: credentials.lockedOutUser,
        verify: async (loginPage: LoginPage) => {
            await errorMessageCheck(loginPage.locators.errorMessage, [
                loginErrors.userIsLockedOut,
            ]);
        },
    },
];
