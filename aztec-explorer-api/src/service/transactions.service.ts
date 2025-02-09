import { Transaction, ITransaction } from '../model/transaction.model';

async function getTransactionsWithPaginationSvc(
    page: number,
    limit: number,
    filters: any,
    sortOptions: any
): Promise< {transactions: ITransaction[], total: number}> {
    const [transactions, total] = await Promise.all([
        Transaction.find(filters)
            .sort(sortOptions)
            .skip((page - 1) * limit)
            .limit(limit)
            .exec(),
        Transaction.countDocuments(filters),
    ]);

    return { transactions, total };
}

async function getTransactionsByBlockNumberSvc(blockNumber: number): Promise<ITransaction[]> {
    const transactions = await Transaction.find({ blockNumber: blockNumber }).sort({ index: -1 }).exec();
    return transactions;
}

async function getTransactionByHashSvc(hash: string) : Promise<ITransaction | null> {
    const transaction = await Transaction.findOne({ hash: hash });
    return transaction;
}

async function getTransactionCountSvc() : Promise<number> {
    const count = await Transaction.countDocuments();
    return count;
}

async function searchTransactionsByHashSvc(query: string) : Promise<ITransaction[] | null> {
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
    const regex = new RegExp(escapedQuery, 'i');
    const transactions = await Transaction.find({
        hash: { $regex: regex }
    });

    return transactions;
}


export { getTransactionsWithPaginationSvc, getTransactionsByBlockNumberSvc, getTransactionByHashSvc, getTransactionCountSvc, searchTransactionsByHashSvc };