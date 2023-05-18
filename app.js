const express= require("express");

const bodyParser=require('body-parser');

const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{


    res.sendFile(__dirname+ "/index.html");


})
app.post("/",(req,res)=>{
    const EMail = req.body.Mail
    const Fristname = req.body.Fname
    const Lastname = req.body.Lname
    const PhoneNumber=req.body.Phone

    const data ={

        members : [
            {
                email_address:  EMail,
                status :"subscribed",
                merge_fields: {
                    FNAME:Fristname,
                    LNAME:Lastname,
                    PHONE:PhoneNumber
                }
            }

        ]

    };

    const JsonData = JSON.stringify(data);

    const url ='https://us21.api.mailchimp.com/3.0/lists/b03613c279';
    const options ={
        method:"POST",
        auth:"sudheer:9eafefb9d264eb2fdc914e8dfdef1f30-us21"
    }



     const request =https.request(url, options, function(response){

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })


        res.send("<h1>successFull</h1>");

    })

    request.write(JsonData);
    request.end();






    

    
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("sever is set hosting");
})








//  API key
//  9eafefb9d264eb2fdc914e8dfdef1f30-us21
// audience id  
//b03613c279
//https://us21.api.mailchimp.com/3.0/lists/b03613c279