import React from 'react';

import './AuthPage.scss';
import { UncontrolledTextField } from '../components/InputField';
import Button from '../components/Button';
import useAuthForm from '../hooks/useAuthForm';
import ErrorMessage from '../components/ErrorMessage';

const AuthPage: React.FC = () => {
    const { userInputRef, error, onAuth } = useAuthForm();

    return (
        <div className="auth-page">
            <div className="auth-page__info">
                Имя - USERNAME для API
                <br />
                Пароль не обязателен
            </div>
            <UncontrolledTextField placeholder="Ваше имя" ref={userInputRef} />
            <UncontrolledTextField placeholder="Пароль" type="password" />
            <Button text="Войти" onClick={onAuth} />
            <ErrorMessage error={error} />
        </div>
    );
};

export default AuthPage;
