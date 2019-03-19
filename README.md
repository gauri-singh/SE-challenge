# SE-challenge

## **Problem Statement**

John has a certain kind of amnesia. Every hour, he forgets his name. He’s tired of setting an alarm on his very old phone which doesn’t allow setting cron alarm jobs.

He wants to hire you to create an application which will send him an SMS every hour to remind him of his name. He also wants you to make sure that he doesn’t get alarms during the night when he is asleep.

Since you don’t know which part of the world John lives in, you have to use an SMS provider which can send an SMS to nearly every country. Twilio is a nice service for sending out SMSes. However, sometimes Twilio’s SMS fails, in which case you have to send it again.

## **_The Real ReadMe_**

* The app is made using Nodejs. Download the required libraries by running the command ```npm install```
* You need to make a Twilio Account.
* Make a 'secrets.txt' file which has the following details(without any quotes just directly write them, each in a new line):
    
    + The first line should have your Twilio Account's SID
    + The second line should have your Twilio Account's Auth Token
    + The third line should have your Twilio Phone number
* Just run the command ```node index.js``` and you're good to go.
* The home Url is an input page, where you need to give the phone number at which the number has to be sent , the Sleeping Time and Waking time of John.
* Once you enter that, you will be redirected to '/logs' page which will display the time for which the Server has been running and The Message Log
* The default port number is 3000
* That's it ,this simple yet effective App is ready and running on your local machine!
