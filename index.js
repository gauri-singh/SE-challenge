const express= require("express")
const joi=require("joi")
const moment=require("moment")
const fs=require('fs')
var app=express();
var port=3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('views', './views');
app.set('view engine','pug');




const readFileData = (filename) => (
	new Promise((resolve, reject) => {
		fs.readFile(filename, (err, data) => {
			if(err) {
				reject('File Name is invalid')
			}
			resolve(data)
        })
    })
)


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
var secrets = {}
portNum = 3000


readFileData('secrets.txt').then((data) => {
    var arr=data.toString().split('\r\n')
    console.log(arr.toString());
    secrets['accountSid']=arr[0];
    secrets['authToken']=arr[1];
    secrets['sender']=arr[2];
    secrets['recv']=arr[3];
    console.log(secrets)

    const client = require('twilio')(secrets['accountSid'], secrets['authToken']);
    client.messages
    .create({
        body: 'Hey , your name is John!',
        from: secrets['sender'],
        to: secrets['recv']
    })
    .then(
        message => console.log(message.sid)
        );
    
}).then(app.listen(portNum))
.catch((message) => console.log(message))


