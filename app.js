const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const saltRounds = 10;


dotenv.config({ path: "./.env" });

const app = express();
// Ajouter le middleware CORS
app.use(
  cors(
   
    
  )
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "projet-pfe2",
});
db.connect((err) => {
  if (err) {
      console.log(err);
  } else {
      console.log("MYSQL CONNECTED")
  }
})
app.post('/register', (req, res) => {
  const email = req.body.email;console.log(email)
  const name = req.body.name;console.log(name)
  const password = req.body.password;console.log(password)
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
      
    }})
    db.query(
      "SELECT * FROM users WHERE email = ?;",
      email,(err, result) => {
        if (err) {
          res.send({ err: err });
          
        }
        if (result.length > 0) {
              res.send({ message: "alredy exist" }); 
        } 
        db.query("INSERT INTO users (email, name, password) VALUES (?, ?, ?)", [email, name, password], 
         (err, result) => {
          if(result){
            console.log("err");
              res.send(result);
          }else{
           console.log("problem");
              res.send({message: "succées "})
       }}
     )
  
})
});

app.post("/login", (req, res) => {
  const email = req.body.email;console.log(email)
  const password = req.body.password;console.log(password)

  db.query(
    "SELECT * FROM users WHERE email = ?;",
    email,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "succees" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

       



app.listen(5000, () => {
  console.log("serveur sur le port 5000");
});




