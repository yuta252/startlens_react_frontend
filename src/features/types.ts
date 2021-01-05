/* Common types */
export interface ERROR {
    isError: boolean;
    message: string;
}

export interface ERROR_RESPONSE {
    errors: {
        [key: string]: string[]
    }
}

/* authSlice.ts */

export interface CRED {
    email: string;
    password: string;
}

export interface USER {
    id: number;
    email: string;
}

export interface JWT {
    token: string;
    email: string;
}

export interface PROFILE {
    id: number;
    userId: number;
    majorCategory: number;
    telephone: string;
    companySite: string;
    thumbnail: {
        url: string;
    }
}

export interface POST_PROFILE {
    majorCategory: number;
    telephone: string;
    companySite: string;
}

export interface LOGIN_USER {
    id: number;
    email: string;
    profile: PROFILE;
}

export interface THUMBNAIL_BASE64 {
    imageFile: string;
}

export interface AUTH_STATE {
    error: ERROR;
    isLoginView: boolean;
    isLoading: boolean;
    isProfileEdited: boolean;
    loginUser: LOGIN_USER;
    editedProfile: POST_PROFILE;
    editedProfileError: ERROR;
    editedThumbnailImage: THUMBNAIL_BASE64;
    editedThumbnailError: ERROR;
}

/* profileSlice */
export interface READ_MULTI_PROFILE {
    id: number;
    userId: number;
    username: string;
    selfIntro: string;
    addressPrefecture: string;
    addressCity: string;
    addressStreet: string;
    entranceFee: string;
    businessHours: string;
    holiday: string;
    translated: number;
}

export interface POST_MULTI_PROFILE {
    id: number;
    username: string;
    selfIntro: string;
    addressPrefecture: string;
    addressCity: string;
    addressStreet: string;
    entranceFee: string;
    businessHours: string;
    holiday: string;
    translated: number;
}


export interface PROFILE_STATE {
    error: ERROR;
    multiProfiles: READ_MULTI_PROFILE[];
    editedMultiProfiles: POST_MULTI_PROFILE;
    selectedMultiProfiles: READ_MULTI_PROFILE;
}
