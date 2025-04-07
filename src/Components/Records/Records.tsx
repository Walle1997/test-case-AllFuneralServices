import React from 'react';

import './Records.scss';

interface RecordProps {
    name: string;
}

export const Record: React.FC<RecordProps> = ({ name, children }) => {
    return (
        <div className="record">
            <dt className="record__name">{name}</dt>
            <dd className="record__details">{children}</dd>
        </div>
    );
};

const Records: React.FC = ({ children }) => {
    return <dl className="records">{children}</dl>;
};

export default Records;