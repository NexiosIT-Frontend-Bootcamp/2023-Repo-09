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

// Get chatrooms API result
export interface ChatroomsResult {
    _id?: string;
    name?: string;
    allowedUsers?: string[];
}

// Get messages API result
export interface MessagesResult {
    _id?: string;
    user?: string;
    chatroom?: string;
    data?: string;
    published_at?: string;
}