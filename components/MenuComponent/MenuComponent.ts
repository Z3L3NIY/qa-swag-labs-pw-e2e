import { expect, Page } from "@playwright/test";
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
        await expect(async () => {
            if (
                (await this.locators.burgerMenuWrap.getAttribute(
                    "aria-hidden",
                )) !== "false"
            ) {
                await this.locators.burgerBT.click();
            }
            await expect(this.locators.burgerMenuWrap).toHaveAttribute(
                "aria-hidden",
                "false",
                { timeout: 1_000 },
            );
            await expect(this.locators.logOutLink).toBeInViewport({
                timeout: 1_000,
            });
        }).toPass({ timeout: 10_000 });
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
