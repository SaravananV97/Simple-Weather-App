const request = require('request');
let geoCo_ord = function(address,callback){
  request({url: `https://maps.googleapis.com/maps/api/geocode/json?key=%20AIzaSyASNLuS2WHSmlGnmYGp1Or0yi1WDdI638Q%20&address=${encodeURIComponent(address)}`,
           json: true},(error,response,body)=>{
                if(error){
                  callback("Cannot connect to the API Servers!.");
                 }
                else if(body.status === "ZERO_RESULTS"){
                  callback("Please type a valid Location or ZipCode");
                }
                else if(body.status === "OK"){
                callback(undefined,{address: body.results[0].formatted_address, longitude: body.results[0].geometry.location.lng,
                                     latitude: body.results[0].geometry.location.lat});
                }
          });
}
module.exports = geoCo_ord;
