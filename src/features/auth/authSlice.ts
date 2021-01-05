import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from "axios";
import {
    AUTH_STATE,
    CRED,
    LOGIN_USER,
    POST_PROFILE,
    PROFILE,
    JWT,
    USER,
    ERROR,
    ERROR_RESPONSE,
    THUMBNAIL_BASE64
} from "../types";


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
    async (profile: POST_PROFILE) => {
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

/*
export const fetchAsyncCrateMyProf = createAsyncThunk(
    "auth/createProfile",
    async () => {
        const res = await axios.post<PROFILE>(
            `${process.env.REACT_APP_API_URL}/api/profile/`,
            { img: null},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            }
        );
        return res.data
    }
);


export const fetchAsyncGetProfs = createAsyncThunk(
    "auth/getProfiles",
    async () => {
        const res = await axios.get<PROFILE[]>(
            `${process.env.REACT_APP_API_URL}/api/profile/`,
            {
                headers: {
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            }
        );
        return res.data
    }
);


export const fetchAsyncUpdateProf = createAsyncThunk(
    "auth/updateProfile",
    async (profile: POST_PROFILE) => {
        const uploadData = new FormData();
        profile.img && uploadData.append("img", profile.img, profile.img.name)
        const res = await axios.put<PROFILE>(
            `${process.env.REACT_APP_API_URL}/api/profile/${profile.id}`,
            uploadData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            }
        );
        return res.data
    }
);
*/

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
            }
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
        /*
        builder.addCase(
            fetchAsyncGetMyProf.fulfilled,
            (state, action: PayloadAction<LOGIN_USER>) => {
                return {
                    ...state,
                    loginUser: action.payload,
                }
            }
        );
        builder.addCase(
            fetchAsyncGetProfs.fulfilled,
            (state, action: PayloadAction<PROFILE[]>) => {
                return {
                    ...state,
                    profiles: action.payload,
                }
            }
        );
        builder.addCase(
            fetchAsyncUpdateProf.fulfilled,
            (state, action: PayloadAction<PROFILE>) => {
                return {
                    ...state,
                    profiles: state.profiles.map( (prof) =>
                        prof.id === action.payload.id ? action.payload : prof
                    ),
                };
            }
        );
        */
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
