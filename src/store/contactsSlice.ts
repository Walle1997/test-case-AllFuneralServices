import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { RootState } from './index';
import { ApiError, Contacts } from '../types';
import { apiSlice } from './apiSlice';

interface ContactsState {
    loading: boolean;
    error: ApiError | null;
    contacts?: Contacts;
}

const initialState: ContactsState = {
    loading: false,
    error: null
};

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addMatcher(
                isAnyOf(
                    apiSlice.endpoints.getContacts.matchPending,
                    apiSlice.endpoints.editContacts.matchPending
                ),
                state => {
                    state.loading = true;
                }
            )
            .addMatcher(
                isAnyOf(
                    apiSlice.endpoints.getContacts.matchRejected,
                    apiSlice.endpoints.editContacts.matchRejected
                ),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload as ApiError;
                }
            )
            .addMatcher(
                isAnyOf(
                    apiSlice.endpoints.getContacts.matchFulfilled,
                    apiSlice.endpoints.editContacts.matchFulfilled
                ),
                (state, action) => {
                    state.loading = false;
                    state.error = null;
                    state.contacts = action.payload;
                }
            );
    }
});

export const selectContacts = (state: RootState): ContactsState =>
    state.contacts;

export default contactsSlice.reducer;