import { Locator } from "@playwright/test";
import { BasePageLocator } from "../BasePage/BasePageLocator";

export class CheckoutStepTwoPageLocator extends BasePageLocator {
    readonly inventoryItem: Locator = this.page.getByTestId("inventory-item");
    readonly inventoryItemName: Locator = this.page.getByTestId(
        "inventory-item-name",
    );
    readonly inventoryItemDescription: Locator = this.page.getByTestId(
        "inventory-item-desc",
    );
    readonly inventoryItemPrice: Locator = this.page.getByTestId(
        "inventory-item-price",
    );
    readonly paymentInfoLabel: Locator =
        this.page.getByTestId("payment-info-label");
    readonly paymentInfoValue: Locator =
        this.page.getByTestId("payment-info-value");
    readonly shippingInfoLabel: Locator = this.page.getByTestId(
        "shipping-info-label",
    );
    readonly shippingInfoValue: Locator = this.page.getByTestId(
        "shipping-info-value",
    );
    readonly totalInfoLabel: Locator =
        this.page.getByTestId("total-info-label");
    readonly subtotalLabel: Locator = this.page.getByTestId("subtotal-label");
    readonly taxLabel: Locator = this.page.getByTestId("tax-label");
    readonly totalLabel: Locator = this.page.getByTestId("total-label");
    readonly cancelBT: Locator = this.page.getByTestId("cancel");
    readonly finishBT: Locator = this.page.getByTestId("finish");
}
