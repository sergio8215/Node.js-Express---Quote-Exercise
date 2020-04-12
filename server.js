const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log("Server listening");
});

const quotesRouter = express.Router();

app.use('/api', quotesRouter);

// Get random
quotesRouter.get('/quotes/random', (req, res, next) => {
  const result =  { "quote": getRandomElement(quotes) };
  res.json(result);
});

quotesRouter.get('/quotes', (req, res, next) => {
  const person = req.query.person;
  if( person ){
    const result =  { "quotes" : [] };
    for (i in quotes) {
      if ( quotes[i].person == person ){
          result.quotes.push( quotes[i] );
      }
    } 
    console.log(result);
    res.json(result);
  }else{
    const result =  { "quotes" : quotes };
    console.log(result);
    res.json(result);
  }
});


quotesRouter.post('/quotes', (req, res, next) => {
  const person = req.query.person;
  const quote = req.query.quote;
  if( person && quote ){
    quotes.push( {'quote' : quote,
                  'person': person
                 } );
    console.log(quotes);
    const result = { 'quote' : {'quote' : quote,
                  'person': person
                 } };
    res.json(result);
  }else{
    res.status(400).json();
  }
});


