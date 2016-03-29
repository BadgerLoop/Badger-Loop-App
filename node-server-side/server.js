//'use strict';

/**
 * 
 * Node package to handle a Stripe Charges on the Server-Side
 * 
 * @version: 1.0
 * @date: 2015-12-4
 * @author: Noodlio
 * 
 */

// define your keys here
var STRIPE_API_SECRET_KEY   = 'sk_live_4Vb8kJwWGak7It7voSnT1TlL';              

// init instances
var qs         = require('querystring');
var request    = require('request');
var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');
var stripe     = require("stripe")(STRIPE_API_SECRET_KEY);

var app         = express();
var router      = express.Router();              
var port        = process.env.PORT || 9311;


// Cross Domain Origin Setup
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_869vwj2s:imic6t35ihm7vrso393bh4hcgn@ds011840.mlab.com:11840/heroku_869vwj2s');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("Connected to DB");
});

var Schema = mongoose.Schema;

var updateSchema = new Schema({
    createdAt: Number,
    text: String,
    author: String
});

var Update = mongoose.model('Update', updateSchema);

/** 
 * =============================================================================
 * Stripe Charge
 * =============================================================================
 */

// when the user has not specified a destination account
router.post('/charge', function(req, res) {
    
    console.log("--------- charge")
    
    console.log("charge: amount:", req.body.stripeAmount)
    console.log("charge: currency:", req.body.stripeCurrency)
    console.log("charge: source:", req.body.stripeSource)
    console.log("charge: description", req.body.stripeDescription)
    
    var charge = stripe.charges.create({
        amount:           req.body.stripeAmount,                // amount in cents, again
        currency:         req.body.stripeCurrency,
        source:           req.body.stripeSource,
        description:      req.body.stripeDescription,
    }, function(err, charge) {
        
        console.log("charge callback: error:", err)
        console.log("charge callback: charge:", charge)

        if(err) {
          res.json(err);
        } else {
          res.json(charge);   
        }
        
    });
});

/** 
 * =============================================================================
 * Update
 * =============================================================================
 */
// when the user has not specified a destination account
router.post('/postUpdate', function(req, res) {
    
    res.json("hello");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router); // register our route
app.listen(port);

console.log('Magic happens on port ' + port);

