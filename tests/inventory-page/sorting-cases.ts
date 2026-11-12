import { expect } from "@playwright/test";
import { InventoryPage } from "../../pages/InventoryPage/InventoryPage";
import { parsePrice } from "../../utils/parse-item-price";

async function getPrices(inventoryPage: InventoryPage) {
    const allPrices =
        await inventoryPage.locators.inventoryItemPrice.allInnerTexts();
    const allIntPrices = allPrices.map((price) => parsePrice(price));
    return allIntPrices;
}

async function getNames(inventoryPage: InventoryPage) {
    return inventoryPage.locators.inventoryItemName.allInnerTexts();
}

export const testsData = [
    {
        title: "Price (High to Low)",
        filterOption: InventoryPage.sortingOptions.PriceHighToLow,
        verify: async (inventoryPage: InventoryPage) => {
            const allPrices = await getPrices(inventoryPage);
            expect(allPrices).toEqual(allPrices.toSorted((a, b) => b - a));
        },
    },
    {
        title: "Price (Low to High)",
        filterOption: InventoryPage.sortingOptions.PriceLowToHigh,
        verify: async (inventoryPage: InventoryPage) => {
            const allPrices = await getPrices(inventoryPage);
            expect(allPrices).toEqual(allPrices.toSorted((a, b) => a - b));
        },
    },
    {
        title: "Name (Z to A)",
        filterOption: InventoryPage.sortingOptions.NameZtoA,
        verify: async (inventoryPage: InventoryPage) => {
            const allTitles = await getNames(inventoryPage);
            expect(allTitles).toEqual(allTitles.toSorted().toReversed());
        },
    },
    {
        title: "Name (A to Z)",
        filterOption: InventoryPage.sortingOptions.NameAtoZ,
        verify: async (inventoryPage: InventoryPage) => {
            const allTitles = await getNames(inventoryPage);
            expect(allTitles).toEqual(allTitles.toSorted());
        },
    },
];
