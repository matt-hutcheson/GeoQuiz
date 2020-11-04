const express = require('express');
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router');

app.use(cors());
app.use(bodyParser.json());

MongoClient.connect('mongodb://localhost:27017')
    .then((client) => {
        const db = client.db('geoquiz');
        const resultsCollection = db.collection('results');
        const resultsRouter = createRouter(resultsCollection);
        app.use('/api/results', resultsRouter);
    })
    .catch(console.error);

    app.listen(3000, function() {
        console.log(`Listening on port ${ this.address().port }`);
    });
