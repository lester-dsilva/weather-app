const request = require('postman-request');
const forecast = (lat,long,callback)=>{
    let url = "http://api.weatherstack.com/current?access_key=0bc6e9614d7b6d16a1dd083d05b18d0f&query=lat,long&units=f";
    url = url.replace("lat",lat).replace("long",long);
    request({url,json:true},(error, response, body)=>{
        if(error){
            callback("something is wrong",undefined);
            return;
        }
        callback(undefined,body.current);
    });
}

module.exports = forecast;