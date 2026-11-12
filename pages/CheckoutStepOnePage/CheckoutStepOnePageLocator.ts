import { Locator } from "@playwright/test";
import { BasePageLocator } from "../BasePage/BasePageLocator";

export class CheckoutStepOnePageLocator extends BasePageLocator {
    readonly firstName: Locator = this.page.getByTestId("firstName");
    readonly lastName: Locator = this.page.getByTestId("lastName");
    readonly postalCode: Locator = this.page.getByTestId("postalCode");
    readonly errorMessage: Locator = this.page.getByTestId("error");
    readonly cancelBt: Locator = this.page.getByTestId("cancel");
    readonly continueBT: Locator = this.page.getByTestId("continue");
}
