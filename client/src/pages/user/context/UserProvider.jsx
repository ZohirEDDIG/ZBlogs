import {useState } from 'react';

import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import UserContext from './UserContext';

import { getUserByUsername } from '../apis/user';
import { getUserBlogs } from '../apis/blog';

const UserProvider = ({ children }) => {
    const { username } = useParams();

    const [show, setShow] = useState('blogs');

    const getUserByUsernameQuery = useQuery({
        queryKey: ['user', username],
        queryFn: () => getUserByUsername(username),
        enabled: !!username
    });

    const getUserBlogsQuery = useQuery({
        queryKey: ['user-blogs', username],
        queryFn: () => getUserBlogs(getUserByUsernameQuery?.data?.data?.user._id),
        enabled: !!getUserByUsernameQuery?.data?.data?.user._id   
    });

    const value = {
        show,
        setShow,
        username, 
        getUserByUsernameQuery,
        getUserBlogsQuery
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;