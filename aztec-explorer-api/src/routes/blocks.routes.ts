
import { Router } from 'express';
import { getBlockByHash,getBlockByNumber,getBlocks,getBlockCount } from '../controller/blocks.controller';

const router = Router();

router.get('/getByBlockNumber/:blockNumber',getBlockByNumber);
router.get('/getByHash/:hash',getBlockByHash);
router.get('/get',getBlocks);
router.get('/count',getBlockCount);

export default router;