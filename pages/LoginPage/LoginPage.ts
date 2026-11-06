import { Page } from "@playwright/test";
import { BasePage } from "../BasePage/BasePage";
import { LoginPageLocator } from "./LoginPageLocator";

export class LoginPage extends BasePage {
    readonly locators: LoginPageLocator = new LoginPageLocator(this.page);

    constructor(page: Page) {
        super(page);
    }

    public async login(name: string = "", password: string = "") {
        await this.locators.usernameInput.fill(name);
        await this.locators.passwordInput.fill(password);
        await this.locators.loginButton.click();
    }

    public async open() {
        await this.page.goto("/");
    }
}
