export interface ApiResultBase {
    isSuccess: boolean;
    error?: string;
}

// Log in API result
export interface LoginResult extends ApiResultBase {
    accessToken?: string;
}

// Registration API result
export interface RegisterResult extends ApiResultBase {
    username?: string;
    email?: string;
    id?: string;
}