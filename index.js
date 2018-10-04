var SERVER_NAME = 'product-api'
var PORT = 8080;
var HOST = '127.0.0.1';
var counterGet = 0;
var counterPost = 0;
var counterDel = 0;

var restify = require('restify')

  // Get a persistence engine for the products
  , productsSave = require('save')('products')

  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log('Resources:')
  console.log(' /products')
  console.log(' /products/:id')  
})

server
  // Allow the use of POST
  .use(restify.fullResponse())

  // Maps req.body to req.params so there is no switching between them
  .use(restify.bodyParser())

// Get all products in the system
server.get('/products', function (req, res, next) {
  console.log('-----> received request')  
  counterGet++;
  console.log("Get Count :"+counterGet);

  // Find every entity within the given collection
  productsSave.find({}, function (error, products) {

    // Return all of the products in the system
    res.send(products)
  })
})

// Get a single product by their product id

server.get('/products/:id', function (req, res, next) {
  
  // Find a single product by their id within save
  productsSave.findOne({ _id: req.params.id }, function (error, product) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    if (product) {
      // Send the product if no issues
      res.send(product)
    } else {
      // Send 404 header if the product doesn't exist
      res.send(404)
    }
  })
})

// Create a new product

server.post('/products', function (req, res, next) {
  console.log('---->  Response Sent')  
  counterPost++;
  console.log("Post Count :"+counterPost);


  // Make sure product is defined
  if (req.params.product === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('Product must be given'))
  }
  if (req.params.price === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('Price must be given'))
  }
  var newproduct = {
		product: req.params.product, 
		price: req.params.price
	}

  // Create the product using the persistence engine
  productsSave.create( newproduct, function (error, product) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send the product if no issues
    res.send(201, product)
  })
})

// Update a product by their id
server.put('/products/:id', function (req, res, next) {

  // Make sure name is defined
  if (req.params.product === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('product must be given'))
  }
  if (req.params.price === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('price must be given'))
  }
  
  var newproduct = {
		_id: req.params.id,
		product: req.params.product, 
		price: req.params.price
	}
  
  // Update the product with the persistence engine
  productsSave.update(newproduct, function (error, product) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send a 200 OK response
    res.send(200)
  })
})

// Delete product with the given id
server.del('/products/:id', function (req, res, next) {
  counterDel++;
  console.log("Delete Count :"+counterDel);

  // Delete the product with the persistence engine
  productsSave.delete(req.params.id, function (error, product) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send a 200 OK response
    res.send()
  })
})

server.del('/products', function (req, res, next) {
  counterDel++;
  console.log("Delete Count :"+counterDel);

  // Delete the product with the persistence engine
  productsSave.deleteMany({}, function (error, product) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send a 200 OK response
    res.send(200, "Products have been deleted")
  })
})


