import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import BlogsContext from './BlogsContext';
import { getLatestBlogs, getTrendingBlogs, getTopics, getTopicBlogs } from '../apis/blog';

const BlogsProvider = ({ children }) => {
    const [show, setShow] = useState('latest');
    const [topic, setTopic] = useState(''); 

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getLatestBlogsQuery =  useQuery({ queryKey: ['latest-blogs', currentPage], queryFn:  async () => {
        const data = await getLatestBlogs(currentPage);
        return data;
    }});

    useEffect(() => {
        setCurrentPage(1);
        setTotalPages(1);
    }, [topic])

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

    const handleSetTopic = (t) => {
        if (t === topic) {
            setTopic('');
            setShow('latest');
        } else {
            setTopic(t);
            setShow('t');
        }
    };

    const getTopicBlogsQuery =  useQuery({ 
        queryKey: ['topic-blogs', topic], 
        queryFn: async () => {
            const data = await getTopicBlogs({ topic, currentPage })
            return data
        },
        enabled: !!topic 
    });

    const value = {
        show,
        setShow,
        topic, 
        setTopic,
        getLatestBlogsQuery,
        currentPage, 
        totalPages,
        handleNextPage, 
        handlePreviousPage,
        handleSetTopic,
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