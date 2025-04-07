import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import { apiSlice } from './apiSlice';
import organizationReducer from './organizationSlice';
import contactsReducer from './contactsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        organization: organizationReducer,
        contacts: contactsReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
