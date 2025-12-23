var express = require('express');
var router = express.Router();
var request = require("request");
var nodemailer = require('nodemailer');
router.post('/sendotp', function (req, res) {
  console.log("API YES", req.body)
  var options = {
    method: "GET",
    url: `https://2factor.in/API/V1/5d9b1cae-151f-11f0-8b17-0200cd936042/SMS/:+91${req.body.mobileno}/:${req.body.otp}/:RESTROBUDDY`,
    /* qs: {
       authorization:'XJKbr873vRd5iUNcWF9zw6Ot1ealp2mCGDgPuqBQLTsIyjh0HMsmHZbBdLXS1eqPTxYfGorQDwN64tVW',
        
       message: req.body.otp,
       route:'q',
       
       numbers:req.body.mobileno,
       flash:0,
       schedule_time:''
 
       //senderId: 'DEMOOS',
       //routeId: '8',
       //snsContentType: 'english'
     },*/
    headers: {
      "Cache-Control": "no-cache",

    }
  };

  console.log("options:", options)
  request(options, function (error, result, body) {
    if (error) {
      console.log(error)
      return (res.json({
        result: false
      }))
    } else {
      console.log(result)
      return (res.json({
        result: true
      }))

    }
  })

})

router.post('/send_mail', function (req, res) {
  console.log(req.body)
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'ramsingh112367@gmail.com',
      pass: 'ram12345'
    }
  });

  var mailOptions = {
    from: 'ramsingh112367@gmail.com',
    to: req.body.to,
    subject: req.body.subject,
    html: req.body.message
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  next()

})
module.exports = router;