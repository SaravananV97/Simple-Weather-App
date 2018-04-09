const yargs = require('yargs');
const geoAddress = require("./geocode/geocode.js");
const weatherData = require("./weather/weather");
const argv = yargs.options({
  a:{
    demand: true, describe: "Address to fetch the weather info ",
    alias: "address",string: true
  }
}).help().alias("help","h").argv;
geoAddress(argv.a,(errorMessage,locationInfo) => {

    if(errorMessage){
      console.log(errorMessage);
    }
    else{
      console.log(locationInfo.address);
      console.log(locationInfo.latitude);
      console.log(locationInfo.longitude);
      weatherData(locationInfo,(errorMessage,weatherInfo) => {
                    if(errorMessage){
                      console.log(errorMessage);
                    }
                    else{
                      console.log(weatherInfo.condition);
                      console.log(weatherInfo.temperature);
                      console.log(weatherInfo.app_temp);
                    }
      });

    }
});

///
