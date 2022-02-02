// get the client
const mysql = require('mysql2');
// create the connection
const con = mysql.createConnection(
  {host:process.env.dbHost, user: process.env.dbUser, password: process.env.dbPass, database: process.env.dbName }
);

//fonction de vérification de la connexion à la BDD
con.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack); // affichage de l'erreur précisément
    return;
  }

  console.log('connected to DB');
});


module.exports = con;