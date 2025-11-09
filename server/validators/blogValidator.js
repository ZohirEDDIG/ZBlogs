const validateBlogData = async (blogData) => {
    const cover = (blogData && blogData?.cover) || null;
    const title = (blogData && blogData?.title) || '';
    const description = (blogData && blogData?.description) || '';
    const topics = (blogData && blogData?.topics) || [];
    const content = (blogData && blogData?.content) || {};
    const isDraft = (blogData && blogData?.isDraft) || false;

    const errors = { cover: { message: '' }, title: { message: '' }, description: { message: '' }, topics: { message: '' }, content: { message: '' }};
    
    if (!title.trim()) {
        errors.title.message = 'Blog title is required';
    } else if (title.trim().length > 100) {
        errors.title.message = 'Blog title must be less than 100 characters';
    }

    if (isDraft) {
        if (description.trim() && description.trim().length > 200) {
            errors.description.message = 'Blog description must be less than or equal to 200 characters';
        }

        if (topics.length > 10) {
            errors.topics.message = 'Blog topics must be less than or equal to 10';
        } else {
            if (topics.length >= 1) {
                const hasEmptyTopics = topics.some((topic) => topic.trim().length === 0);
                if (hasEmptyTopics) {
                    errors.topics.message = 'Blog topics must not contain empty topics';
                }
            }
        }
    } else {
        if (!cover) {
            errors.cover.message = 'Blog cover is required';
        }

        if (!description.trim()) {
            errors.description.message = 'Blog description is required';
        } else if (description.trim().length > 200) {
            errors.description.message = 'Blog description must be less than or equal to 200 characters';
        }

        if (topics.length === 0) {
            errors.topics.message = 'Blog topics are required';
        } else if (topics.length > 10) {
            errors.topics.message = 'Blog topics must be less or equal to 10';
        } else {
            const hasEmptyTopics = topics.some((topic) => topic.trim().length === 0);
            if (hasEmptyTopics) {
                errors.topics.message = 'Blog topics must not contain empty topics';
            }
        }

        if (Object.keys(content).length === 0 || content?.blocks?.length === 0) {
            errors.content.message = 'Blog content is required';
        }
    }

    if (errors.cover.message || errors.title.message || errors.description.message || errors.topics.message || errors.content.message) {
        return errors; 
    }

    return null;
};

export { validateBlogData };