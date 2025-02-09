import { Request, Response } from 'express';
import { getAccountByAddressSvc,getAccountCountSvc,getAccountsWithPaginationSvc } from '../service/accounts.service';

export const getAccounts = async (req: Request, res: Response) => {
    const { page, limit } = req.query;
    const pageNumber = parseInt(page as string,10);
    const limitNumber = parseInt(limit as string,10);
    try {
        const {accounts,total} = await getAccountsWithPaginationSvc(pageNumber,limitNumber);
        res.send({
            total,
            page: pageNumber,
            limit: limitNumber,
            accounts,
        });
    }catch(err) {
        console.log(err);
        res.status(500).send({err: 'Internal Server Error'});
    }
};

export const getAccountByAddress = async (req: Request, res: Response) => {
    const { address } = req.params;
    try {
        const account = await getAccountByAddressSvc(address as string);
        res.send(account);
    }catch(err) {
        console.log(err);
        res.status(500).send({err: 'Internal Server Error'});
    }
};

export const getAccountCount = async (req: Request, res: Response) => {
    try {
        const count = await getAccountCountSvc();
        res.send({ count });
    }catch(err) {
        console.log(err);
        res.status(500).send({err: 'Internal Server Error'});
    }
}