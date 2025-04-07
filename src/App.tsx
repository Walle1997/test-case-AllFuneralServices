import React from 'react';

import './sass/global.scss';
import OrganizationPage from './pages/OrganizationPage';
import AuthPage from './pages/AuthPage';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import useAuth from './hooks/useAuth';

const App: React.FC = () => {
    const { loading, error, token, onExit } = useAuth();

    if (loading) {
        return <Loader />;
    } else if (error) {
        return <ErrorMessage error={error} />;
    } else if (!token) {
        return <AuthPage />;
    }

    return <OrganizationPage onExit={onExit} />;
};

export default App;
