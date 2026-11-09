import { expect } from "@playwright/test";
import { InventoryPage } from "../../pages/InventoryPage/InventoryPage";

export const testsData = [
    {
        title: "Price (High to Low)",
        filterOption: InventoryPage.sortingOptions.PriceHighToLow,
        verify: async (inventoryPage: InventoryPage) => {
            const allPrices =
                await inventoryPage.locators.inventoryItemPrice.allInnerTexts();
            const allIntPrices = allPrices.map((value) => {
                return parseFloat(value.slice(1));
            });
            expect(allIntPrices).toEqual(
                allIntPrices.toSorted((a, b) => b - a),
            );
        },
    },
    {
        title: "Price (Low to High)",
        filterOption: InventoryPage.sortingOptions.PriceLowToHigh,
        verify: async (inventoryPage: InventoryPage) => {
            const allPrices =
                await inventoryPage.locators.inventoryItemPrice.allInnerTexts();
            const allIntPrices = allPrices.map((value) => {
                return parseFloat(value.slice(1));
            });
            expect(allIntPrices).toEqual(
                allIntPrices.toSorted((a, b) => a - b),
            );
        },
    },
    {
        title: "Name (Z to A)",
        filterOption: InventoryPage.sortingOptions.NameZtoA,
        verify: async (inventoryPage: InventoryPage) => {
            const allTitles =
                await inventoryPage.locators.inventoryItemName.allInnerTexts();
            expect(allTitles).toEqual(allTitles.toSorted().toReversed());
        },
    },
    {
        title: "Name (A to Z)",
        filterOption: InventoryPage.sortingOptions.NameAtoZ,
        verify: async (inventoryPage: InventoryPage) => {
            const allTitles =
                await inventoryPage.locators.inventoryItemName.allInnerTexts();
            expect(allTitles).toEqual(allTitles.toSorted());
        },
    },
];
