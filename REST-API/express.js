const express = require('express');
const cors = require('cors');

const blockchainController = require('./controller/blockchain.controller');

const app = express();


app.use(express.json());

app.use(cors());

/**
 * REST api routes 
 */


app.get('/blockchain', blockchainController.getBlocks);

app.post('/transaction', blockchainController.storeBlock);

app.get('/validate', blockchainController.validateChain);

app.get('/block/:height', blockchainController.getBlockByIndex);
app.get('/transaction/:transaction', blockchainController.getBlockByTransaction);
app.get('/tx/:transaction', (req, res) => {
    res.sendFile(process.cwd()+'/public/index.html');
});

module.exports = app;


