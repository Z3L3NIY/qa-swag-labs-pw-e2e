import { Page } from "@playwright/test";
import { BasePage } from "../BasePage/BasePage";
import { CheckoutStepTwoPageLocator } from "./CheckoutStepTwoPageLocator";

export class CheckoutStepTwoPage extends BasePage {
    readonly locators: CheckoutStepTwoPageLocator =
        new CheckoutStepTwoPageLocator(this.page);

    constructor(page: Page) {
        super(page);
    }
}
