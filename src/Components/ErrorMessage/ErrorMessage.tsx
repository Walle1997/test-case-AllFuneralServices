import React from 'react';

import './ErrorMessage.scss';

interface ErrorMessageProps {
    error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
    return <div className="error-message">{error}</div>;
};

export default ErrorMessage;
