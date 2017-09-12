var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost/quoting_dojo');
var QuoteSchema = new mongoose.Schema({
    name: String,
    quote: String
}, { timestamps: true });
mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'User'
var Quote = mongoose.model('Quote') // We are retrieving this Schema from our Models, named 'User'
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');

app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
})

app.post('/quotes', function(req, res) {
    console.log("POST DATA", req.body);

    console.log("this is the quote: ",
        req.body.quote);
    var quote = new Quote({ name: req.body.name, quote: req.body.comment });
    quote.save(function(err) {
        // if there is an error console.log that something went wrong!
        if (err) {
            console.log('something went wrong', err);
            res.render('index');
        } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully added a user!');
            res.redirect('/quotes');
        }
    })
})

app.get('/quotes', function(req, res) {
    console.log("check");
    Quote.find({}, function(err, quotes) {
        console.log(quotes);
        res.render('quotes', { quotes: quotes });
    })
})


app.listen(8000, function() {
    console.log("listening on port 8000");
})