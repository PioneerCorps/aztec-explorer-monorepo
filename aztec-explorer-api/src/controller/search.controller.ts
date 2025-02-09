import { Request, Response } from 'express';
import { searchBlocksByHashSvc,getBlockByBlockNumberSvc } from '../service/blocks.service';
import { searchTransactionsByHashSvc } from '../service/transactions.service';
import { searchAccountsByAddressSvc } from '../service/accounts.service';


export const search = async (req: Request, res: Response) => {
    const {query} = req.params;
    try {
        if(!query.startsWith('0x')){
            const number = parseInt(query);
            if(!isNaN(number)){
                const block = await getBlockByBlockNumberSvc(number);
                if(block){
                    res.send({ accounts: [], blocks: [block], transactions: [] });
                }else{
                    res.send({ accounts: [], blocks: [], transactions: [] });
                }
                return
            }
            res.status(404).send({err: 'Not Found'});
        }else {
            const accounts = await searchAccountsByAddressSvc(query);
            const blocks = await searchBlocksByHashSvc(query);
            const transactions = await searchTransactionsByHashSvc(query);
            res.send({accounts, blocks, transactions});
            return
        }
    }catch(err) {
        console.log(err);
        res.status(500).send({err: 'Internal Server Error'});
    }
}