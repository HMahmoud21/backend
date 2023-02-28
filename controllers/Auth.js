const user =require( "../models/UserModel.js");
const bcrypt=require("bcrypt");
const db =require("../config/Database");

const saltRounds = 10;


module.exports.Login=async(req,res)=>{
    const email = req.body.email;console.log(email)
  const password = req.body.password;console.log(password)

  db.query(
    "SELECT * FROM users WHERE email = ? , password=?; ",
    email,password,
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
};
module.exports.registrer=async(req,res)=>{
    const email = req.body.email;console.log(email)
    const name = req.body.name;console.log(name)
    const password = req.body.password;console.log(password)
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
        
      }})
  
    db.query("INSERT INTO users (email, name, password) VALUES (?, ?, ?)", [email, name, password], 
        (err, result) => {
            if(result){
              console.log("err");
                res.send(result);
            }else{
              console.log("bien");
                res.send({message: "succés"})
            }
        }
    )
  }
  
