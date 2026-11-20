import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "../BaseComponent/BaseComponent";
import { MenuComponentLocator } from "./MenuComponentLocator";

export class MenuComponent extends BaseComponent {
    readonly locators: MenuComponentLocator = new MenuComponentLocator(
        this.page,
    );

    constructor(page: Page) {
        super(page);
    }

    public async open() {
        await this.locators.burgerBT.click();
    }

    public async close() {
        await this.locators.burgerCloseBT.click();
    }

    public async resetAppState() {
        await this.locators.resetAppStateLink.click();
    }

    public async logout() {
        await this.locators.logOutLink.click();
    }
}
