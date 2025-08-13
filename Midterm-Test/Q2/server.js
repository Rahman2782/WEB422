const express = require('express'); 
const cors = require('cors'); 
const bodyParser = require('body-parser');
const drugsRouter = require('./routes/drugs'); 

const app = express(); //making an instance of the express app, where 'app' is the servers' core for this project
const PORT = 3000;

app.use(cors()); //enabling cross origin requests for routes
app.use(bodyParser.json());
app.use('/api/drugs', drugsRouter); //mounting the custom router, takes in a path and router. So any request that has '/api/drugs/ will be handled by drugs.js now

app.get('/', (req, res) => {
    res.send('Drug API Running.');
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
}) //starting the server with the listen method and performs a callback (console.log) that runs once the server starts





/* ======================================================================================================================== */

/*
- the bodyParser middleware lets us access (req, res) and parses the body of any incoming requests so we can use it with the req.body object

- the cors middleware is needed to let the frontend communicate with the backend by enabling all CORS requests. without this, this wouldnt be possible because by default we cant have the webpage make requests to different domains

- 'drugsRouter' is a variable that imports the custom drugs module that contains the APIs endpoints/routes for CRUD operations

*/