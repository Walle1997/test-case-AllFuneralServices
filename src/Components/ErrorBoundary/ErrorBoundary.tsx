import React, { Component, ErrorInfo, ReactNode } from 'react';

import ErrorMessage from '../ErrorMessage';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    state = { hasError: false };

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Uncaught error:', error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return <ErrorMessage error="Что-то пошло не так." />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;