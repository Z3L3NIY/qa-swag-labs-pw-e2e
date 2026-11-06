import { Page } from "@playwright/test";
import { BasePage } from "../BasePage/BasePage";

export class InventoryPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async addToCartByTitle(title: string) {}

    async removeFromCartByTitle(title: string) {}

    async getPriceByTitle(title: string) {}
}
