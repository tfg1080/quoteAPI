const { query } = require('express');
const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log('Server is Listening')
});


app.get('/api/quotes/random', (req, res, next) => {
    const quote = {quote: quotes[Math.floor(Math.random()*quotes.length)]}
    res.send(quote);
});

app.get('/api/quotes', (req, res, next) => {
    if(req.query.person){
        const person = req.query.person;
       const matchingQuotes = {quotes: quotes.filter(quote => quote.person == person)};
       res.send(matchingQuotes);
    } else {
        res.send({quotes: quotes});
    }
})

app.post('/api/quotes', (req, res, next) => {
    if(req.query.quote && req.query.person){
        const newQuote = {quote: req.query.quote, person: req.query.person};
        quotes.push(newQuote);
        res.send({quote: newQuote});
    } else {
        res.status(400).send();
    }
})