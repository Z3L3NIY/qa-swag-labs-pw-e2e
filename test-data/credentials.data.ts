import { required } from "../utils/env-var-check";

export const credentials = {
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
    invalidUser: {
        username: "invalid_user",
        password: "invalid_password",
    },
} as const;
