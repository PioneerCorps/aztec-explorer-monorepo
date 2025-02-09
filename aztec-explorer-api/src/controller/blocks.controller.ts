import { Request, Response } from 'express';
import { getBlocksWithPaginationSvc,getBlockByBlockNumberSvc,getBlockByBlockHashSvc,getBlockCountSvc } from '../service/blocks.service';

const allowedFilterFields = ['name', 'type', 'status','txCount'];
const allowedRangeFields = ['timestamp', 'totalFees'];
const allowedSortFields = ['number', 'createdAt', 'updatedAt', 'timestamp', 'totalFees','txCount'];

export const getBlocks = async (req: Request, res: Response) => {
    try {
        const {
            page = '1',
            limit = '10',
            sort = 'number',
            order = 'desc',
            startTimestamp,
            endTimestamp,
            minTotalFees,
            maxTotalFees,
            minTxCount,
            maxTxCount,
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

        // Handle totalFees range filtering
        if (minTotalFees || maxTotalFees) {
            filters['totalFees'] = {};
            if (minTotalFees) {
                const minFees = parseFloat(minTotalFees as string);
                if (isNaN(minFees)) {
                    return res.status(400).send({ error: 'Invalid minTotalFees' });
                }
                filters['totalFees'].$gte = minFees;
            }
            if (maxTotalFees) {
                const maxFees = parseFloat(maxTotalFees as string);
                if (isNaN(maxFees)) {
                    return res.status(400).send({ error: 'Invalid maxTotalFees' });
                }
                filters['totalFees'].$lte = maxFees;
            }
        }

        if(minTxCount || maxTxCount) {
            filters['txCount'] = {};
            if(minTxCount) {
                const minCount = parseInt(minTxCount as string);
                if(isNaN(minCount)) {
                    return res.status(400).send({ error: 'Invalid minTxCount' });
                }
                filters['txCount'].$gte = minCount;
            }
            if(maxTxCount) {
                const maxCount = parseInt(maxTxCount as string);
                if(isNaN(maxCount)) {
                    return res.status(400).send({ error: 'Invalid maxTxCount' });
                }
                filters['txCount'].$lte = maxCount;
            }
        }

        // Call the service function
        const { blocks, total } = await getBlocksWithPaginationSvc(
            pageNumber,
            limitNumber,
            filters,
            sortOptions
        );

        res.send({
            total,
            page: pageNumber,
            limit: limitNumber,
            blocks,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

export const getBlockByNumber = async (req: Request, res: Response) => {
    const { blockNumber } = req.params;
    try {
        const block = await getBlockByBlockNumberSvc(parseInt(blockNumber as string));
        res.send(block);
    }catch(err) {
        console.log(err);
        res.status(500).send({err: 'Internal Server Error'});
    }
};

export const getBlockByHash = async (req: Request, res: Response) => {
    const { hash } = req.params;
    try {
        const block = await getBlockByBlockHashSvc(hash as string);
        res.send(block);
    }catch(err) {
        console.log(err);
        res.status(500).send({err: 'Internal Server Error'});
    }
};

export const getBlockCount = async (req: Request, res: Response) => {
    try {
        const count = await getBlockCountSvc();
        res.send({ count });
    }catch(err) {
        console.log(err);
        res.status(500).send({err: 'Internal Server Error'});
    }
}
