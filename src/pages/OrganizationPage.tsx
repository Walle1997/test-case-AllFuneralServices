import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './OrganizationPage.scss';
import Menu from '../components/Menu';
import Aside from '../components/Aside';
import { Organization } from '../containers';
import { selectCompanyId, setCompanyId } from '../store/organizationSlice';
import { defaultCompanyId } from '../constants';
import OrganizationsList from '../components/OrganizationsList';
import { ClassNameProps } from '../types';
import ErrorBoundary from '../components/ErrorBoundary';

interface OrganizationPageProps extends ClassNameProps {
    onExit: () => void;
}

const OrganizationPage: React.FC<OrganizationPageProps> = ({ onExit }) => {
    const companyId = useSelector(selectCompanyId);

    const dispatch = useDispatch();

    useEffect(() => {
        //simulate page choosing
        dispatch(setCompanyId(defaultCompanyId));
    }, [dispatch]);

    return (
        <div className="container">
            <Menu className="container__menu" onExit={onExit} />
            <Aside className="container__aside" />
            <div className="container__main">
                <ErrorBoundary>
                    {companyId ? (
                        <Organization companyId={companyId} />
                    ) : (
                        <OrganizationsList />
                    )}
                </ErrorBoundary>
            </div>
        </div>
    );
};

export default OrganizationPage;
