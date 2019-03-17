const express= require("express")
const joi=require("joi")
const moment=require("moment")
var app=express();
var port=3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('views', './views');
app.set('view engine','pug');

const accountSid = 'account_id';
const authToken = 'your_auth_token';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Hey,your name is John!',
     from: 'xxxxxxxxxx',
     to: 'xxxxxxxxxx'
   })
  .then(message => console.log(message.sid));




var now=moment().format('HH:mm')
console.log(now);
app.get('/',(req,res)=>{
    res.render('home');
})

app.post('/details',(req,res)=>{
    const schema = {
        phone: joi.number().required(),
        sleep: joi.string().required(),
        wake: joi.string().required()
    }
    const result = joi.validate(req.body, schema)
    if(result.error) {
        res.status(404).send(result.error.details[0].message);
    } else {
        res.send(result.value)
    }
})
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