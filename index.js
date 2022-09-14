const express = require('express');
const app = express();
const port = 3000;
const path = require('path');


app.use(express.static('./templets'));
app.use(express.static('./css'));
app.use(express.static('./MYJS'));
app.use(express.json());


//thsi is for cors error
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/templets/signin.html'));
});

app.get('/otp', (req, res) => {
    res.sendFile(path.join(__dirname, '/templets/otp.html'));
})

app.get('/verification',(req,res)=>{
    res.sendFile(path.join(__dirname,'/templets/success.html'));
})

//by using this method we send the verification code to the login user;
//this is twilio verification service
/*app.post('/send-verifaction-otp', (req, res) => {
    const { mob } = req.body;

    client.verify.services(serviceId)
        .verifications
        .create({ to: '+91' + mob, channel: 'sms' })
        .then(verification => {
            return res.json({ verification });
        })
        .catch((err) => {
            return res.status(400).json({ err });
        });
});


app.post('/verify-otp', (req, res) => {
    const { mob, code } = req.body;

    client.verify.services(serviceId)
        .verificationChecks
        .create({ to: '+91' + mob, code: code })
        .then(verification_check => {
            return res.status(200).json({ verification_check });
        })
        .catch((error) => {
            return res.status(400).json({ error });
        })
});*/

app.listen(port, () => {
    console.log("Server is listen at the port: " + port);
})