const yargs = require('yargs');
const axios = require('axios');
const argv = yargs.options({
  a:{
    demand: true, describe: "Address to fetch the weather info ",
    alias: "address",string: true,
    default: 'paloalto'
  }
}).help().alias("help","h").argv;

var geoLocationURL = `https://maps.googleapis.com/maps/api/geocode/json?key=%20AIzaSyASNLuS2WHSmlGnmYGp1Or0yi1WDdI638Q%20&address=${encodeURIComponent(argv.address)}`
var weatherURL;
axios.get(geoLocationURL).then((response)=>{
            if(response.data.status === "ZERO_RESULTS")
                    throw Error("Unable to connect to the API Servers");
            else{
              console.log(`\nAddress: ${response.data.results[0].formatted_address}`);
              var latitude = response.data.results[0].geometry.location.lat;
              var longitude = response.data.results[0].geometry.location.lng;
              weatherURL = `https://api.darksky.net/forecast/27b710c05182ec40614c8be2662d7818/${latitude},${longitude}`;
              return axios.get(weatherURL)
            }
}).then((response) => {
  console.log(`\nConditions: ${response.data.currently.summary}`);
  console.log(`\nTemperature: ${Math.ceil((response.data.currently.temperature-32)*0.5556)} °C`);
  console.log(`\nFeels Like: ${Math.ceil((response.data.currently.apparentTemperature-32)*0.5556)}°C`);
}).catch((e) =>{
  if(e.code === "ENOTFOUND")
    console.log("Unable to connect to darksky API Servers");
  else
    console.log(e.message);
});
