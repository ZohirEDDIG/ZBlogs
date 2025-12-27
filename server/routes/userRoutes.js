import { Router } from 'express';

import { getSearchUsers, getUserByUsername } from '../controllers/userController.js';

const router = Router();

router.get('/search/:query', getSearchUsers);
router.get('/:query', getUserByUsername);

export default router;