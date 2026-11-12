import { expect } from "@playwright/test";
import { credentials } from "../../test-data/credentials.data";
import { checkoutErrors } from "../../test-data/forms-validation-errors.data";
import { CheckoutStepOnePage } from "../../pages/CheckoutStepOnePage/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../../pages/CheckoutStepTwoPage/CheckoutStepTwoPage";
import { errorMessageCheck } from "../../utils/form-error-message-check";

export const testsData = [
    {
        title: "Checkout form filled with valid data",
        firstName: credentials.standardUser.checkout.firstName,
        lastName: credentials.standardUser.checkout.lastName,
        postalCode: credentials.standardUser.checkout.postalCode,
        verify: async (checkoutStepOnePage: CheckoutStepOnePage) => {
            await expect
                .poll(() => checkoutStepOnePage.getUrl())
                .toMatch(/\/checkout-step-two\.html$/);
        },
    },
    {
        title: "Checkout form with empty fields",
        firstName: "",
        lastName: "",
        postalCode: "",
        verify: async (checkoutStepOnePage: CheckoutStepOnePage) => {
            await errorMessageCheck(checkoutStepOnePage.locators.errorMessage, [
                checkoutErrors.firstNameIsRequired,
                //checkoutErrors.lastNameIsRequired,
                //checkoutErrors.postalCodeIsRequired,
            ]);
        },
    },
    {
        title: "Checkout form missing First Name",
        firstName: "",
        lastName: credentials.standardUser.checkout.lastName,
        postalCode: credentials.standardUser.checkout.postalCode,
        verify: async (checkoutStepOnePage: CheckoutStepOnePage) => {
            await errorMessageCheck(checkoutStepOnePage.locators.errorMessage, [
                checkoutErrors.firstNameIsRequired,
            ]);
        },
    },
    {
        title: "Checkout form missing Last Name",
        firstName: credentials.standardUser.checkout.firstName,
        lastName: "",
        postalCode: credentials.standardUser.checkout.postalCode,
        verify: async (checkoutStepOnePage: CheckoutStepOnePage) => {
            await errorMessageCheck(checkoutStepOnePage.locators.errorMessage, [
                checkoutErrors.lastNameIsRequired,
            ]);
        },
    },
    {
        title: "Checkout form missing Postal Code",
        firstName: credentials.standardUser.checkout.firstName,
        lastName: credentials.standardUser.checkout.lastName,
        postalCode: "",
        verify: async (checkoutStepOnePage: CheckoutStepOnePage) => {
            await errorMessageCheck(checkoutStepOnePage.locators.errorMessage, [
                checkoutErrors.postalCodeIsRequired,
            ]);
        },
    },
];
