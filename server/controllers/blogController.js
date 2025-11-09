import User from '../models/User.js';

import imagekit from '../libs/imagekit/imagekit.js';

import { validateBlogData } from '../validators/blogValidator.js';
import { formateBlogTopics, generateBlogId } from '../helpers/blogHelper.js';
import Blog from '../models/Blog.js';

const uploadImageByFile = async (req, res) => {
    try {
        const user = await User.findById(req.user);

        if (!user) return res.status(404).json({ error: 'User not found' });

        const imageFile = req.file;
        if (!imageFile) return res.status(400).json({ error: 'No image file provided' });

        const imageUrl = (await imagekit.upload({ 
            file: imageFile.buffer, 
           fileName:  `image_${Date.now()}`,
            folder: '/ZBlogs' 
        })).url;

        res.json({
            success: 1,
            file: { url: imageUrl },
        });
    } catch (error) {
        console.error('Failed to upload image:', error);
        return res.status(500).json({ error: 'Failed to upload image' });
    }
};

const uploadImageByUrl = async (req, res) => {
    try {
        const user = await User.findById(req.user);

        if (!user) return res.status(404).json({ error: 'User not found' });

        const { url } = req.body;
        if (!url) return res.status(400).json({ error: 'No image URL provided' });

        const imageUrl = await imagekit.upload({ 
            file: url, 
            fileName:  `image_${Date.now()}`,
            folder: '/ZBlogs' 
        });

        res.json({
            success: 1,
            file: { url: imageUrl },
        });
    } catch (error) {
        console.error('Failed to upload image:', error);
        return res.status(500).json({ error: 'Failed to upload image' });
    }
};

const uploadBlog = async (req, res) => {
    try {
        const user = await User.findById(req.user);

        if (!user) return res.status(404).json({ error: 'User not found' });

        const { cover, title, description, topics, content, isDraft } = req.body;

        const errors = await validateBlogData({ cover, title, description, topics, content, isDraft });
        if (errors) {
            return res.status(400).json({ errors });
        }

        const blogId = await generateBlogId(title);

        const blogTopicsFormatted = formateBlogTopics(topics);

        if (isDraft) {
            const newBlog = new Blog({ 
                blogId, 
                cover, 
                title, 
                description, 
                topics: blogTopicsFormatted, 
                content, 
                author: user, 
                isDraft: isDraft
            });

            console.log(newBlog);
            
            await newBlog.save();

            await User.updateOne({ _id: user }, { $push: { blogs: newBlog._id }});

        } else {
            const newBlog = new Blog({ 
                blogId, 
                cover, 
                title, 
                description, 
                topics: blogTopicsFormatted, 
                content, 
                author: user, 
                isDraft: isDraft
            });

            await newBlog.save();

            await User.updateOne({ _id: user }, { $push: { blogs: newBlog._id, $inc: { totalPosts: 1 }}});
        }

        return res.status(200).json({ message: 'Blog uploaded successfully' });
    } catch (error) {
        console.error('Failed to upload blog:', error);
        return res.status(500).json({ error: 'Failed to upload blog: ', expl: error.message });
    }
}

export { uploadImageByFile, uploadImageByUrl, uploadBlog };