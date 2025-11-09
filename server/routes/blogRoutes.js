import { Router } from 'express';

import multer from 'multer';

import authMiddleware from '../middlewares/authMiddleware.js';

import { uploadImageByFile, uploadImageByUrl, uploadBlog } from '../controllers/blogController.js';

const router = Router();

const upload = multer();

router.post('/upload-image-by-file', upload.single('image'), authMiddleware, uploadImageByFile);
router.post('/upload-image-by-url', authMiddleware, uploadImageByUrl);
router.post('/upload-blog', authMiddleware, uploadBlog);

export default router; 