const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Cost = require('./model');
require('dotenv').config();
const cors = require('cors');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extedned: false }));

// Connect to Mongo Database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true },
  (err) => {
    if (err) console.log(err);
    else console.log('Connected to the database!');
  },
);


// Post request to database
app.post('/create', (req, res,) => {
  const { date, days, cost } = req.body;
  const newCost = {date: date, days: days, cost: cost};
  console.log('cost is: ', cost);
  Cost.create(newCost, function (err, returnedCost) {
    if(err) return res.status(400).json({error: err});
    res.send(returnedCost)
  });
});

// Connect to server
app.listen('3003', () => console.log('Server listening on PORT 3003!'));