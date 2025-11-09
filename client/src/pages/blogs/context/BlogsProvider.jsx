import { useState } from 'react';

import BlogsContext from './BlogsContext';
import { useQuery } from '@tanstack/react-query';
import { getLatestBlogs, getTrendingBlogs, getTopics } from '../apis/blog';

const BlogsProvider = ({ children }) => {
    const [blogsToShow, setBlogsToShow] = useState('latest');

    const getLatestBlogsQuery =  useQuery({ queryKey: ['latest-blogs'], queryFn: getLatestBlogs });

    const getTrendingBlogsQuery =  useQuery({ queryKey: ['trending-blogs'], queryFn: getTrendingBlogs });

    const getTopicsQuery =  useQuery({ queryKey: ['topics'], queryFn: getTopics });

    const value = {
        blogsToShow,
        setBlogsToShow,
        getLatestBlogsQuery,
        getTrendingBlogsQuery,
        getTopicsQuery
    };

    return (
        <BlogsContext.Provider value={value}>
            {children}
        </BlogsContext.Provider>
    );
};

export default BlogsProvider;