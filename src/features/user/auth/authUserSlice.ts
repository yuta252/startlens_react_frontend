import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

import { RootState } from '../../../app/store';
import {
    ERROR,
    AUTH_USER_STATE,
} from "../../types";


const initialState: AUTH_USER_STATE = {
    error: {
        isError: false,
        message: ""
    },
    isLoginView: true,
    isLoading: false,
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
    },
    extraReducers: (builder) => {
    },
});

export const { toggleMode, showError, toggleLoading } = authSlice.actions;

export const selectIsLoginView = (state: RootState) => state.auth.isLoginView;
export const selectError = (state: RootState) => state.auth.error;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;

export default authSlice.reducer;
