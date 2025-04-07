import { Dispatch, SetStateAction } from 'react';

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type StringObject = Record<string, string>;

export interface ClassNameProps {
    className?: string;
}

export interface ImageInfo {
    name: string;
    filepath: string;
    thumbpath: string;
}

export type CompanyId = string;

export type ContactId = string;

export type CompanyTypes = {
    agent: string;
    contractor: string;
};

export type CompanyType = keyof CompanyTypes;

export interface UpdatedCompany {
    name: string;
    shortName: string;
    businessEntity: string;
    contract: {
        no: string;
        issue_date: string;
    };
    type: CompanyType[];
}

export interface Company extends UpdatedCompany {
    id: CompanyId;
    contactId: ContactId;
    status: 'active' | 'inactive';
    photos: ImageInfo[];
    createdAt: string;
    updatedAt: string;
}

export type CompanyProperties = keyof UpdatedCompany;

export interface UpdatedContacts {
    lastname: string;
    firstname: string;
    patronymic: string;
    phone: string;
    email: string;
}

export interface Contacts extends UpdatedContacts {
    id: ContactId;
    createdAt: string;
    updatedAt: string;
}

export type ContactsProperties = keyof UpdatedContacts;

export interface ApiError {
    status: number;
    data: { error: string };
}
