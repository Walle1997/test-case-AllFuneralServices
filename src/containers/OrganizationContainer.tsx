import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ApiError, CompanyId } from '../types';
import Organization from '../components/Organization';
import Loader from '../components/Loader';
import ModalWindow from '../components/ModalWindow';
import useModal from '../hooks/useModal';
import useCompany from '../hooks/useCompany';
import { setCompanyId } from '../store/organizationSlice';

interface OrganizationContainerProps {
    companyId: CompanyId;
}

const OrganizationContainer: React.FC<OrganizationContainerProps> = ({
    companyId
}) => {
    const { isModalOpen, closeModal, openModal } = useModal();

    const [updatedError, setUpdatedError] = useState<ApiError>();

    const dispatch = useDispatch();

    const goBack = useCallback(() => {
        dispatch(setCompanyId(''));
    }, [dispatch]);

    const {
        isLoading,
        error,
        company,
        onUpdate,
        onEdit,
        onDelete
    } = useCompany(companyId);

    useEffect(() => {
        if (error) {
            setUpdatedError(error);
            openModal();
        }
    }, [error, openModal]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            {company && (
                <Organization
                    company={company}
                    onUpdate={onUpdate}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    goBack={goBack}
                />
            )}
            <ModalWindow
                show={isModalOpen}
                title="Удаленный сервер вернул ошибку"
                onClose={closeModal}>
                {updatedError?.data?.error ?? 'Неизвестная ошибка'}
            </ModalWindow>
        </>
    );
};

export default OrganizationContainer;
