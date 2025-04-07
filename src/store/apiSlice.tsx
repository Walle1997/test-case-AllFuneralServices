import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
    Company,
    CompanyId,
    ContactId,
    Contacts,
    ImageInfo,
    UpdatedCompany,
    UpdatedContacts
} from '../types';
import { RootState } from './index';
import { selectAuth } from './authSlice';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.API_URL,
        prepareHeaders: (headers, { getState }) => {
            const { token } = selectAuth(getState() as RootState);
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Company', 'Contacts', 'Images'],
    endpoints: builder => ({
        getToken: builder.query<void, string>({
            query: userName => `/auth?user=${userName}`
        }),

        getCompanies: builder.query<Company[], void>({
            query: () => '/companies',
            providesTags: result =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'Company' as const,
                              id
                          })),
                          { type: 'Company', id: 'LIST' }
                      ]
                    : [{ type: 'Company', id: 'LIST' }]
        }),
        getCompany: builder.query<Company, CompanyId>({
            query: companyId => `/companies/${companyId}`,
            providesTags: (result, error, arg) => [{ type: 'Company', id: arg }]
        }),
        editCompany: builder.mutation<
            Company,
            Partial<UpdatedCompany> & Pick<Company, 'id'>
        >({
            query: ({ id, ...updatedCompanyFields }) => ({
                url: `/companies/${id}`,
                method: 'PATCH',
                body: updatedCompanyFields
            })
        }),
        deleteCompany: builder.mutation<void, CompanyId>({
            query: companyId => ({
                url: `/companies/${companyId}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{ type: 'Company', id: 'LIST' }]
        }),

        getContacts: builder.query<Contacts, ContactId>({
            query: contactId => `/contacts/${contactId}`,
            providesTags: (result, error, arg) => [
                { type: 'Contacts', id: arg }
            ]
        }),
        editContacts: builder.mutation<
            Contacts,
            Partial<UpdatedContacts> & Pick<Contacts, 'id'>
        >({
            query: ({ id, ...updatedContactFields }) => ({
                url: `/contacts/${id}`,
                method: 'PATCH',
                body: updatedContactFields
            })
        }),

        addImage: builder.mutation<
            ImageInfo,
            { companyId: CompanyId; image: FormData }
        >({
            query: ({ companyId, image }) => ({
                url: `/companies/${companyId}/image`,
                method: 'POST',
                body: image
            }),
            invalidatesTags: [{ type: 'Images', id: 'LIST' }]
        }),
        deleteImage: builder.mutation<
            void,
            { companyId: CompanyId; imageName: ImageInfo['name'] }
        >({
            query: ({ companyId, imageName }) => ({
                url: `/companies/${companyId}/image/${imageName}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{ type: 'Images', id: 'LIST' }]
        })
    })
});

export const {
    useLazyGetTokenQuery,

    useLazyGetCompanyQuery,
    useEditCompanyMutation,
    useDeleteCompanyMutation,

    useLazyGetContactsQuery,
    useEditContactsMutation,

    useAddImageMutation,
    useDeleteImageMutation
} = apiSlice;
