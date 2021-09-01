const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res) {
  const name = req.body.fullName;
  const emailPut = req.body.email;
  const phone = req.body.phoneNumber;
  const telephone = req.body.landline;
  //const bookPut = req.body.book;
  //const callPut = req.body.call;



  //Giving login details to mailchimp//

  const data = {
    members: [
      {
        email_address : emailPut,
        status : "subscribed",
        merge_fields: {
          FNAME: name,
          PHONE: phone,
          PHONE: telephone
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us1.api.mailchimp.com/3.0/lists/8d6ea0f2f8";

  const options = {
    method: "POST",
    auth: "vani01: 156ef1a393c53d972593b3f77696237a-us1"
  };

  const request = https.request(url, options, function(response) {
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

//^^^^^^^^^^^^Giving login details to mailchimp^^^^^^^^^^^^^^^^^//

app.listen(3000, function() {
  console.log("server started on port 3000");
});
