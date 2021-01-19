import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from "axios";

import { RootState } from '../../../app/store';
import {
    STATISTICS,
    STATISTICS_STATE,
    VISITORS
} from "../../types";


export const fetchAsyncGetStatistics = createAsyncThunk(
    "dashboard/getStatistics",
    async (duration: number) => {
        const { data } = await axios.get<STATISTICS>(
            `${process.env.REACT_APP_API_URL}/api/v1/dashboards?duration=${duration}`,
            {
                headers: {
                    Authorization: `${localStorage.startlensAdminJWT}`,
                },
            }
        );
        return { data: data, duration: duration};
    }
);

export const initialState: STATISTICS_STATE = {
    data: {
        visitors: {
            "2021-01-11": 0,
            "2021-01-12": 0,
            "2021-01-13": 0,
            "2021-01-14": 0,
            "2021-01-15": 0,
            "2021-01-16": 0,
            "2021-01-17": 0,
            "2021-01-18": 0,
        },
        sex: {
            "0": 0,
            "1": 0,
            "2": 0,
            "3": 0,
        },
        birth: {
            "1940": 0
        },
        country: {
            "JP": 0
        }
    },
    displayVisitors: {
        "": 0,
    },
    duration: 2,
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        displayVisitorsData(state, action: PayloadAction<VISITORS>) {
            state.displayVisitors = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchAsyncGetStatistics.fulfilled,
            (state, action: PayloadAction<{ data: STATISTICS, duration: number}>) => {
                return {
                    ...state,
                    data: action.payload.data,
                    duration: action.payload.duration,
                };
            }
        );
    },
});


export const { displayVisitorsData } = dashboardSlice.actions;

export const selectVisitors = (state: RootState) => state.dashboard.data.visitors;
export const selectSex = (state: RootState) => state.dashboard.data.sex;
export const selectBirth = (state: RootState) => state.dashboard.data.birth;
export const selectCountry = (state: RootState) => state.dashboard.data.country;
export const selectDuration = (state: RootState) => state.dashboard.duration;
export const selectDisplayVisitors = (state: RootState) => state.dashboard.displayVisitors;

export default dashboardSlice.reducer;