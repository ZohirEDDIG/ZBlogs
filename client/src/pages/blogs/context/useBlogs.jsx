import { useContext } from 'react';

import BlogsContext from './BlogsContext';

const useBlogs = () => {
    const context = useContext(BlogsContext);
    if (!context) {
        throw new Error('useBlogs must be used within a BlogsProvider');
    }
    return context;
};

export default useBlogs;