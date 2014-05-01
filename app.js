var userModule = require("./users");

var userRepository = new userModule.UserRepository();
console.log('# typeof createUsers: ' + typeof userRepository.createUsers);

userRepository.createUsers();

var express = require('express');

var app = express();
app.use( express.bodyParser() );

//CORS
var allowCrossDomain = function( req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST');
	res.header('Access-Control-Allow-Headers', 'Content-Type, X-XSRF-TOKEN');

	next();
}

app.use(allowCrossDomain);

var MY_PORT = 8080;
var baseUrl = "/angulardemo/web";

//REST Endpoints
/* GET All Users ------------------------------------------ */
app.get(baseUrl + '/users', function(req, res){
	res.json( userRepository.getAll() );
});

/* GET Dummy ------------------------------------------ */
app.get(baseUrl + '/dummy', function(req, res){
	res.json({id: 0, firstName: 'John FR', lastName: 'Doe'});
});

/* GET By Id ------------------------------------------ */
app.get(baseUrl + '/users/:id', function(req, res) {
  console.log('trying to retrieve user with id: ' + req.params.id);
  var user = userRepository.getById(req.params.id);
  res.json(user);
});


/* POST Create ---------------------------------------- */
app.post(baseUrl + '/users', function(req, res) {
  if(!req.body.hasOwnProperty('firstName') || !req.body.hasOwnProperty('lastName')) {
    res.statusCode = 400;
    return res.send('Error 400: POST syntax incorrect.');
  }

  var newUser = userRepository.addNewUser(req.body.firstName, req.body.lastName);
  res.json(newUser);
});

/* PUT (Update) --------------------------------------- */
app.put(baseUrl + '/users/:id', function (req, res) {
  if(!req.body.hasOwnProperty('id') || !req.body.hasOwnProperty('firstName') || !req.body.hasOwnProperty('lastName')) {
    res.statusCode = 400;
    return res.send('Error 400: PUT syntax incorrect.');
  }
  var changedUser = userRepository.changeUser(req.params.id, req.body.firstName, req.body.lastName);
  res.json(changedUser);
});

/* DELETE --------------------------------------------- */
app.delete(baseUrl + '/users/:id', function(req, res) {
  console.log('trying to delete user with id: ' + req.params.id);
  userRepository.deleteUser(req.params.id);
  res.json(true);
});

app.listen(process.env.PORT || MY_PORT);
