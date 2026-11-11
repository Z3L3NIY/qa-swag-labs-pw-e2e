import { Locator, Page } from "@playwright/test";
import { BasePageLocator } from "../BasePage/BasePageLocator";

export class CartPageLocator extends BasePageLocator {
    readonly inventoryItem: Locator = this.page.getByTestId("inventory-item");
    readonly inventoryItemQuantity: Locator =
        this.page.getByTestId("item-quantity");
    readonly inventoryItemName: Locator = this.page.getByTestId(
        "inventory-item-name",
    );
    readonly inventoryItemDescription: Locator = this.page.getByTestId(
        "inventory-item-desc",
    );
    readonly inventoryItemPrice: Locator = this.page.getByTestId(
        "inventory-item-price",
    );
    readonly inventoryItemRemoveBT: Locator = this.page.getByTestId(/^remove-/);
    readonly continueShoppingBT: Locator =
        this.page.getByTestId("continue-shopping");
    readonly checkoutBT: Locator = this.page.getByTestId("checkout");
}
