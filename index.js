const express= require('express')
const joi=require('joi')
const moment=require('moment')
const fs=require('fs')
const schedule = require('node-schedule');

var app=express();
var port=3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('views', './views');
app.set('view engine','pug');

var secrets = {}
var file = 'secrets.txt';
var data= '';
var phone;
if(!fs.existsSync(file)) {
  res.send("File not found, please create a secrets file with details");
}
else {
  data= fs.readFileSync(file);
}

var arr=data.toString().split('\r\n')
var accountSid=arr[0];
var authToken=arr[1];
var sender=arr[2];


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
        phone=result.value.phone;
        //will call the send sms function every hour
        var now=moment().format('HH:mm');
        if(now >result.value.wake && now < result.value.sleep ){
            setInterval(sendsms,3600000 );
        }
        res.send(result.value)
    }
})
// Make a page that takes:


//Make another page that show's the time the app has been running and log of sent and failed messages




app.get('*',(req,res)=>{
    res.send("This is not a valid URL");
    });
app.post('*',(req,res)=>{
    res.send("This is not a valid URL");
    });






function sendsms(phone){
    var cnt=0; var flag='not'
    const client = require('twilio')(accountSid, authToken);
    client.messages.create({
        body: 'Hey , your name is John!',
        from: sender,
        to: phone,
        statusCallback: 'http://postb.in/1234abcd',
    })
    .then(
        message => {console.log(message.sid,message.status)
            if(message.status =='failed' ||message.status =='undelivered'){
                while(cnt<5 && flag!='sent'){
                    client.messages.create({
                    body: 'Hey , your name is John!',
                    from: sender,
                    to: phone,
                    statusCallback: 'http://postb.in/1234abcd'
                    })
                    .then(
                        message => {console.log(message.sid)
                        if(message.status === 'delivered' ||message.status === 'sent' ||message.status === 'queued'){
                            flag='sent';
                            }
                            cnt++;
                        }
                    );
                }
            }
        }
    );
}
function test(){
    console.log("hey");
}
app.listen(port)
start=moment().format('HH:mm')
console.log("Server is up and running on Port :",port);

