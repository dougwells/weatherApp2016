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

    // Todays Weather
      $.ajax(
        {
        url: wxTodayLatLonUrl,
        dataType : "json",
        type: "GET",

        success: function(today) {
            var tempC = Math.round(today.main.temp - 273.15);
            var tempF = Math.round(tempC*9/5 + 32);
            var temp = tempF;
            var sky = today.weather[0].description.toUpperCase();
            document.querySelector('#city').textContent = "Todays weather for "+location.city;
            document.querySelector('#wx').textContent = sky + ". Temp = " + temp + " DEG F.";
            console.dir(today);
        },
        error: function(xhr, status, errorThrown) {
          console.log("There has been an error connecting to OpenWeather API");
        }
      });

      //Forecast Weather

      $.ajax(
        {
        url: "http://api.openweathermap.org/data/2.5/forecast/daily?q=sandiego,usa&cnt=5&APPID=094c7cfda5c9b5993192ea76c73f8d41",
        dataType : "json",
        type: "GET",

        success: function(fc) {
          var forecast = {}
          for(var i=0; i<fc.list.length; i++){
              forecast[i] = {
              description: fc.list[i].weather[0].description
            };

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
