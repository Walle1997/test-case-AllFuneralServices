import React, { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useLazyGetTokenQuery } from '../store/apiSlice';
import { setLogin } from '../store/authSlice';

interface UseAuthFormResult {
    userInputRef: React.ForwardedRef<HTMLInputElement>;
    error: string;
    onAuth: () => void;
}

const useAuthForm = (): UseAuthFormResult => {
    const userInputRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const [getToken] = useLazyGetTokenQuery();

    const onAuth = useCallback(() => {
        const userName = userInputRef.current?.value;
        if (userName) {
            dispatch(setLogin(userName));
            getToken(userName);
        } else {
            setError('Укажите свое имя');
        }
    }, [dispatch, getToken]);

    return { userInputRef, error, onAuth };
};

export default useAuthForm;