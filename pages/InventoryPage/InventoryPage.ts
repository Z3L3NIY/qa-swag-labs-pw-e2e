import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage/BasePage";
import { InventoryPageLocator } from "./InventoryPageLocator";

export class InventoryPage extends BasePage {
    readonly locators: InventoryPageLocator = new InventoryPageLocator(
        this.page,
    );
    static readonly sortingOptions = {
        NameAtoZ: "az",
        NameZtoA: "za",
        PriceLowToHigh: "lohi",
        PriceHighToLow: "hilo",
    } as const;

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

    async addToCartByTitle(title: string) {
        await this.getInventoryItemByTitle(title)
            .locator(this.locators.inventoryItemAddToCartBT)
            .click();
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

    async getCartBadgeCounterValue() {
        return await this.locators.shoppingCartBadge.innerText();
    }

    async openCart() {
        await this.locators.shoppingCartLink.click();
    }

    async sortProducts(filterOption: string) {
        await this.locators.filterSelector.selectOption(filterOption);
    }
}
