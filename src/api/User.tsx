import axios from "axios";
import { getApiBaseUrl, getDefaultHeaders } from "../util/ContextFunctions";
import { ApiResultBase, LoginResult } from "../types/ApiResults";



export const LoginUser = async (email: string, password: string): Promise<LoginResult> => {
    const url = getApiBaseUrl() + "/auth/login";

    try {
        const response = await axios.post(url, { email, password });

        if (response.data && response.data.access_token) {
            console.log("LoginUser success")
            return {
                isSuccess: true,
                accessToken: response.data.access_token,
            };
        }

        console.log("LoginUser failed")
        return {
            isSuccess: false,
            error: "Invalid response",
        };
    } catch (e) {
        // handle error
        console.log(e);
        return {
            isSuccess: false,
        };
    }
};

// Get a user details for a given token
export const DEFAULT_ERROR_RESULT: ApiResultBase = {
    isSuccess: false,
    error: "An error occurred"
  }
  
  // Get a user details for a given token
export const GetUser = async (jwt: string): Promise<any> => {
    const url = getApiBaseUrl() + "/users/profile";

    try {
        const response = await axios.get(url, { headers: getDefaultHeaders(jwt) });
        if (response.data) {
            return {
                isSuccess: true,
                user: response.data,
            };
        }

        return DEFAULT_ERROR_RESULT;
    } catch (e) {
        // handle errors
    }
};

