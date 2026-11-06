import { Page } from "@playwright/test";
import { BasePage } from "../BasePage/BasePage";

export class CheckoutStepTwoPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
}
