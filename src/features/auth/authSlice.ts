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
    ERROR
} from "../types";
import { TramOutlined } from '@material-ui/icons';


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
        const res = await axios.post<USER>(
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

/*
export const fetchAsyncGetMyProf = createAsyncThunk(
    "auth/loginuser",
    async () => {
        const res = await axios.post<LOGIN_USER>(
            `${process.env.REACT_APP_API_URL}/api/loginuser/`,
            {
                headers: {
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            }
        );
        return res.data
    }
);


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
    loginUser: {
        id: 0,
        email: "",
    },
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
        setLoginUser(state) {
            state.loginUser = { id: 3, email: "info@startlens.com" }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchAsyncLogin.fulfilled,
            (state, action: PayloadAction<JWT>) => {
                localStorage.setItem("localJWT", action.payload.token);
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

export const { toggleMode, showError, toggleLoading, setLoginUser } = authSlice.actions;


export const selectIsLoginView = (state: RootState) => state.auth.isLoginView;
export const selectLoginUser = (state: RootState) => state.auth.loginUser;
export const selectError = (state: RootState) => state.auth.error;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;

export default authSlice.reducer;
