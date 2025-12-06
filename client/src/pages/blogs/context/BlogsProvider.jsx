import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import BlogsContext from './BlogsContext';
import { getLatestBlogs, getTrendingBlogs, getTopics, getTopicBlogs } from '../apis/blog';

const BlogsProvider = ({ children }) => {
    const [blogsToShow, setBlogsToShow] = useState('latest');
    const [topic, setTopic] = useState(''); 
    const [localNavMainTab, setLocalNavMainTab] = useState('home');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getLatestBlogsQuery =  useQuery({ queryKey: ['latest-blogs', currentPage], queryFn:  async () => {
        const data = await getLatestBlogs(currentPage);
        return data;
    }});

    useEffect(() => {
        if (getLatestBlogsQuery.isSuccess) {
            setTotalPages(getLatestBlogsQuery.data.data.totalPages);
        }
    }, [getLatestBlogsQuery.isSuccess]);

    const handleNextPage = () => {
        if (currentPage === totalPages) return;
        setCurrentPage((prev) => prev + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage === 1) return;
        setCurrentPage((prev) => prev - 1);
    };

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
        currentPage, 
        totalPages,
        handleNextPage, 
        handlePreviousPage,
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