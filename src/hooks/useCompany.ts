import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
    useDeleteCompanyMutation,
    useEditCompanyMutation,
    useLazyGetCompanyQuery,
    useLazyGetContactsQuery
} from '../store/apiSlice';
import {
    ApiError,
    Company,
    CompanyId,
    CompanyProperties,
    StringObject
} from '../types';
import { selectCompany, selectCompanyState } from '../store/organizationSlice';

interface UseCompanyResult {
    isLoading: boolean;
    error: ApiError | null;
    company: Company | null;
    onUpdate: () => void;
    onEdit: (property: CompanyProperties, value: string | StringObject) => void;
    onDelete: () => void;
}

const useCompany = (companyId: CompanyId): UseCompanyResult => {
    const company = useSelector(selectCompany);
    const [isLoading, error] = useSelector(selectCompanyState);

    const [loadCompany] = useLazyGetCompanyQuery();
    const [updateContacts] = useLazyGetContactsQuery();

    const onUpdate = useCallback(() => {
        loadCompany(companyId)
            .unwrap()
            .then(newCompany => {
                updateContacts(newCompany.contactId);
            })
            .catch(() => {
                console.warn('Error was already handled in extraReducer');
            });
    }, [companyId, loadCompany, updateContacts]);

    useEffect(() => {
        onUpdate();
    }, [onUpdate]);

    const [editCompany] = useEditCompanyMutation();

    const [deleteCompany] = useDeleteCompanyMutation();

    const onEdit = useCallback(
        (property: CompanyProperties, value: string | StringObject) => {
            const editedCompany = { id: companyId, [property]: value };
            editCompany(editedCompany);
        },
        [companyId, editCompany]
    );

    const onDelete = useCallback(() => deleteCompany(companyId), [
        companyId,
        deleteCompany
    ]);

    return {
        isLoading,
        error,
        company,
        onUpdate,
        onEdit,
        onDelete
    };
};

export default useCompany;
