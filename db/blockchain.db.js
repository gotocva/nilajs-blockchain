const { Level } = require('level')

const dbPath = './db/database/blockchain-db';

// Create a database
const db = new Level(dbPath, { valueEncoding: 'json' });
const indexDB = new Level('./db/database/blockchain-db-index', { valueEncoding: 'json' });


function latestBlockNumber() {
    return new Promise(async (resolve, reject) => {
        let blockNumber = 0;
        for await (const [key, value] of db.iterator({})) {
            blockNumber++;
        }
        resolve(blockNumber);
    })
}

async function storeBlock(block) {
    await indexDB.put(block.hash, block);
    await db.put(block.index, block);
}


async function getAllBlocks() {
    const blocks = [];
    for (let i = 0; i < await latestBlockNumber(); i++) {
        blocks.push(await getBlockByIndex(i));
    }
    return blocks;
}

function getBlockByHash(hash) {
    return indexDB.get(hash);
}

function getBlockByIndex(index) {
    return db.get(index);
}

module.exports = {
    latestBlockNumber,
    storeBlock,
    getAllBlocks,
    getBlockByHash,
    getBlockByIndex
}

