import React from 'react';
import { useDispatch } from 'react-redux';

import './OrganizationsList.scss';
import { setCompanyId } from '../../store/organizationSlice';
import { defaultCompanyId } from '../../constants';

const OrganizationsList: React.FC = () => {
    const dispatch = useDispatch();

    const openTestPage = () => {
        dispatch(setCompanyId(defaultCompanyId));
    };

    return (
        <div className="organizations">
            <div className="organizations__header header">
                <div className="header__title">Список юридических лиц</div>
            </div>

            <div className="organizations__list">
                <div
                    className="organizations__item organization-item"
                    onClick={openTestPage}>
                    <div className="organization-item__title">
                        Перспективные захоронения
                    </div>
                    <div className="organization-item__subtitle">
                        Единственная компания
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizationsList;
