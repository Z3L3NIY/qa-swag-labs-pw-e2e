import { Locator, Page } from "@playwright/test";

export abstract class BaseComponentLocator {
    protected readonly page: Page;
    abstract readonly root: Locator;

    constructor(page: Page) {
        this.page = page;
    }
}
