const db=require('./Database/Connect');

const express =require('express');

const path = require('path');


const port = 3001;


const app=express();

app.get('/',(req,res)=> res.send('INDEX'));

app.listen(port,console.log(`Server running on ${port}`))

app.use("/Info",require("./Route/Info"));




db.authenticate()
.then(()=> console.log("Database connected"))
.catch(err=> console.log('Error: ' + err) )