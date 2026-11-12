import { Page } from "@playwright/test";
import { BasePage } from "../BasePage/BasePage";
import { CheckoutStepTwoPageLocator } from "./CheckoutStepTwoPageLocator";
import { parsePrice } from "../../utils/parse-item-price";
export class CheckoutStepTwoPage extends BasePage {
    readonly locators: CheckoutStepTwoPageLocator =
        new CheckoutStepTwoPageLocator(this.page);

    constructor(page: Page) {
        super(page);
    }

    async calculateExpectedTotal() {
        const allPrices =
            await this.locators.inventoryItemPrice.allInnerTexts();
        const expectedTotal = allPrices
            .reduce((sum, price) => sum + parsePrice(price), 0)
            .toFixed(2);
        return expectedTotal;
    }
}
