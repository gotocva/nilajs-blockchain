// blockchain.js

const crypto = require('crypto');

const blockchainConfig = require('../config/blockchain.config');
const { latestBlockNumber, storeBlock, getBlockByIndex } = require('../db/blockchain.db');

class Blockchain {

    constructor() {
        this.LatestBlockNumber = 0; 
        this.mintGenesisBlock();
    }

    async mintGenesisBlock() {
        this.LatestBlockNumber = await latestBlockNumber();
        if (this.LatestBlockNumber === 0) {
            const newBlock = {
                index: 0,
                timestamp: new Date().getTime().toString().slice(0, -3),
                data: blockchainConfig.GENESIS_BLOCK.data,
                nonce: 0,
                previousHash : blockchainConfig.GENESIS_BLOCK.previous_hash
            };
            await this.proofOfWork(newBlock);
            newBlock.hash = this.calculateHash(newBlock);
            await storeBlock(newBlock);
            this.LatestBlockNumber++;
            return newBlock;
        }
    }

    async addBlock(data) {

        const prevBlock = await getBlockByIndex(this.LatestBlockNumber-1);

        const newBlock = {
            index: this.LatestBlockNumber,
            timestamp: new Date().getTime().toString().slice(0, -3),
            data,
            nonce: 0,
            previousHash : prevBlock.hash
        };
        await this.proofOfWork(newBlock);
        newBlock.hash = this.calculateHash(newBlock);
        await storeBlock(newBlock);
        this.LatestBlockNumber++;
        return newBlock;
    }

    async getAllBlocks() {
        const blocks = [];
        const chainLength = this.LatestBlockNumber;
        for (let i = 0; i < chainLength; i++) {
            const block = await getBlockByIndex(i);
            blocks.push(block);
        }
        return blocks;
    }

    async validateBlock(blockHeight) {
        const block = await getBlockByIndex(blockHeight);
        const blockHash = block.hash;
        const validBlockHash = this.calculateHash(block) === blockHash;
        return validBlockHash;
    }

    async validateChain() {
        const errorLog = [];
        const chainLength = this.LatestBlockNumber;
        for (let i = 0; i < chainLength - 1; i++) {
        // Validate current block
        const isValid = await this.validateBlock(i);
        if (!isValid) {
            errorLog.push(`Block ${i} is invalid`);
        }

        // Compare current block hash with next block previous hash
        const block = await getBlockByIndex(i);
        const nextBlock = await getBlockByIndex(i + 1);
        if (block.hash !== nextBlock.previousHash) {
            errorLog.push(`Block ${i} hash does not match next block's previous hash`);
        }
        }

        return errorLog;
    }


    /**
     * 
     * @param {*} block 
     * @returns 
     */
    async proofOfWork(block) {
        while (true) {
            block.hash = this.calculateHash(block);
            if (block.hash.startsWith('0'.repeat(blockchainConfig.DIFFICULTY))) {
                return; // Found valid hash satisfying PoW condition
            }
            block.nonce++;
        }
    }

    /**
     * 
     * @param {*} block 
     * @returns 
     */
    calculateHash(block) {
        const { index, timestamp, data, previousHash, nonce } = block;
        return crypto.createHash('sha256').update(index + timestamp + JSON.stringify(data) + previousHash + nonce).digest('hex');
    }
}

module.exports = Blockchain;
