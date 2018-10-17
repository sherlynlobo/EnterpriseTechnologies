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
/*
server.get('/accounts/:id', function (req, res, next) {
  
  // Find a single account by their id within save
  accountsSave.findOne({ _id: req.params.id }, function (error, account) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    if (account) {
      // Send the account if no issues
      res.send(account)
    } else {
      // Send 404 header if the account doesn't exist
      res.send(404)
    }
  })
})
*/
// Create a new account

server.post('/accounts', function (req, res, next) {
  console.log('---->  Response Sent')  
  counterPost++;
  console.log("Post Count :"+counterPost);

/*
  // Make sure account is defined
  if (req.params.account === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('account must be given'))
  }
  if (req.params.name === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('name must be given'))
  }

  */
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
/*
// Update a account by their id
server.put('/accounts/:id', function (req, res, next) {

  // Make sure name is defined
  if (req.params.account === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('account must be given'))
  }
  if (req.params.name === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('name must be given'))
  }
  
  var newaccount = {
		_id: req.params.id,
		account: req.params.account, 
		name: req.params.name
	}
  
  // Update the account with the persistence engine
  accountsSave.update(newaccount, function (error, account) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send a 200 OK response
    res.send(200)
  })
})

*/
/*
// Delete account with the given id
server.del('/accounts/:id', function (req, res, next) {
  counterDel++;
  console.log("Delete Count :"+counterDel);

  // Delete the account with the persistence engine
  accountsSave.delete(req.params.id, function (error, account) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send a 200 OK response
    res.send()
  })
})
*/
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


