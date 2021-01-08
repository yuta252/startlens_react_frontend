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
    lang: string;
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
    lang: string;
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
    isDisplayed: boolean;
    multiProfiles: READ_MULTI_PROFILE[];
    editedMultiProfile: POST_MULTI_PROFILE;
    selectedMultiProfile: READ_MULTI_PROFILE;
}

/* exhibitSlice */
export interface PICTURE {
    id: number;
    url: string;
}

export interface POST_PICTURE {
    exhibitId: number
    imageFile: string[];
}

export interface MULTI_EXHIBIT {
    id: number;
    exhibitId: number;
    lang: string;
    name: string;
    description: string;
}

export interface READ_EXHIBIT {
    id: number;
    pictures: PICTURE[];
    multiExhibits: MULTI_EXHIBIT[];
}

export interface POST_EXHIBIT {
    lang: string;
    name: string;
    description: string;
    imageFile: string[];
}

export interface READ_PICTURE {
    id: number;
    pictures: PICTURE[];
}

export interface PARAMS {
    last: number;
}

export interface EXHIBIT_STATE {
    error: ERROR;
    exhibits: READ_EXHIBIT[];
    params: PARAMS;
    isDisplayed: boolean
    editedPicture: READ_PICTURE;
    editedMultiExhibit: MULTI_EXHIBIT;
    selectPicture: READ_PICTURE;
    selectMultiExhibit: MULTI_EXHIBIT[];
}

export interface EXHIBIT_PAGINATE_INDEX {
    data: READ_EXHIBIT[];
    meta: {
        params: PARAMS;
    }
}
