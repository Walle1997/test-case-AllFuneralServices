import React from 'react';
import clsx from 'clsx';

import './Loader.scss';
import { RotationIcon } from '../icons';

interface LoaderProps {
    inline?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ inline }) => {
    return (
        <div className={clsx('loader', inline && 'loader_inline')}>
            <RotationIcon />
            <div className="loader__label"></div>
        </div>
    );
};

export default Loader;
