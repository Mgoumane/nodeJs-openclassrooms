// Imports
const http = require('http');
const db = require('./db.js')

//importation de mon application Express
const app = require('./app');
app.set('port', process.env.PORT || 3000  );

//Création de mon serveur 
const server = http.createServer( app )
server.listen( process.env.PORT || 3000 ) ;

