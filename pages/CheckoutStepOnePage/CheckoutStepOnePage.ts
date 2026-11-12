import { Page } from "@playwright/test";
import { BasePage } from "../BasePage/BasePage";
import { CheckoutStepOnePageLocator } from "./CheckoutStepOnePageLocator";

export class CheckoutStepOnePage extends BasePage {
    readonly locators: CheckoutStepOnePageLocator =
        new CheckoutStepOnePageLocator(this.page);

    constructor(page: Page) {
        super(page);
    }

    private async fillFirstName(firstName: string) {
        await this.locators.firstName.fill(firstName);
    }

    private async fillLastName(lastName: string) {
        await this.locators.lastName.fill(lastName);
    }

    private async fillZipCode(postalCode: string) {
        await this.locators.postalCode.fill(postalCode);
    }

    async submitCheckoutForm(
        firstName: string,
        lastName: string,
        postalCode: string,
    ) {
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillZipCode(postalCode);
        await this.continue();
    }

    async cancel() {
        await this.locators.cancelBt.click();
    }

    async continue() {
        await this.locators.continueBT.click();
    }
}
