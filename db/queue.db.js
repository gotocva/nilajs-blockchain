const { Level } = require('level')

const dbPath = './db/database/queue-db';

// Create a database
const QueueDB = new Level(dbPath, { valueEncoding: 'json' });


console.log(QueueDB);