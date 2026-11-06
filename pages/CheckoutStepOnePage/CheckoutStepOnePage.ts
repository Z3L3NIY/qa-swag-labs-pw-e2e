import { Page } from "@playwright/test";
import { BasePage } from "../BasePage/BasePage";

export class CheckoutStepOnePagertPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async fillFirstName(firstName: string) {}

    async fillLastName(lastName: string) {}

    async fillZipCode(zipCode: string) {}

    async continue() {}
}
