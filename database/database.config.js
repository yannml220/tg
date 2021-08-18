
const mysql = require('mysql');


const db = mysql.createConnection({

    host: "localhost",
 
    user: "root",
 
    password: "v7fukr17",

    database : 'englishhh'

 
  });




  db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
  });
 


  module.exports = db