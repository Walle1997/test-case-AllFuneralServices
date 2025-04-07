import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './index';
import { ApiError, Company, CompanyId, ImageInfo } from '../types';
import { apiSlice } from './apiSlice';

interface OrganizationState {
    loading: boolean;
    error: ApiError | null;
    id: CompanyId;
    company: Company | null;
}

const initialState: OrganizationState = {
    loading: false,
    error: null,
    id: '',
    company: null
};

export const organizationSlice = createSlice({
    name: 'organization',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<ApiError>) {
            state.loading = false;
            state.error = action.payload;
        },
        setCompanyId(state, action: PayloadAction<CompanyId>) {
            state.id = action.payload;
        },
        setCompany(state, action: PayloadAction<Company | null>) {
            state.loading = false;
            state.company = action.payload;
        },
        addImage(state, action: PayloadAction<ImageInfo>) {
            if (state.company) {
                state.company.photos = state.company.photos.concat(
                    action.payload
                );
            }
        },
        removeImage(state, action: PayloadAction<ImageInfo['name']>) {
            const imageName = action.payload;
            if (state.company) {
                state.company.photos = state.company.photos.filter(
                    ({ name }) => name !== imageName
                );
            }
        }
    },
    extraReducers: builder => {
        builder
            .addMatcher(
                isAnyOf(
                    apiSlice.endpoints.getCompany.matchPending,
                    apiSlice.endpoints.editCompany.matchPending,
                    apiSlice.endpoints.deleteCompany.matchPending
                ),
                state => {
                    state.loading = true;
                }
            )
            .addMatcher(
                isAnyOf(
                    apiSlice.endpoints.getCompany.matchRejected,
                    apiSlice.endpoints.editCompany.matchRejected,
                    apiSlice.endpoints.deleteCompany.matchRejected
                ),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload as ApiError;
                }
            )
            .addMatcher(
                isAnyOf(
                    apiSlice.endpoints.getCompany.matchFulfilled,
                    apiSlice.endpoints.editCompany.matchFulfilled
                ),
                (state, action) => {
                    state.loading = false;
                    state.error = null;
                    state.company = action.payload;
                }
            )
            .addMatcher(
                apiSlice.endpoints.deleteCompany.matchFulfilled,
                state => {
                    state.loading = false;
                    state.error = null;
                    state.id = '';
                    state.company = null;
                }
            );
    }
});

export const {
    setCompanyId,
    addImage,
    removeImage
} = organizationSlice.actions;

export const selectCompanyState = (
    state: RootState
): [OrganizationState['loading'], OrganizationState['error']] => [
    state.organization.loading,
    state.organization.error
];

export const selectCompanyId = (state: RootState): CompanyId =>
    state.organization.id;

export const selectCompany = (state: RootState): OrganizationState['company'] =>
    state.organization.company;

export const selectCompanyImages = (state: RootState): ImageInfo[] =>
    state.organization.company?.photos || [];

export default organizationSlice.reducer;
