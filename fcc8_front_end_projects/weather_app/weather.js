// Flow of Program:
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
    //Grab name of city from user's IP location
    //Set location variables needed to make API call to OpenWeather
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

// All of above simply to get objects: location, today and forecast
// Programming of App Functionality Begins Below
        // Get Weather Data

            //Build arrays with temperatures
              var tempKMin =[];
                tempKMin.push(today.main.temp);
                forecast.list.map(function(fc){
                  tempKMin.push(fc.temp.min);
                });

                var tempKMax =[];
                  tempKMax.push(today.main.temp);
                  forecast.list.map(function(fc){
                    tempKMax.push(fc.temp.max);
                  });

                var tempCMin = tempKMin.map(kToC);
                var tempCMax = tempKMax.map(kToC);
                var tempFMin = tempKMin.map(kToF);
                var tempFMax = tempKMax.map(kToF);
            //End Temperature Arrays

            //Show Today's Weather
                var sky = toTitleCase(today.weather[0].description);
                var celsius = false;
                var units = '°F';
                document.querySelector('#city').textContent = location.city;
                document.querySelector('#wx').textContent = sky + ". Currently " + tempFMin[0] + units;

            //Show Forecast
                showForecast(tempFMin, tempFMax);

            //Convert Deg C <-> Deg F
              document.querySelector('#switchUnits').addEventListener('click',function(){
                if(celsius){
                  switchToFahrenheit();
                }else{
                  switchtoCelsius();
                }
              });
                console.dir(forecast);
                console.dir(today);
                console.dir(location);

          // Functions used in the program

                function switchToFahrenheit(){
                  tempMin = tempFMin;
                  tempMax = tempFMax;
                  units = '°F'
                  celsius = false;
                  showForecast(tempMin, tempMax);
                  document.querySelector('#wx').textContent = sky + ".  Currently " + tempMin[0] + units;

                }

                function switchtoCelsius(){
                  tempMin = tempCMin;
                  tempMax = tempCMax;
                  units = '°C'
                  celsius = true;
                  showForecast(tempMin, tempMax);
                  document.querySelector('#wx').textContent = sky + ".  Currently " + tempMin[0] + units;

                }

                function showForecast(tempMin, tempMax){
                   for(var i=0; i<=4; i++){
                    var day = "#fc"+(i+1);
                    var lowTemp = "#lt"+(i+1);
                    var highTemp = "#ht"+(i+1);
                    document.querySelector(day).textContent = forecast.list[i].weather[0].description;
                    document.querySelector(lowTemp).textContent = tempMin[i+1] + units;
                    document.querySelector(highTemp).textContent = tempMax[i+1] + units;
                  };
                }

                function kToC(temp){
                  return Math.round(Math.round(temp-273.15));
                }

                function kToF(temp){
                    return Math.round(32+(temp-273.15)*9/5);
                  }

                function toTitleCase(str){
                  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
                }


// ERROR Notices if API calls did not work

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
