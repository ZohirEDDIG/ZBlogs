import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import BlogContext from './BlogContext';

import { getBlog, getSimilarBlogs } from '../apis/blog';
import { useEffect } from 'react';

const BlogProvider = ({ children }) => {
    const { blogId } = useParams();

    const getBlogQuery = useQuery({ queryKey: ['blog', blogId], queryFn: () => getBlog(blogId)});

    const getSimilarBlogsMutation= useMutation({ mutationFn: (topics) => getSimilarBlogs(topics) });

    useEffect(() => {
        if (getBlogQuery.isSuccess) {
            getSimilarBlogsMutation.mutate(getBlogQuery.data.data.blog.topics);
        }
    }, [getBlogQuery.isSuccess]);

    const value = {
        blogId,
        getBlogQuery,
        getSimilarBlogsMutation,
    };

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    );
};

export default BlogProvider;