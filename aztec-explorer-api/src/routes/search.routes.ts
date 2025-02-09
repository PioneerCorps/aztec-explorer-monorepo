import { Router } from 'express';
import { search } from '../controller/search.controller';

const router = Router();

router.get('/:query',search)

export default router;