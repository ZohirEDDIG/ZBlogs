import { customAlphabet } from 'nanoid';

import Blog from '../models/Blog.js';

const formateBlogTopics = (blogTopics) => {
    const blogTopicsFormatted = blogTopics.map((topic) => topic.trim().toLowerCase());
    return blogTopicsFormatted;
};

const generateBlogId =  async (title) => {
    const baseBlogId = title.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, '-');
    let blogId = baseBlogId;

    const digits = '0123456789';
    const nanoidDigits = customAlphabet(digits, 3);

    let blog = await Blog.findOne({ blogId });

    while (blog) {
        blogId = `${baseBlogId}${nanoidDigits()}`;
        blog = await Blog.findOne({ blogId });
    }

    return blogId;
};

export { formateBlogTopics, generateBlogId };