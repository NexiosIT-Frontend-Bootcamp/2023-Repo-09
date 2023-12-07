import { ApiResultBase } from "../types/ApiResults";

export const DEFAULT_ERROR_RESULT: ApiResultBase = {
    isSuccess: false,
    error: "An error occurred"
  }

export const getApiBaseUrl = (): string => {
    return "https://lobster-app-osqfh.ondigitalocean.app";
};

export const getDefaultHeaders = (jwt: string) => {
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
    };
};
