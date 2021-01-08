const request = require('postman-request');
const geoCode = (address,callback)=>{
    let geoCodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/address.json?access_token=pk.eyJ1IjoibGVzdGVyLTI2IiwiYSI6ImNrajhqdXF4dTB4ejIycHJ1MHdqb2thaWIifQ.tjRk_41IDyUPtmgmP79yAg";
    geoCodeUrl = geoCodeUrl.replace("address",encodeURIComponent(address));
    request({url:geoCodeUrl,json:true},(error, response, body)=>{ 
        if(!error && body.features.length > 0){
            const lat = body.features[0].center[0];
            const long = body.features[0].center[1];
            callback("",{
                lat:lat,
                long:long
            });
        }else{
            callback("unable to geocode");
        }
    });
 }

 module.exports = geoCode;