const request = require('request');

let weatherData = (geoLocation,callback) => {
                request({url: `https://api.darksky.net/forecast/27b710c05182ec40614c8be2662d7818/${geoLocation.latitude},${geoLocation.longitude}`,json: true},
                            (error,response,body) => {
                              if(error){
                                callback("Unable to connect to darksky API");
                              }
                              else if(response.statusCode === 403){
                                callback("Unable to fetch weatherData");
                              }
                              else if(response.statusCode === 400)
                                callback("Invalid Location info...!!");
                              if(!error && response.statusCode === 200){
                                callback(undefined,{condition:`\nConditions: ${body.currently.summary}` ,
                                  temperature:`Temperature: ${Math.ceil((body.currently.temperature-32)*0.5556)}°C`,
                                  app_temp:`Feels like: ${Math.ceil((body.currently.apparentTemperature-32)*0.5556)}°C`});
                        }
                      });
                    }
module.exports = weatherData;
