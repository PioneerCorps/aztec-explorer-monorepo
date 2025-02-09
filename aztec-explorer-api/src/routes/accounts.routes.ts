
import { Router } from 'express';
import {getAccountByAddress,getAccountCount,getAccounts  } from '../controller/accounts.controller';

const router = Router();

router.get('/getByAddress/:address',getAccountByAddress);
router.get('/get',getAccounts);
router.get('/count',getAccountCount);

export default router;