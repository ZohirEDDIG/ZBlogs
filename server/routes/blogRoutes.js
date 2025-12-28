import { Router } from 'express';

import multer from 'multer';

import authMiddleware from '../middlewares/authMiddleware.js';

import { uploadImageByFile, uploadImageByUrl, uploadBlog, getLatestBlogs, getTrendingBlogs, getTopics, getTopicBlogs, getSearchBlogs, getUserBlogs } from '../controllers/blogController.js';

const router = Router();

const upload = multer();

router.post('/upload-image-by-file', upload.single('image'), authMiddleware, uploadImageByFile);
router.post('/upload-image-by-url', authMiddleware, uploadImageByUrl);
router.post('/upload-blog', authMiddleware, uploadBlog);
router.get('/latest', getLatestBlogs);
router.get('/trending', getTrendingBlogs);
router.get('/topics', getTopics);
router.get('/topic/:topic', getTopicBlogs);
router.get('/search/:query', getSearchBlogs);
router.get('/user/:userId', getUserBlogs);

export default router; 