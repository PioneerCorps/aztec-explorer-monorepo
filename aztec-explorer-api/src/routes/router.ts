import { Router } from 'express';
import TransactionsRouter from './transactions.routes';
import BlocksRouter from './blocks.routes';
import AccountsRouter from './accounts.routes';
import SearchRouter from './search.routes';

const router = Router();

router.use('/transactions', TransactionsRouter);
router.use('/blocks', BlocksRouter);
router.use('/accounts', AccountsRouter);
router.use('/search', SearchRouter);

export default router;
