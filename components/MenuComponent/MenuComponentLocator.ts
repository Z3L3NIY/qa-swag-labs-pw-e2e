import { Locator } from "@playwright/test";
import { BaseComponentLocator } from "../BaseComponent/BaseComponentLocator";

export class MenuComponentLocator extends BaseComponentLocator {
    readonly root: Locator = this.page.locator("#menu_button_container");
    readonly burgerMenuWrap: Locator = this.root.locator(".bm-menu-wrap");
    readonly burgerMenu: Locator = this.root.locator(".bm-menu");
    readonly burgerBT: Locator = this.root.locator(".bm-burger-button");
    readonly burgerCloseBT: Locator = this.root.locator(
        "#react-burger-cross-btn",
    );
    readonly resetAppStateLink: Locator =
        this.root.getByTestId("reset-sidebar-link");
    readonly logOutLink: Locator = this.root.getByTestId("logout-sidebar-link");
}
