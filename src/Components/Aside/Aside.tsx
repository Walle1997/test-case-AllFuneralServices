import React from 'react';
import clsx from 'clsx';

import './Aside.scss';
import { ClassNameProps } from '../../types';
import { BuildingIcon } from '../icons';

const Aside: React.FC<ClassNameProps> = ({ className }) => {
    return (
        <div className={clsx('aside', className)}>
            <div className="aside__logo logo">
                <div className="logo__title">Честный агент</div>
                <div className="logo__subtitle">Менеджер процесса</div>
            </div>
            <div className="aside__item">
                <BuildingIcon />
                Организации
            </div>
        </div>
    );
};

export default Aside;