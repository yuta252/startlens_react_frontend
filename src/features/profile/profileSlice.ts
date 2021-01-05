import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from "axios";
import {
    PROFILE_STATE,
    ERROR,
    POST_MULTI_PROFILE,
    READ_MULTI_PROFILE
} from "../types";


export const fetchAsyncCreateMultiProfile = createAsyncThunk(
    "profile/createMultiProfile",
    async (multiProfile: POST_MULTI_PROFILE) => {
        const res = await axios.post<READ_MULTI_PROFILE>(
            `${process.env.REACT_APP_API_URL}/api/v1/profiles`,
            { multi_profile: multiProfile },
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

export const fetchAsyncUpdateMultiProfile = createAsyncThunk(
    "profile/updateMultiProfile",
    async (multiProfile: POST_MULTI_PROFILE) => {
        const res = await axios.patch<READ_MULTI_PROFILE>(
            `${process.env.REACT_APP_API_URL}/api/v1/profiles/${multiProfile.id}`,
            { multi_profile: multiProfile },
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

export const fetchAsyncDeleteMultiProfile = createAsyncThunk(
    "profile/deleteMultiProfile",
    async (id: number) => {
        await axios.delete(
            `${process.env.REACT_APP_API_URL}/api/v1/profiles/${id}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.localJWT}`,
                },
            },
        );
        return id;
    }
);


export const initialState: PROFILE_STATE = {
    error: {
        isError: false,
        message: ""
    },
    multiProfiles: [
        {
            id: 0,
            userId: 0,
            lang: "",
            username: "",
            selfIntro: "",
            addressPrefecture: "",
            addressCity: "",
            addressStreet: "",
            entranceFee: "",
            businessHours: "",
            holiday: "",
            translated: 0
        },
    ],
    editedMultiProfile: {
        id: 0,
        lang: "",
        username: "",
        selfIntro: "",
        addressPrefecture: "",
        addressCity: "",
        addressStreet: "",
        entranceFee: "",
        businessHours: "",
        holiday: "",
        translated: 0
    },
    selectedMultiProfile: {
        id: 0,
        userId: 0,
        lang: "",
        username: "",
        selfIntro: "",
        addressPrefecture: "",
        addressCity: "",
        addressStreet: "",
        entranceFee: "",
        businessHours: "",
        holiday: "",
        translated: 0
    }
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        editMultiProfile(state, action: PayloadAction<POST_MULTI_PROFILE>) {
            state.editedMultiProfile = action.payload;
        },
        selectedMultiProfile(state, action: PayloadAction<READ_MULTI_PROFILE>) {
            state.selectedMultiProfile = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchAsyncCreateMultiProfile.fulfilled,
            (state, action: PayloadAction<READ_MULTI_PROFILE>) => {
                return {
                    ...state,
                    multiProfiles: [action.payload, ...state.multiProfiles],
                    editedProfiles: initialState.editedMultiProfile
                }
            }
        );
        builder.addCase(
            fetchAsyncUpdateMultiProfile.fulfilled,
            (state, action: PayloadAction<READ_MULTI_PROFILE>) => {
                return {
                    ...state,
                    multiProfiles: state.multiProfiles.map( (multiProfile) =>
                        multiProfile.id === action.payload.id ? action.payload : multiProfile
                    ),
                    editedProfiles: initialState.editedMultiProfile,
                    selectedProfiles: initialState.selectedMultiProfile,
                }
            }
        );
        builder.addCase(
            fetchAsyncDeleteMultiProfile.fulfilled,
            (state, action: PayloadAction<number>) => {
                return {
                    ...state,
                    multiProfiles: state.multiProfiles.filter( (multiProfile) =>
                        multiProfile.id !== action.payload
                    ),
                    editedProfiles: initialState.editedMultiProfile,
                    selectedProfiles: initialState.selectedMultiProfile,
                }
            }
        );
    },
});

export const { editMultiProfile, selectedMultiProfile } = profileSlice.actions;

export const selectMultiProfiles = (state: RootState) => state.profile.multiProfiles;
export const selectEditedMultiProfile = (state: RootState) => state.profile.editedMultiProfile;
export const selectSelectedMultiProfile = (state: RootState) => state.profile.selectedMultiProfile;
export const selectMultiProfileError = (state: RootState) => state.profile.error;

export default profileSlice.reducer;
