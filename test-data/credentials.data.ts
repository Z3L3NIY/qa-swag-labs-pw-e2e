import { required } from "../utils/env-var-check";

const credentials = {
    standardUser: {
        username: required("STANDARD_USER"),
        password: required("PASSWORD"),
    },
    lockedOutUser: {
        username: required("LOCKED_OUT_USER"),
        password: required("PASSWORD"),
    },
    problemUser: {
        username: required("PROBLEM_USER"),
        password: required("PASSWORD"),
    },
    performanceGlitchUser: {
        username: required("PERFORMANCE_GLITCH_USER"),
        password: required("PASSWORD"),
    },
    errorUser: {
        username: required("ERROR_USER"),
        password: required("PASSWORD"),
    },
    visualUser: {
        username: required("VISUAL_USER"),
        password: required("PASSWORD"),
    },
    invalidUsernameUser: {
        username: "invalid_user",
        password: required("PASSWORD"),
    },
    invalidPasswordUser: {
        username: required("STANDARD_USER"),
        password: "invalid_password",
    },
    invalidUsernameAndPasswordUser: {
        username: "invalid_user",
        password: "invalid_password",
    },
    emptyUsernameAndPasswordUser: {
        username: "",
        password: "",
    },
    emptyUsernameUser: {
        username: "",
        password: required("PASSWORD"),
    },
    emptyPasswordUser: {
        username: required("STANDARD_USER"),
        password: "",
    },
} as const;

const checkout_user = {
    firstName: "Inigo",
    lastName: "Montoya",
    postalCode: "12345",
} as const;

export { credentials, checkout_user };
