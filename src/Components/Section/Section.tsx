import React from 'react';
import clsx from 'clsx';

import './Section.scss';
import { ClassNameProps } from '../../types';

interface SectionProps extends ClassNameProps {
    title: string | React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ className, title, children }) => {
    return (
        <div className={clsx('section', className)}>
            <div className="section__title">{title}</div>
            {children}
        </div>
    );
};

export default Section;
