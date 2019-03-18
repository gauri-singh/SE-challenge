const express= require('express')
const joi=require('joi')
const moment=require('moment')
const fs=require('fs')
 var msglog={}

var app=express();
var port=3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('views', './views');
app.set('view engine','pug');


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
var recv=arr[3];

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
        if(now > result.value.wake && now < result.value.sleep ){
            setInterval(sendsms,10000 );
        }
        else{
            res.send("Sleeping time");
        }
        res.send(result.value)
    }
})
app.get('/logs',(req,res)=>{
    var time = moment(start).fromNow(true);
    console.log(msglog);
    res.render('logs',{time,msglog});
});

//log of sent and failed messages




app.get('*',(req,res)=>{
    res.send("This is not a valid URL");
    });
app.post('*',(req,res)=>{
    res.send("This is not a valid URL");
    });



function sendsms(phone){
    var cnt=1; var flag='not'
    const client = require('twilio')(accountSid, authToken);
    client.messages.create({
        body: 'Hey , your name is John!',
        from: sender,
        to: recv,
        statusCallback: 'http://postb.in/1234abcd',
    })
    .then(
        message => {console.log(message.sid,message.status)

            var msgtime=moment().format('HH:mm');
            var arr=[message.status,msgTime];
            msglog[message.sid]=arr;

            if(message.status =='failed' ||message.status =='undelivered'){
                while(cnt<=5 && flag!='sent'){
                    client.messages.create({
                    body: 'Hey , your name is John!',
                    from: sender,
                    to: recv,
                    statusCallback: 'http://postb.in/1234abcd'
                    })
                    .then(
                        message => {console.log(message.sid)
                        var msgtime=moment().format('HH:mm');
                        if(message.status === 'delivered' ||message.status === 'sent' ||message.status === 'queued'){
                            flag='sent';
                            }
                            cnt++;
                            console.log(cnt);
                            var arr=[message.status,msgTime];
                            msglog[message.sid]=arr;
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
start=moment().format('YYYY-MM-DDTHH:mm:ss')
console.log("Server is up and running on Port :",port);

