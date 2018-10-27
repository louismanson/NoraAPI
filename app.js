/**
node app1.js
**/

// Parse body in API call
var bodyParser = require("body-parser");
var express = require("express");
var pretty = require('express-prettify');
var db = require('./user.json');

var app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(pretty({ query: 'pretty' }));

app.get('/users', function(req, res) {
	if(req.query._id!=null){
		var result;
		for (var i = 0; i < db.users.length; i++) {
			if(db.users[i]._id == req.query._id){
				result = i;
			}
		}
		if(result!=null){
			res.json( db.users[result] );
		}else {
			res.json( 'User not Found' );
		}
  		
	}else {
		res.json( db.users  );
	}
	
});

app.get('/count', function(req, res) {
  res.json( db.users.length);
});

var PORT = process.env.port || 3000;

app.listen(PORT, function() {
  console.log(`App running in port ${PORT}`);
});