const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router');

app.use(cors());
app.use(bodyParser.json());

MongoClient.connect('mongodb+srv://geoquizUser9:7AvLT5YDSQYVtAJs@cluster0.q4ebb.mongodb.net/geoquiz?retryWrites=true&w=majority', { useNewUrlParser: true})
    .then((client) => {
        const db = client.db('geoquiz');
        const resultsCollection = db.collection('results');
        const resultsRouter = createRouter(resultsCollection);
        app.use('/api/results', resultsRouter);
    })
    .catch(console.error);

    if(process.env.NODE_ENV === 'production') {
        app.use(express.static(__dirname + '/public'));
        app.get(/.*/, (req, res) => res.sendFile(__dirname + 'public/index.html'));
    }

    app.listen(PORT, function() {
        console.log(`Listening on port ${ this.address().port }`);
    });
