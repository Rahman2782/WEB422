const express = require('express');
const _ = require('lodash');
const luxon = require('luxon');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Test 1 Application running');
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})