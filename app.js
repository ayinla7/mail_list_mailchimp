const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/",function(req,res){
  var fName = req.body.fName;
  var lName = req.body.lName;
  var email = req.body.email;

  console.log(fName);
  console.log(lName);
  console.log(email);

  var data ={
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: fName,
          LNAME: lName
      }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/8c8a95b022";

  const options = {
    method : "POST",
    auth: "kwamdeen:947e5f14fd5b39f44588b4aeb55dda96-us14"
  }

const request = https.request(url, options, function(response){
  if (response.statusCode === 200){

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
    res.sendFile(__dirname + "/success.html");
  }else{
    res.sendFile(__dirname + "/failure.html");
  }
})

request.write(jsonData);
request.end();
//res.send("thank You!");

});

app.post("/retry", function(req, res){
  res.redirect('/');
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is working");
});

//API KEY
//947e5f14fd5b39f44588b4aeb55dda96-us14
//Audience ID
//8c8a95b022
//Heroku
//https://arcane-refuge-11694.herokuapp.com
