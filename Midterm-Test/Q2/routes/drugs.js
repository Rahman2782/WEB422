const express = require('express'); //good practice to import this in any file that uses express
const router = express.Router(); //
const moment = require('moment'); //for getting the current date

const { v4: uuidv4 } = require('uuid'); //to generate unique IDs
const _ = require('lodash'); //contains helper functions like _.find and _.remove

let drugs = require('../data/drugs.json'); //reads+parses this file into an array called drugs

router.get('/', (req, res) => {
    res.json(drugs);
})

router.get('/:uuid', (req, res) => {
    const drug = _.find(drugs, { uuid: req.params.uuid });
    if (drug) { 
        res.json(drug); 
    }
    else { res.status(404).send('DRUG NOT FOUND') };
});

router.post('/', (req, res) => {
  const newDrug = {
    uuid: uuidv4(),
    name: req.body.name,
    dateAdded: moment().toISOString(),
    summary: req.body.summary,
    availableQuantity: req.body.availableQuantity,
  };
  drugs.push(newDrug);
  res.status(201).json(newDrug);
});

router.put('/:uuid', (req, res) => {
  const index = _.findIndex(drugs, { uuid: req.params.uuid });
  if (index !== -1) {
    drugs[index] = { ...drugs[index], ...req.body };
    drugs[index].dateAdded = moment().toISOString();
    res.json(drugs[index]);
  } else {
    res.status(404).send('Drug not found');
  }
});

router.delete('/:uuid', (req, res) => {
  const initialLength = drugs.length;
  _.remove(drugs, { uuid: req.params.uuid });
  if (drugs.length < initialLength) {
    res.status(204).send();
  } else {
    res.status(404).send('Drug not found');
  }
});

module.exports = router;



/*



*/