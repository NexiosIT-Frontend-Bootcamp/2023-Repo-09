import axios from "axios";
import { getApiBaseUrl, getDefaultHeaders } from "../util/ContextFunctions";
import { ChatroomsResult } from "../types/ApiResults";

export const GetChatrooms = async (jwt: string): Promise<ChatroomsResult[]> => {
    const url = getApiBaseUrl() + "/rooms";

    const response = await axios.get(url, { headers: getDefaultHeaders(jwt) });
    return response.data;

};