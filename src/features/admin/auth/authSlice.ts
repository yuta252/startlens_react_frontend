import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

import { RootState } from '../../../app/store';
import {
    AUTH_STATE,
    CRED,
    ERROR,
    ERROR_RESPONSE,
    GEO_API_RESPONSE,
    JWT,
    LOGIN_USER,
    POST_GEO,
    POST_PROFILE,
    PROFILE,
    THUMBNAIL_BASE64,
    USER
} from "../../types";


export const fetchAsyncLogin = createAsyncThunk(
    "auth/login",
    async (auth: CRED) => {
        const res = await axios.post<JWT>(
            `${process.env.REACT_APP_API_URL}/api/v1/token`,
            { "user": auth },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return res.data
    }
);

export const fetchAsyncRegister = createAsyncThunk(
    "auth/register",
    async (auth: CRED) => {
        const res = await axios.post<USER | ERROR_RESPONSE>(
            `${process.env.REACT_APP_API_URL}/api/v1/users`,
            { "user": auth },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return res.data
    }
);

export const fetchAsyncGetUserInfo = createAsyncThunk(
    "auth/load",
    async () => {
        const res = await axios.get<LOGIN_USER>(
            `${process.env.REACT_APP_API_URL}/api/v1/load`,
            {
                headers: {
                    Authorization: `${localStorage.localJWT}`,
                },
            }
        );
        return res.data
    }
);

export const fetchAsyncUpdateProfile = createAsyncThunk(
    "profile/updateProfile",
    async (profile: POST_PROFILE | POST_GEO) => {
        const res = await axios.patch<PROFILE>(
            `${process.env.REACT_APP_API_URL}/api/v1/profiles/1`,
            { "profile": profile },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.localJWT}`,
                },
            }
        );
        return res.data
    }
);

export const fetchAsyncUpdateThumbnail = createAsyncThunk(
    "profile/updateThumbnail",
    async (thumbnail: THUMBNAIL_BASE64) => {
        const res = await axios.patch<PROFILE>(
            `${process.env.REACT_APP_API_URL}/api/v1/profiles/1`,
            { "profile": thumbnail },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.localJWT}`,
                },
            }
        );
        return res.data
    }
);


export const fetchAsyncGetGeocodingInfo = createAsyncThunk(
    "profile/getGeocodingInfo",
    async (address: string) => {
        const res = await axios.get<GEO_API_RESPONSE>(
            `${process.env.REACT_APP_GEOCODING_API_URL}address=${address}&key=${process.env.REACT_APP_GEOCODING_API_KEY}`,
        );
        console.log(res.data)
        return res.data
    }
);

const initialState: AUTH_STATE = {
    error: {
        isError: false,
        message: ""
    },
    isLoginView: true,
    isLoading: false,
    isProfileEdited: false,
    loginUser: {
        id: 0,
        email: "",
        profile: {
            id: 0,
            userId: 0,
            majorCategory: 0,
            telephone: "",
            companySite: "",
            thumbnail: {
                url: "",
            },
            latitude: null,
            longitude: null
        },
    },
    editedProfile: {
        majorCategory: 0,
        telephone: "",
        companySite: "",
    },
    editedProfileError: {
        isError: false,
        message: ""
    },
    editedThumbnailImage: {
        imageFile: ""
    },
    editedThumbnailError: {
        isError: false,
        message: ""
    }
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleMode(state) {
            state.isLoginView = !state.isLoginView;
        },
        showError(state, action: PayloadAction<ERROR>) {
            state.error = action.payload;
        },
        toggleLoading(state) {
            state.isLoading = !state.isLoading;
        },
        toggleProfileEdit(state) {
            state.isProfileEdited = !state.isProfileEdited;
        },
        editProfile(state, action: PayloadAction<POST_PROFILE>) {
            state.editedProfile = action.payload;
        },
        editThumbnailImage(state, action: PayloadAction<THUMBNAIL_BASE64>) {
            state.editedThumbnailImage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchAsyncLogin.fulfilled,
            (state, action: PayloadAction<JWT>) => {
                localStorage.setItem("localJWT", action.payload.token);
            }
        );
        builder.addCase(
            fetchAsyncGetUserInfo.fulfilled,
            (state, action: PayloadAction<LOGIN_USER>) => {
                return {
                    ...state,
                    loginUser: action.payload,
                }
            }
        );
        builder.addCase(
            fetchAsyncRegister.rejected,
            (state) => {
                return {
                    ...state, error: { isError: true, message: "メールアドレスもしくはパスワードに誤りがあります。" }
                }
            }
        );
        builder.addCase(
            fetchAsyncUpdateProfile.fulfilled,
            (state, action: PayloadAction<PROFILE>) => {
                console.log("fetchupdateprofile", action.payload)
                return {
                    ...state,
                    loginUser: {
                        ...state.loginUser,
                        profile: action.payload
                    }
                }
            }
        );
        builder.addCase(
            fetchAsyncUpdateThumbnail.fulfilled,
            (state, action: PayloadAction<PROFILE>) => {
                return {
                    ...state,
                    loginUser: {
                        ...state.loginUser,
                        profile: action.payload
                    }
                }
            }
        );
        builder.addCase(
            fetchAsyncGetGeocodingInfo.fulfilled,
            (state, action: PayloadAction<GEO_API_RESPONSE>) => {
                const results = action.payload.results;
                return {
                    ...state,
                    loginUser: {
                        ...state.loginUser,
                        profile: {
                            ...state.loginUser.profile,
                            latitude: results[0]?.geometry.location.lat,
                            longitude: results[0]?.geometry.location.lng
                        }
                    }
                }
            }
        );
    },
});

export const { toggleMode, showError, toggleLoading, toggleProfileEdit, editProfile, editThumbnailImage } = authSlice.actions;

export const selectIsLoginView = (state: RootState) => state.auth.isLoginView;
export const selectLoginUser = (state: RootState) => state.auth.loginUser;
export const selectEditedProfile = (state: RootState) => state.auth.editedProfile;
export const selectEditedProfileError = (state: RootState) => state.auth.editedProfileError;
export const selectEditedThumbnailImage = (state: RootState) => state.auth.editedThumbnailImage;
export const selectEditedThumbnailError = (state: RootState) => state.auth.editedThumbnailError;
export const selectError = (state: RootState) => state.auth.error;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectIsProfileEdited = (state: RootState) => state.auth.isProfileEdited;

export default authSlice.reducer;
