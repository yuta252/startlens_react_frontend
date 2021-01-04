import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from "axios";
import {
    AUTH_STATE,
    CRED,
    LOGIN_USER,
    POST_PROFILE,
    PROFILE_STATE,
    PROFILE,
    JWT,
    USER,
    ERROR
} from "../types";



export const fetchAsyncGetProfile = createAsyncThunk(
    "profile/getProfile",
    async () => {
        const res = await axios.get<PROFILE>(
            `${process.env.REACT_APP_API_URL}/api/v1/profiles/4`,
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
        const res = await axios.put<PROFILE>(
            `${process.env.REACT_APP_API_URL}/api/v1/profiles/4`,
            { profile: profile },
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


const initialState: PROFILE_STATE = {
    error: {
        isError: false,
        message: ""
    },
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
    editedProfile: {
        majorCategory: 0,
        telephone: "",
        companySite: "",
    }
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchAsyncGetProfile.fulfilled,
            (state, action: PayloadAction<PROFILE>) => {
                return {
                    ...state,
                    profile: action.payload
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

export const { } = profileSlice.actions;


export const selectIsLoginView = (state: RootState) => state.auth.isLoginView;
export const selectLoginUser = (state: RootState) => state.auth.loginUser;
export const selectError = (state: RootState) => state.auth.error;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;

export default profileSlice.reducer;
