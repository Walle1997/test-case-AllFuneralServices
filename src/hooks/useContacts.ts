import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useEditContactsMutation } from '../store/apiSlice';
import {
    ApiError,
    ContactId,
    Contacts,
    ContactsProperties,
    StringObject
} from '../types';
import { selectContacts } from '../store/contactsSlice';

interface UseContactsResult {
    isLoading: boolean;
    error: ApiError | null;
    contacts?: Contacts;
    onEdit: (
        property: ContactsProperties,
        value: string | StringObject
    ) => void;
}

const useContacts = (contactId: ContactId): UseContactsResult => {
    const { loading, error, contacts } = useSelector(selectContacts);

    const [editContacts] = useEditContactsMutation();

    const onEdit = useCallback(
        (property: ContactsProperties, value: string | StringObject) => {
            const editedContacts = { id: contactId, [property]: value };
            editContacts(editedContacts);
        },
        [contactId, editContacts]
    );

    return {
        isLoading: loading,
        error,
        contacts,
        onEdit
    };
};

export default useContacts;
