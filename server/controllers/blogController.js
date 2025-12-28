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

            await User.updateOne({ _id: user }, { $push: { blogs: newBlog._id }, $inc: { 'accountInfo.totalPosts': 1 }});
        }

        return res.status(200).json({ message: 'Blog uploaded successfully' });
    } catch (error) {
        console.error('Failed to upload blog:', error);
        return res.status(500).json({ error: 'Failed to upload blog' });
    }
}

const getLatestBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;

        const skip = (page - 1) * limit;

        const total = await Blog.countDocuments();

        const blogs = await Blog.find({ isDraft: false })
        .skip(skip)
        .limit(limit)
        .populate('author', "-_id personalInfo.fullName personalInfo.username personalInfo.profileImage")
        .select("-_id blogId cover title description topics activity createdAt")
        .sort({ createdAt: -1 });

        return res.status(200).json({ blogs, totalPages: Math.ceil(total / limit) });
    } catch (error) {
        console.error('Failed to fetch latest blogs:', error);
        return res.status(500).json({ error: 'Failed to fetch latest blogs' });
    } 
}

const getTrendingBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isDraft: false })
        .populate('author', "-_id personalInfo.fullName personalInfo.username personalInfo.profileImage")
        .sort({ "activity.totalReads": -1, "activity.totalLikes": -1, "createdAt": -1, })
        .select("-_id blogId title description topics createdAt");

        return res.status(200).json({ blogs });
    } catch (error) {
        console.error('Failed to fetch trednding blogs:', error);
        return res.status(500).json({ error: 'Failed to fetch trending blogs' });
    }
}

const getTopics = async (req, res) => {
    try {
        const topics = (await Blog.aggregate([
            { $unwind: "$topics" },  
            { $group: { _id: "$topics", count: { $sum: 1 } } },
            { $sort: { count: -1 } }, 
            { $limit: 10 },  
            { $project: { _id: 0, topic: "$_id" } }
        ])).map(t => t.topic);

        return res.status(200).json({ topics });
    } catch (error) {
        console.error('Failed to fetch topics:', error);
        return res.status(500).json({ error: 'Failed to fetch topics' });
    }
};

const getTopicBlogs = async (req, res) => {
    try {
        const topic = req.params.topic;

        const blogs = await Blog.find({ topics: topic })
        .populate('author', "-_id personalInfo.fullName personalInfo.username personalInfo.profileImage")
        .sort({ createdAt: -1 })
        .select("-_id blogId cover title description topics activity createdAt");

        return res.status(200).json({ blogs });
    } catch (error) {
        console.error('Failed to fetch topic blogs:', error);
        return res.status(500).json({ error: 'Failed to fetch topic blogs' });
    }
}

const getSearchBlogs = async (req, res) => {
    const query = req.params.query;

    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const searchObj = {
            $or: [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
                { topics: { $regex: query, $options: "i" } }
            ]
        };

        const total = await Blog.countDocuments(searchObj);

        const blogs = await Blog.find(searchObj)
        .skip(skip)
        .limit(limit)
        .populate('author', "-_id personalInfo.fullName personalInfo.username personalInfo.profileImage")
        .select("-_id blogId cover title description topics activity createdAt")
        .sort({ createdAt: -1 });


        return res.status(200).json({ blogs, totalPages: Math.ceil(total / limit), });
    } catch (error) {
        console.error(`Failed to fetch ${query} blogs`, error);
        return res.status(500).json({ error: `Failed to fetch ${query} blogs` });
    }
}

const getUserBlogs = async (req, res) => {
    const userId = req.params.userId;

    try {
        const blogs = await Blog.find({ author: userId})
        .populate('author', "-_id personalInfo.fullName personalInfo.username personalInfo.profileImage")
        .select("-_id blogId cover title description topics activity createdAt")
        .sort({ createdAt: -1 });

        return res.status(200).json({ blogs });
    } catch (error) {
        console.error(`Failed to fetch user blogs`, error);
        return res.status(500).json({ error: `Failed to fetch user blogs` });
    }
}

export { uploadImageByFile, uploadImageByUrl, uploadBlog, getLatestBlogs, getTrendingBlogs, getTopics, getTopicBlogs, getSearchBlogs, getUserBlogs };