import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import BlogsContext from './BlogsContext';
import { getLatestBlogs, getTrendingBlogs, getTopics, getTopicBlogs } from '../apis/blog';

const BlogsProvider = ({ children }) => {
    const [blogsToShow, setBlogsToShow] = useState('latest');
    const [topic, setTopic] = useState(''); 
    const [localNavMainTab, setLocalNavMainTab] = useState('home');

    const getLatestBlogsQuery =  useQuery({ queryKey: ['latest-blogs'], queryFn: getLatestBlogs });

    const getTrendingBlogsQuery =  useQuery({ queryKey: ['trending-blogs'], queryFn: getTrendingBlogs });

    const getTopicsQuery =  useQuery({ queryKey: ['topics'], queryFn: getTopics });

    const getTopicBlogsQuery =  useQuery({ queryKey: ['topic-blogs', topic], queryFn:() => getTopicBlogs(topic), enabled: !!topic });

    const handleSetTopic = (t) => {
        if (t === topic) {
            setTopic('');
            setBlogsToShow('latest');
            setLocalNavMainTab('home');
        } else {
            setTopic(t);
            setBlogsToShow('topic');
            setLocalNavMainTab(t);
        }
    };

    const value = {
        blogsToShow,
        setBlogsToShow,
        topic, 
        handleSetTopic,
        localNavMainTab, 
        getLatestBlogsQuery,
        getTrendingBlogsQuery,
        getTopicsQuery,
        getTopicBlogsQuery
    };

    return (
        <BlogsContext.Provider value={value}>
            {children}
        </BlogsContext.Provider>
    );
};

export default BlogsProvider;