// Flow:
//
//   1) Get Location (in object "location")
//   2) Get Today's weather (in object "today")
//   3) Get Forecasted weather (in object "forecast")
//
//   Nest all of the above so all three objects are available simultaneously

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
      //Get forecast Weather
            $.ajax(
              {
              url: wxForecastLatLonUrl,
              dataType : "json",
              type: "GET",
              success: function(forecast) {

// All of above simply to get location, today's weather and forecast Weather
// Programming of App Functionality Begins Below

            //today's weather
                var tempC = Math.round(today.main.temp - 273.15);
                var tempF = Math.round(tempC*9/5 + 32);
                var sky = today.weather[0].description.toUpperCase();
                var temp = tempF;
                var units = '°F';
                document.querySelector('#city').textContent = "Todays weather for "+location.city;
                document.querySelector('#wx').textContent = sky + ".  Current Temperature is " + temp + units;

                //Convert Deg C <-> Deg F
                document.querySelector('#switchUnits').addEventListener('click',function(){
                  if(temp === tempC){
                    temp = tempF;
                    units = '°F'
                  }else{
                    temp = tempC;
                    units = '°C'
                  }
                  document.querySelector('#wx').textContent = sky + ".  Current Temperature is " + temp + units;
                });

            // Forecast Weather
                 for(var i=0; i<=4; i++){
                  var day = "#fc"+(i+1);
                  document.querySelector(day).textContent = forecast.list[i].weather[0].description;
                };
                console.dir(forecast);
                console.dir(today);
                console.dir(location);

              },  //End of "success" for Forecast Weather
              error: function(xhr, status, errorThrown) {
                console.log("There has been an error getting Forecast weather from OpenWeather API");
              }
            });
        },  //end of "success" for Today's Weather
        error: function(xhr, status, errorThrown) {
          console.log("There has been an error getting Today's weather from OpenWeather API");
        }
      });
  },  //End of "success" for location API
  error: function(xhr, status, errorThrown) {
    console.log("There has been an error getting the users location from the IP-API");
  }
});
});
