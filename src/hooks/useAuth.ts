import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectAuth, setLogout, setToken } from '../store/authSlice';
import useLocalStorage from './useLocalStorage';

interface UseAuthResult {
    loading: boolean;
    error: string;
    token: string;
    onExit: () => void;
}

const useAuth = (): UseAuthResult => {
    const { loading, error, logout, token } = useSelector(selectAuth);

    const [savedToken, saveToken] = useLocalStorage<string>('token', '');

    const dispatch = useDispatch();

    const onExit = useCallback(() => {
        dispatch(setLogout(true));
        saveToken('');
        dispatch(setToken(''));
    }, [dispatch, saveToken]);

    useEffect(() => {
        if (logout) return;

        if (token) {
            if (token !== savedToken) saveToken(token);
        } else {
            if (savedToken) dispatch(setToken(savedToken));
        }
    }, [token, saveToken, savedToken, dispatch, logout]);

    return {
        loading,
        error,
        token,
        onExit
    };
};

export default useAuth;
