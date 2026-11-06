import { Page } from "@playwright/test";
import { BasePage } from "../BasePage/BasePage";

export class CartPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async removeFromCartByTitle(title: string) {}

    async getPriceByTitle(title: string) {}

    async checkout() {}

    async continueShopping() {}
}
