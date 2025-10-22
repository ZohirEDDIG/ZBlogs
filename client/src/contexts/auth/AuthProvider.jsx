import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { register, login, me } from '@/pages/auth/apis/auth';

import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('zblogs_auth_token') || null);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const registerMutation = useMutation({ mutationFn: register });
    const loginMutation = useMutation({ mutationFn: login });
    const meQuery = useQuery({ queryKey: ['me', token], queryFn: ({ queryKey }) => {
            const token = queryKey[1];
            return me(token);
        }, 
        enabled: !!token 
    });


    const clearUserData = () => {
        localStorage.removeItem('zblogs_auth_token');
        setToken(null);
        setUser(null);
    };

    const logout = () => {
        clearUserData();

        toast.success('User logged out successfully');

        navigate('/login', { replace: true });
    };
  
    useEffect(() => {
        if (registerMutation.isSuccess) {
            toast.success(registerMutation.data.data.message);
            navigate('/login', { replace: true });
        }
    }, [registerMutation.isSuccess]);

    useEffect(() => {
        if (loginMutation.isSuccess) {
            toast.success(loginMutation.data.data.message);
            localStorage.setItem('zblogs_auth_token', loginMutation.data.data.token);
            setToken(loginMutation.data.data.token);
            navigate('/', { replace: true });
        }
    }, [loginMutation.isSuccess]);

    
    useEffect(() => {
        if (meQuery.isSuccess) {
            setUser(meQuery.data.data.user);
        }
        if (meQuery.isError) {
            clearUserData();
            toast(meQuery.error.response.data.error);
            navigate('/login', { replace: true });
        }
    } , [meQuery.isSuccess, meQuery.isError]);

    const value = {
        token,
        user,
        setUser,
        registerMutation,
        loginMutation,
        logout, 
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;