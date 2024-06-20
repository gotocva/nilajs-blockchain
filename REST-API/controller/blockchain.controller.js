const Blockchain = require("../../blockchain/blockchain");
const { getBlockByHash } = require("../../db/blockchain.db");


const blockchain = new Blockchain();


async function getBlockByIndex(req, res) {
    const height = req.params.height;
    try {
      const block = await blockchain.getBlock(height);
      res.json(block);
    } catch (error) {
      res.status(404).json({ error: 'Block not found' });
    }
}

async function getBlockByTransaction(req, res) {
    const transaction = req.params.transaction;
    try {
      const block = await getBlockByHash(transaction);
      res.json(block);
    } catch (error) {
      res.status(404).json({ error: 'Block not found' });
    }
}


async function getBlocks(req, res) {
    try {
        const blocks = await blockchain.getAllBlocks();
        return res.json(blocks);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to fetch blocks' });
    }
}
  
async function storeBlock(req, res) {
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ error: 'Data is required' });
    }
  
    if (typeof data != 'object') {
      return res.status(400).json({ error: 'Data must be of type JSON object' });
    }
    try {
      const newBlock = await blockchain.addBlock(data);
      res.status(201).json(newBlock);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to add block' });
    }
}

async function validateChain(req, res) {
    try {
        const errorLog = await blockchain.validateChain();
        if (errorLog.length === 0) {
            res.json({ message: 'Blockchain is valid' });
        } else {
            res.json({ errors: errorLog });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to validate blockchain' });
    }
}
  


module.exports = {
    getBlocks,
    getBlockByIndex,
    storeBlock,
    validateChain,
    getBlockByTransaction
}