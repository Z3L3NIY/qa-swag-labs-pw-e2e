import { Locator, Page } from "@playwright/test";
import { BasePageLocator } from "../BasePage/BasePageLocator";

export class LoginPageLocator extends BasePageLocator {
    readonly usernameInput: Locator = this.page.getByRole("textbox", {
        name: "Username",
    });
    readonly passwordInput: Locator = this.page.getByRole("textbox", {
        name: "Password",
    });
    readonly loginButton: Locator = this.page.getByRole("button", {
        name: "Login",
    });
    readonly errorMessage: Locator = this.page.getByTestId("error");
}
