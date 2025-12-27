import {useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import UserContext from './UserContext';

import { getUserByUsername } from '../apis/user';

const UserProvider = ({ children }) => {
    const { username } = useParams();

    const [show, setShow] = useState('blogs');

    const getUserByUsernameQuery = useQuery({
        queryKey: ['user', username],
        queryFn: () => getUserByUsername(username),
        enabled: !!username
    });

    const value = {
        show,
        setShow,
        username, 
        getUserByUsernameQuery
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;