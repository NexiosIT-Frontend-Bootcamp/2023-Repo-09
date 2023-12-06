export interface ApiResultBase {
    isSuccess: boolean;
    error?: string;
}

// Authentication API result
export interface LoginResult extends ApiResultBase {
    accessToken?: string;
}