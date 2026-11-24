import { expect } from "@playwright/test";
import {
    credentials,
    checkout_user,
} from "../../../test-data/credentials.data";
import { checkoutErrors } from "../../../test-data/forms-validation-errors.data";
import { CheckoutStepOnePage } from "../../../pages/CheckoutStepOnePage/CheckoutStepOnePage";
import { errorMessageCheck } from "../../../utils/form-error-message-check";

export const testsData = [
    {
        title: "Checkout form filled with valid data",
        firstName: checkout_user.firstName,
        lastName: checkout_user.lastName,
        postalCode: checkout_user.postalCode,
        verify: async (checkoutStepOnePage: CheckoutStepOnePage) => {
            await expect(checkoutStepOnePage.currentPage).toHaveURL(
                /\/checkout-step-two\.html$/,
            );
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
        lastName: checkout_user.lastName,
        postalCode: checkout_user.postalCode,
        verify: async (checkoutStepOnePage: CheckoutStepOnePage) => {
            await errorMessageCheck(checkoutStepOnePage.locators.errorMessage, [
                checkoutErrors.firstNameIsRequired,
            ]);
        },
    },
    {
        title: "Checkout form missing Last Name",
        firstName: checkout_user.firstName,
        lastName: "",
        postalCode: checkout_user.postalCode,
        verify: async (checkoutStepOnePage: CheckoutStepOnePage) => {
            await errorMessageCheck(checkoutStepOnePage.locators.errorMessage, [
                checkoutErrors.lastNameIsRequired,
            ]);
        },
    },
    {
        title: "Checkout form missing Postal Code",
        firstName: checkout_user.firstName,
        lastName: checkout_user.lastName,
        postalCode: "",
        verify: async (checkoutStepOnePage: CheckoutStepOnePage) => {
            await errorMessageCheck(checkoutStepOnePage.locators.errorMessage, [
                checkoutErrors.postalCodeIsRequired,
            ]);
        },
    },
];
