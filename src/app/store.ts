import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { save, load } from 'redux-localstorage-simple';

import authReducer from '../features/admin/auth/authSlice';
import exhibitReducer from '../features/admin/exhibit/exhibitSlice';
import profileReducer from '../features/admin/profile/profileSlice';
import dashboardReducer from '../features/admin/dashboard/dashboardSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        exhibit: exhibitReducer,
        dashboard: dashboardReducer,
    },
    preloadedState: load(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export type AppDispatch = typeof store.dispatch;