const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { dbURI, port } = require('./config/environment');
const router = require('./config/router');
const errorHandler = require('./lib/errorHandler');

const app = express();

app.use(express.static(`${__dirname}/public`));

mongoose.connect(dbURI);
app.use(bodyParser.json());

app.use('/api', router);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(errorHandler);

app.listen(port, () => console.log(`Give us your money on port ${port}`));

module.exports = app;
