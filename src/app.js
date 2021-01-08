const path = require('path');

const express = require('express');
const  hbs = require('hbs');

const geoCode = require('./utils/geoCode.js');
const forecast = require('./utils/forecast.js');

const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

const app = express();

//hbs
app.set("view engine",'hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

//static content
app.use(express.static(publicDirPath));

app.get("/",(req,res) => {
    res.render("index",{
        title:"Index"
    });
});

app.get("/about",(req,res) => {
    res.render("about",{
        title:"About"
    });
});

app.get("/help",(req,res) => {
    res.render("help",{
        title:"Help"
    });
});


app.get("/weather",(req,res) => {
    if(!req.query.address){
        return res.send({
            error:"Address is mandatory"
        });
    }

    geoCode(req.query.address,(error,{lat,long} = {})=>{
        if(error){
            return res.send({error});
        }

        forecast(lat,long,(error,data)=>{
           if(data)
                res.send({
                    address:req.query.address,
                    temperature:data.temperature,
                    feelsLike:data.feelslike
                });
        });
     });
});

app.get("/help/*",(req,res) => {
    res.render("404",{
        title:"404",
        error:"help not  found"
    });
});

app.get('*',(req,res) => {
    res.render("404",{
        title:"404",
        error:"not found"
    });
});

app.listen("3000",() => {
    console.log("Server is up and running");
});