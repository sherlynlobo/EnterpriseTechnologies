//Author: Sherlyn Lobo
//Student Id: 301013071
//Program : Mobile Application Development
//Enterprise Technologies Assignment 1
var SERVER_NAME = 'account-api'
var PORT = process.env.PORT || 8080;
var HOST = '127.0.0.1';

var counterGet = 0; //counter variable for get
var counterPost = 0; //counter variable for post
var counterDel = 0;  //counter variable for delete

var restify = require('restify')

  // Get a persistence engine for the accounts
  , accountsSave = require('save')('accounts')

  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log('Resources:')
  console.log(' /accounts')
  console.log(' /accounts/:id')  
})

server
  // Allow the use of POST
  .use(restify.fullResponse())

  // Maps req.body to req.params so there is no switching between them
  .use(restify.bodyParser())

// Get all accounts in the system
server.get('/accounts', function (req, res, next) {
  console.log('-----> received request')  
  counterGet++;
  console.log("Get Count :"+counterGet);

  // Find every entity within the given collection
  accountsSave.find({}, function (error, accounts) {

    // Return all of the accounts in the system
    res.send(accounts)
  })
})

// Get a single account by their account id

// Create a new account

server.post('/accounts', function (req, res, next) {
  console.log('---->  Response Sent')  
  counterPost++;
  console.log("Post Count :"+counterPost);


  var newaccount = {
		account: req.params.account, 
		name: req.params.name
	}

  // Create the account using the persistence engine
  accountsSave.create( newaccount, function (error, account) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send the account if no issues
    res.send(201, account)
  })
})

server.del('/accounts', function (req, res, next) {
  counterDel++;
  console.log("Delete Count :"+counterDel);

  // Delete the account with the persistence engine
  accountsSave.deleteMany({}, function (error, account) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send a 200 OK response
    res.send(200, "accounts have been deleted")
  })
})


