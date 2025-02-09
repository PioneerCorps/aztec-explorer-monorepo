import {Block,IBlock} from "../model/block.model";

async function getBlocksWithPaginationSvc(
    page: number,
    limit: number,
    filters: any,
    sortOptions: any
): Promise<{ blocks: IBlock[]; total: number }> {
    // Execute both queries in parallel
    const [blocks, total] = await Promise.all([
        Block.find(filters)
            .sort(sortOptions)
            .skip((page - 1) * limit)
            .limit(limit)
            .exec(),
        Block.countDocuments(filters),
    ]);

    return { blocks, total };
}

async function getBlockByBlockNumberSvc(blockNumber: number) : Promise<IBlock | null> {
    const block = await Block.findOne({ number: blockNumber });
    return block;
}

async function getBlockByBlockHashSvc(hash: string) : Promise<IBlock | null> {
    const block = await Block.findOne({
        hash: hash
    });
    return block;
}

async function getBlockCountSvc() : Promise<number> {
    const count = await Block.countDocuments();
    return count;
}

async function searchBlocksByHashSvc(query: string) : Promise<IBlock[] | null> {
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
    const regex = new RegExp(escapedQuery, 'i');
    const blocks = await Block.find({
        hash: { $regex: regex }
    });

    return blocks;
}



export { getBlocksWithPaginationSvc, getBlockByBlockNumberSvc,getBlockByBlockHashSvc, getBlockCountSvc,searchBlocksByHashSvc };