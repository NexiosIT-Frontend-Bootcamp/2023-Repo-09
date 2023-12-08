import axios from "axios";
import { getApiBaseUrl, getDefaultHeaders } from "../util/ContextFunctions";
import { MessagesResult } from "../types/ApiResults";

export const GetMessages = async (jwt: string): Promise<MessagesResult[]> => {
    const url = getApiBaseUrl() + "/messages";

    const response = await axios.get(url, { headers: getDefaultHeaders(jwt) });
    return response.data;

};