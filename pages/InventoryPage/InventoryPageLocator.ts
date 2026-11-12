import { Locator } from "@playwright/test";
import { BasePageLocator } from "../BasePage/BasePageLocator";

export class InventoryPageLocator extends BasePageLocator {
    readonly inventoryContainer: Locator = this.page.getByTestId(
        "inventory-container",
    );
    readonly inventoryList: Locator = this.page.getByTestId("inventory-list");
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
    readonly inventoryItemAddToCartBT: Locator =
        this.page.getByTestId(/^add-to-cart-/);
    readonly inventoryItemRemoveBT: Locator = this.page.getByTestId(/^remove-/);
    readonly shoppingCartLink: Locator =
        this.page.getByTestId("shopping-cart-link");
    readonly shoppingCartBadge: Locator = this.page.getByTestId(
        "shopping-cart-badge",
    );
    readonly filterSelector: Locator = this.page.getByTestId(
        "product-sort-container",
    );
}
