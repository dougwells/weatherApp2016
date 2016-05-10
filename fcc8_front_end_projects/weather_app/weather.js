$(document).ready(function() {
  console.log ("All Systems go!");
  var wxAPI = "APPID=094c7cfda5c9b5993192ea76c73f8d41";

//Get user's location
$.ajax(
  {
  url: "http://ip-api.com/json",
  dataType : "json",
  type: "GET",

  success: function(location) {
    var city = location.city.toLowerCase().replace(/\s+/g, '')+","+location.countryCode;
    var wxTodayLatLonUrl = "http://api.openweathermap.org/data/2.5/weather?lat="+location.lat+"&lon="+location.lon+"&"+wxAPI;
    var wxTodayCityUrl = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&"+wxAPI;
    var wxForecastLatLonUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?lat="+location.lat+"&lon="+location.lon+"&"+wxAPI;
    var wxForecastCityUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+city+"&"+wxAPI;


    // Get Todays Weather
      $.ajax(
        {
        url: wxTodayLatLonUrl,
        dataType : "json",
        type: "GET",

        success: function(today) {
            var tempC = Math.round(today.main.temp - 273.15);
            var tempF = Math.round(tempC*9/5 + 32);
            var sky = today.weather[0].description.toUpperCase();
            var temp = tempF;
            var units = '°F';
            document.querySelector('#city').textContent = "Todays weather for "+location.city;
            document.querySelector('#wx').textContent = sky + ". Temp = " + temp + units;
            console.dir(today);

            //Convert Deg C <-> Deg F
            document.querySelector('#switchUnits').addEventListener('click',function(){
              if(temp === tempC){
                temp = tempF;
                units = '°F'
              }else{
                temp = tempC;
                units = '°C'
              }
              document.querySelector('#wx').textContent = sky + ". Temp = " + temp + units;
            });

        },
        error: function(xhr, status, errorThrown) {
          console.log("There has been an error connecting to OpenWeather API");
        }
      });

      //Forecast Weather

      $.ajax(
        {
        url: wxForecastLatLonUrl,
        dataType : "json",
        type: "GET",

        success: function(fc) {
          var forecast = {}
          for(var i=0; i<=4; i++){
            var day = "#fc"+(i+1);
            document.querySelector(day).textContent = fc.list[i].weather[0].description;
          };
          console.log(forecast);
          console.dir(fc);

        },
        error: function(xhr, status, errorThrown) {
          console.log("There has been an error connecting to OpenWeather API");
        }
      });

  },
  error: function(xhr, status, errorThrown) {
    console.log("There has been an error getting the users location");
  }
});

});
