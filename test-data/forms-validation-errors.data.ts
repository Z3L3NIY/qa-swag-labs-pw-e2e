export const loginErrors = {
    usernameIsRequired: "Epic sadface: Username is required",
    passwordIsRequired: "Epic sadface: Password is required",
    invalidUsername:
        "Epic sadface: Username and password do not match any user in this service",
    invalidPassword:
        "Epic sadface: Username and password do not match any user in this service",
    userIsLockedOut: "Epic sadface: Sorry, this user has been locked out.",
} as const;

export const checkoutErrors = {
    firstNameIsRequired: "Error: First Name is required",
    lastNameIsRequired: "Error: Last Name is required",
    postalCodeIsRequired: "Error: Postal Code is required",
} as const;
