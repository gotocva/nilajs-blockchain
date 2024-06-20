# Blockchain Library

This library provides a core blockchain implementation accessible via REST APIs and stores data using LevelDB. The current release supports a single-node blockchain feature.

## Features

- Core blockchain functionality exposed as REST APIs
- Data persistence using LevelDB
- Single-node blockchain implementation

## Installation

To use this library, you need to have Node.js installed. 

To clone the repository 

```sh 
git clone https://github.com/gotocva/nilajs-blockchain.git
```

Open terminal inside the directory ```cd nilajs-blockchain```

You can install the required dependencies using npm:

```sh
npm install
```

## Usage

### Running the Server

To start the Blockchain server, run:

```sh
node index.js
```

This will start the server on `http://localhost:3000`.

### REST API Endpoints

#### Add a New Block/Transaction

**Endpoint:** `POST /block`

**Description:** Adds a new block/transaction to the blockchain with the specified data.

**Request Body:**

```json
{
    "data" : {
        "from" : "aravind",
        "to" : "boobalan",
        "amount" : "125"
    }
}
```

**Response:**

```json
{
    "index": 1,
    "timestamp": "1718867161",
    "data": {
        "from": "aravind",
        "to": "boobalan",
        "amount": "125"
    },
    "nonce": 10457,
    "previousHash": "00005042da8f149d499f3942ea5bf077e681e2d49e12a57e692a9fadbc99ec8f",
    "hash": "0000931257811c594529f0474b50d8c0bd3d1a940e77cd4796235abf10aa8df1"
}
```

#### Get Blockchain

**Endpoint:** `GET /blockchain`

**Description:** Retrieves the entire blockchain.

**Response:**

```json
[
  {
    "index": 0,
    "timestamp": "1718866875",
    "data": {
      "title": "Genesis block of the blockchain",
      "difficulty": 4,
      "consensus": "Proof of work"
    },
    "nonce": 4104,
    "previousHash": "0000XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "hash": "00005042da8f149d499f3942ea5bf077e681e2d49e12a57e692a9fadbc99ec8f"
  },
  {
    "index": 1,
    "timestamp": "1718867161",
    "data": {
      "from": "aravind",
      "to": "boobalan",
      "amount": "125"
    },
    "nonce": 10457,
    "previousHash": "00005042da8f149d499f3942ea5bf077e681e2d49e12a57e692a9fadbc99ec8f",
    "hash": "0000931257811c594529f0474b50d8c0bd3d1a940e77cd4796235abf10aa8df1"
  }
]
```

### Example

#### Adding a New Block

```sh
curl -X POST http://localhost:3000/block -H "Content-Type: application/json" -d '{
    "data" : {
        "from" : "aravind",
        "to" : "boobalan",
        "amount" : "125"
    }
}'
```

#### Retrieving the Blockchain

```sh
curl http://localhost:3000/blockchain
```

### Roadmap

- [x] Core Blockchain
- [x] Proof of work - Consensus
- [x] Persistant using Level DB
- [x] REST API
- [x] Blockchain Explorer
- [ ] Digital signature 
- [ ] Distributed networks 
- [ ] Broadcasting & Queuing the transactions
- [ ] Consensus for Peer to Peer

## Development

To contribute to this project, follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, please open an issue on GitHub or contact me @ gotocva@gmail.com || +91-8056359277