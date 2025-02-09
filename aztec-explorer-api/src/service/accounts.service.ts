import { Account, IAccount } from '../model/account.model';

async function getAccountsWithPaginationSvc(page: number, limit: number): Promise<{ accounts: IAccount[]; total: number }> {
    const [accounts, total] = await Promise.all([
        Account.find()
            .sort({ blockNumber: -1, index: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec(),
        Account.countDocuments(),
    ]);
    return {accounts,total};
}

async function getAccountByAddressSvc(address: string) : Promise<IAccount | null> {
    const account = await Account.findOne({ address: address });
    return account;
}

async function getAccountCountSvc() : Promise<number> {
    const count = await Account.countDocuments();
    return count;
}

async function searchAccountsByAddressSvc(query: string) : Promise<IAccount[] | null> {
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
    const regex = new RegExp(escapedQuery, 'i');
    const accounts = await Account.find({
        address: { $regex: regex }
    });

    return accounts;
}

export { getAccountsWithPaginationSvc, getAccountByAddressSvc, getAccountCountSvc, searchAccountsByAddressSvc };