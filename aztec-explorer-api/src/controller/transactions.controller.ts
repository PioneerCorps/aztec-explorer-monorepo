import { Request, Response } from 'express';
import { getTransactionsWithPaginationSvc, getTransactionsByBlockNumberSvc, getTransactionByHashSvc, getTransactionCountSvc } from '../service/transactions.service';

const allowedFilterFields = ['hash', 'revertCode','blockNumber'];
const allowedRangeFields = ['timestamp', 'index', 'transactionFee'];
const allowedSortFields = ['blockNumber', 'index', 'timestamp', 'transactionFee'];

export const getTransactions = async (req: Request, res: Response) => {
    try {
        const {
            page = '1',
            limit = '10',
            sort = 'blockNumber',
            order = 'desc',
            startTimestamp,
            endTimestamp,
            minIndex,
            maxIndex,
            minTransactionFee,
            maxTransactionFee,
            minBlockNumber,
            maxBlockNumber,
            ...queryFilters
        } = req.query;

        // Parse and validate pagination parameters
        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);

        if (isNaN(pageNumber) || pageNumber <= 0) {
            return res.status(400).send({ error: 'Invalid page number' });
        }

        if (isNaN(limitNumber) || limitNumber <= 0) {
            return res.status(400).send({ error: 'Invalid limit number' });
        }

        // Extract sort and order parameters
        const sortFields = (sort as string).split(',');
        const sortOrders = (order as string).split(',');

        // Handle default orders
        while (sortOrders.length < sortFields.length) {
            sortOrders.push('asc'); // Default order can be 'asc' or 'desc' as per your preference
        }

        if (sortFields.length !== sortOrders.length) {
            return res.status(400).send({ error: 'Mismatch between sort fields and sort orders' });
        }

        // Construct sortOptions
        const sortOptions: any = {};

        for (let i = 0; i < sortFields.length; i++) {
            const field = sortFields[i].trim();

            if (!allowedSortFields.includes(field)) {
                return res.status(400).send({ error: `Invalid sort field: ${field}` });
            }

            const orderValue = sortOrders[i].trim().toLowerCase();
            if (!['asc', 'desc'].includes(orderValue)) {
                return res.status(400).send({ error: `Invalid sort order for field ${field}: ${orderValue}` });
            }

            sortOptions[field] = orderValue === 'desc' ? -1 : 1;
        }

        // Build filters from allowed exact match fields
        const filters: any = {};
        Object.keys(queryFilters).forEach((key) => {
            if (allowedFilterFields.includes(key)) {
                filters[key] = queryFilters[key];
            }
        });

        // Handle timestamp range filtering
        if (startTimestamp || endTimestamp) {
            filters['timestamp'] = {};
            if (startTimestamp) {
                const start = new Date(startTimestamp as string);
                if (isNaN(start.getTime())) {
                    return res.status(400).send({ error: 'Invalid startTimestamp' });
                }
                filters['timestamp'].$gte = start;
            }
            if (endTimestamp) {
                const end = new Date(endTimestamp as string);
                if (isNaN(end.getTime())) {
                    return res.status(400).send({ error: 'Invalid endTimestamp' });
                }
                filters['timestamp'].$lte = end;
            }
        }

        // Handle index range filtering
        if (minIndex || maxIndex) {
            filters['index'] = {};
            if (minIndex) {
                const minIdx = parseInt(minIndex as string, 10);
                if (isNaN(minIdx)) {
                    return res.status(400).send({ error: 'Invalid minIndex' });
                }
                filters['index'].$gte = minIdx;
            }
            if (maxIndex) {
                const maxIdx = parseInt(maxIndex as string, 10);
                if (isNaN(maxIdx)) {
                    return res.status(400).send({ error: 'Invalid maxIndex' });
                }
                filters['index'].$lte = maxIdx;
            }
        }

        // Handle transactionFee range filtering
        if (minTransactionFee || maxTransactionFee) {
            filters['transactionFee'] = {};
            if (minTransactionFee) {
                const minFee = parseFloat(minTransactionFee as string);
                if (isNaN(minFee)) {
                    return res.status(400).send({ error: 'Invalid minTransactionFee' });
                }
                filters['transactionFee'].$gte = minFee;
            }
            if (maxTransactionFee) {
                const maxFee = parseFloat(maxTransactionFee as string);
                if (isNaN(maxFee)) {
                    return res.status(400).send({ error: 'Invalid maxTransactionFee' });
                }
                filters['transactionFee'].$lte = maxFee;
            }
        }

        if(minBlockNumber || maxBlockNumber) {
            filters['blockNumber'] = {};
            if(minBlockNumber) {
                const minBlock = parseInt(minBlockNumber as string);
                if(isNaN(minBlock)) {
                    return res.status(400).send({ error: 'Invalid minBlockNumber' });
                }
                filters['blockNumber'].$gte = minBlock;
            }
            if(maxBlockNumber) {
                const maxBlock = parseInt(maxBlockNumber as string);
                if(isNaN(maxBlock)) {
                    return res.status(400).send({ error: 'Invalid maxBlockNumber' });
                }
                filters['blockNumber'].$lte = maxBlock;
            }
        }

        // Call the service function
        const {transactions,total} = await getTransactionsWithPaginationSvc(
            pageNumber,
            limitNumber,
            filters,
            sortOptions
        );

        res.send({
            total,
            page: pageNumber,
            limit: limitNumber,
            transactions,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

export const getTransactionByHash = async (req: Request, res: Response) => {
    const { hash } = req.params;
    try {
        const transaction = await getTransactionByHashSvc(hash as string);
        res.send(transaction);
    }catch(err) {
        console.log(err);
        res.status(500).send({err: 'Internal Server Error'});
    }
};

export const getTransactionsByBlockNumber = async (req: Request, res: Response) => {
    const { blockNumber } = req.params;
    try {
        const transactions = await getTransactionsByBlockNumberSvc(parseInt(blockNumber as string));
        res.send(transactions);
    }catch(err) {
        console.log(err);
        res.status(500).send({err: 'Internal Server Error'});
    }
};

export const getTransactionsByBlockHash = async (req: Request, res: Response) => {
    const { hash } = req.params;
    try {
        const transactions = await getTransactionsByBlockNumberSvc(parseInt(hash as string));
        res.send(transactions);
    }catch(err) {
        console.log(err);
        res.status(500).send({err: 'Internal Server Error'});
    }
};

export const getTransactionCount = async (req: Request, res: Response) => {
    try {
        const count = await getTransactionCountSvc();
        res.send({ count });
    }catch(err) {
        console.log(err);
        res.status(500).send({err: 'Internal Server Error'});
    }
}