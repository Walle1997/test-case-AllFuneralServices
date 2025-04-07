import React from 'react';

import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { ContactId } from '../types';
import ContactsSection from '../components/Organization/ContactsSection';
import useContacts from '../hooks/useContacts';

interface ContactsContainer {
    contactId: ContactId;
}

const ContactsContainer: React.FC<ContactsContainer> = ({ contactId }) => {
    const { isLoading, error, contacts, onEdit } = useContacts(contactId);

    if (isLoading) {
        return <Loader inline />;
    }

    if (error) {
        const { status, data } = error;
        return <ErrorMessage error={`${status} - ${data.error}`} />;
    }

    if (contacts) {
        return <ContactsSection contacts={contacts} onEdit={onEdit} />;
    }

    return null;
};

export default ContactsContainer;
