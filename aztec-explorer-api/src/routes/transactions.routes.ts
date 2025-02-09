import { Router } from 'express';
import { getTransactionsByBlockNumber, getTransactionByHash, getTransactions, getTransactionCount } from '../controller/transactions.controller';

const router = Router();

router.get('/getByBlockNumber/:blockNumber',getTransactionsByBlockNumber);
router.get('/getByHash/:hash',getTransactionByHash);
router.get('/get',getTransactions);
router.get('/count',getTransactionCount);

export default router;