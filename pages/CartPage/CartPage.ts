import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage/BasePage";
import { CartPageLocator } from "./CartPageLocators";

export class CartPage extends BasePage {
    readonly locators: CartPageLocator = new CartPageLocator(this.page);

    constructor(page: Page) {
        super(page);
    }

    private getInventoryItemByTitle(title: string): Locator {
        return this.locators.inventoryItem.filter({
            has: this.locators.inventoryItemName.filter({
                hasText: title,
            }),
        });
    }

    async removeFromCartByTitle(title: string) {
        await this.getInventoryItemByTitle(title)
            .locator(this.locators.inventoryItemRemoveBT)
            .click();
    }

    async getPriceByTitle(title: string) {
        return await this.getInventoryItemByTitle(title)
            .locator(this.locators.inventoryItemPrice)
            .innerText();
    }

    async checkout() {
        await this.locators.checkoutBT.click();
    }

    async continueShopping() {
        await this.locators.continueShoppingBT.click();
    }
}
