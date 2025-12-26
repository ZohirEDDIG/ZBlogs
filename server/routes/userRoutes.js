import { Router } from 'express';

import { getSearchUsers } from '../controllers/userController.js';

const router = Router();

router.get('/search/:query', getSearchUsers);

export default router;