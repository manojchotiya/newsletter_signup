const express=require("express");
const request=require("request");
require("dotenv").config();
const bodyParser=require("body-parser");
const https=require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/signup.html");

});

app.post("/",function(req,res){
    const firstname=req.body.fName;
    const lastname=req.body.lName;
    const email=req.body.email;

    
var data={
    members:[
    {   
        email_address:email,
        status:"subscribed",
        merge_fields:{

           FNAME: firstname,
           LNAME: lastname
        }

    }
    ]
};
var jsonData=JSON.stringify(data);

 


const url= "https://us21.api.mailchimp.com/3.0/lists/b98b059f2a";
const options={
    method:"POST",
    auth:"manoj1:"+ process.env.mailchimp_api_key 
}
const request=https.request(url,options,function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
       else{
        res.sendFile(__dirname+"/failure.html");
       } 
//      response.on("data",function(data){
//         console.log(JSON.parse(data));
//      });
});

request.write(jsonData);
request.end();


});



// app.post("/success",function(req,res){
  
//     res.sendFile(__dirname+"/success.html");

// });

//api
// 2201166d0aab0ea05ccb860b701af5f5-us21

//LIST ID
// b98b059f2a


app.listen(3000,function(){
console.log("listening to port 3000");});
