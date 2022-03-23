let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoDb = require('./database/db');

mongoose.Promise = global.Promise;


mongoose.connect(mongoDb.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB successfully :)");
}).catch((err) => {
    console.log("Error while attempting to connect to MongoDB");
    console.log(err);
});

const bookRoute = require('./node-backend/routes/book');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/Bookstore')));
app.use('/api', bookRoute);
const port = process.env.port || 8000;
app.listen(port, () => {
    console.log('Listening port on:' + port);
});

app.use((req, res, next)=> {
    next(); 
});

app.get('/', (req, res) => {
    res.send('invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/Bookstore/index.html'));
});

app.use(function (err, req, res, next) {
    console.log(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});