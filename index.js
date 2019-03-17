const express= require("express")
const joi=require("joi")
var app=express();
var port=3000;


// Make a page that takes:
//john's phone number
//john's sleeping time and waking up time

//Make another page that show's the time the app has been running and log of sent and failed messages




app.get('*',(req,res)=>{
    res.send("This is not a valid URL");
    });
    app.post('*',(req,res)=>{
        res.send("This is not a valid URL");
        });
    app.listen(port)
    console.log("The app is up and running on Port :",port);