const express=require('express');
const mysql = require ('mysql');
const cors = require('cors');
const dotenv=require('dotenv');

const UserRoute = require('./routes/UserRoute.js');
const AuthRoute = require('./routes/AuthRoute.js');

 dotenv.config({path:'./.env'}); 


 const app = express();
 
 const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    

    
   origin: 'http://localhost:3000'
}));

 app.get ("/",(req,res)=>{
    res.send("login")

 });
 db.connect((error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log ("mysql connected")
    }

 });
 // routes 
   app.use(UserRoute);
   app.use(AuthRoute);

 app.listen (3000,()=>{
    console.log ("serveur sur le port 3000");
 })

