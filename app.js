var express = require('express');


var pub = __dirname + "/public";


// setup middleware

var app = express();

var contentBlocks = require('contentblocks')({ app: app, host: 'localhost', pathFind: '/find', pathPost: '/post', pathPut: '/put', pathDelete: '/delete' });

app.configure(function(){

  app.use(contentBlocks.render); // Place this line BEFORE app.use(app.router) as it needs to pre-render content.
  app.use(app.router);

  app.use(express.static(pub));
  app.use(express.errorHandler());

  // Optional since express defaults to CWD/views

  app.set('views', pub);

  // Set our default template engine to "jade"
  // which prevents the need for extensions
  // (although you can still mix and match)
  app.set('view engine', 'jade');
});

function User(name, email) {
  this.name = name;
  this.email = email;
}



// Dummy users
var users = [
    new User('tj', 'tj@vision-media.ca')
  , new User('ciaran', 'ciaranj@gmail.com')
  , new User('aaron', 'aaron.heckmann+github@gmail.com')
];

app.get('/', function(req, res){
  res.render('index', { users: users });
});

app.get('/find', function(req, res) {
  res.send('{}');

});

app.listen(80);
console.log('Express app started on port %d', 80);
