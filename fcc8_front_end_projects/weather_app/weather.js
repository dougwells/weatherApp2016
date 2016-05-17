// Flow of Program:
//
//   1) Get Location (in object "location")
//   2) Get Today's weather (in object "today")
//   3) Get Forecasted weather (in object "forecast")
//
//   Nest all of the above so all three objects are available simultaneously

$(document).ready(function() {
  var wxAPI = "APPID=094c7cfda5c9b5993192ea76c73f8d41";


//Get user's location (latitude & longitude)
$.ajax(
  {
  url: "http://ip-api.com/json",
  dataType : "json",
  type: "GET",

  success: function(location) {
    $.ajax({ url:'http://maps.googleapis.com/maps/api/geocode/json?latlng='+location.lat+','+location.lon+'&sensor=true',
         success: function(data){
            console.dir(data);
             var city = data.results[0].address_components[2].long_name;
             var state = data.results[4].address_components[0].short_name;
             var country = data.results[4].address_components[1].short_name;
             console.log(city, state, country);

    //Grab name of city from user's IP location
    //Set location variables needed to make API call to OpenWeather
    var cityUrl = city.toLowerCase().replace(/\s+/g, '')+","+country;
    var wxTodayLatLonUrl = "http://api.openweathermap.org/data/2.5/weather?lat="+location.lat+"&lon="+location.lon+"&"+wxAPI;
    var wxTodayCityUrl = "http://api.openweathermap.org/data/2.5/weather?q="+cityUrl+"&"+wxAPI;
    var wxForecastLatLonUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?lat="+location.lat+"&lon="+location.lon+"&"+wxAPI;
    var wxForecastCityUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+city+"&"+wxAPI;
    console.log(wxTodayCityUrl);
    console.log(wxForecastLatLonUrl);




    // Get Todays Weather from OpenWeather API
      $.ajax(
        {
        url: wxTodayCityUrl,
        dataType : "json",
        type: "GET",

        success: function(today) {
      //Get forecast Weather from OpenWeather API
            $.ajax(
              {
              url: wxForecastCityUrl,
              dataType : "json",
              type: "GET",
              success: function(forecast) {

// All of above simply to get the objects: location, today and forecast
// Programming of App Functionality Begins Below


      // Get Weather Data & Name of Days of Week from Today
        var wx = getWeather();

      //Show Today's Weather & Set Units
            var units = '°F';
            var celsius = false;
            showToday(wx.tempFMin);

      //Set app's background color
        setBackgroundColor();

      //Show Forecast
        showForecast(wx.tempFMin, wx.tempFMax);

      //On-Click:  Convert Deg C <-> Deg F
        document.querySelector('#switchUnits').addEventListener('click',function(){
          if(celsius){
            switchToFahrenheit();
            celsius = false;
          }else{
            switchtoCelsius();
            celsius = true;
          }
        });

      // Functions used in the program

        function getWeather(){
          var wx ={}
          //Today's sky conditions

          //Build temperatures & wx icon arrays
            //today
              wx.tempKMin =[];
              wx.tempKMax =[];
              wx.icon = [];
              wx.sky = [];

              wx.tempKMin.push(today.main.temp);
              wx.tempKMax.push(today.main.temp);
              wx.icon.push("http://openweathermap.org/img/w/"+today.weather[0].icon+".png");
              wx.sky.push(toTitleCase(today.weather[0].description));


              //forecast
              forecast.list.map(function(fc){
                wx.tempKMin.push(fc.temp.min);
                wx.tempKMax.push(fc.temp.max);
                wx.icon.push("http://openweathermap.org/img/w/" +fc.weather[0].icon +".png");
                wx.sky.push(toTitleCase(fc.weather[0].description));
              });

              wx.tempCMin = wx.tempKMin.map(kToC);
              wx.tempCMax = wx.tempKMax.map(kToC);
              wx.tempFMin = wx.tempKMin.map(kToF);
              wx.tempFMax = wx.tempKMax.map(kToF);
              wx.week = getWeek();
          //End Temperature Arrays
          return wx;
                }

          function getWeek (){
            var standardWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            var date = new Date();
            var day = date.getDay();
            var week = standardWeek.slice(day, day+7);
            return week;
          }

          function setBackgroundColor(){
            sunny = today.weather[0].icon.includes("01") || today.weather[0].icon.includes("02")
            if(sunny){
              document.querySelector('body').style["background-color"] = "#3F51B5";
            }
          }


          function switchToFahrenheit(sky){
            var tempMin = wx.tempFMin;
            var tempMax = wx.tempFMax;
            units = '°F'
            showToday(tempMin);
            showForecast(tempMin, tempMax);

          }

          function switchtoCelsius(){
            var tempMin = wx.tempCMin;
            var tempMax = wx.tempCMax;
            units = '°C'
            showToday(tempMin);
            showForecast(tempMin, tempMax);

          }

            function showToday(tempMin){
              document.querySelector('#city').textContent = city +", "+state;
              document.querySelector("#currentIcon").setAttribute("src",wx.icon[0]);
              document.querySelector('#currentWx').textContent = wx.sky[0]+".  Currently " + tempMin[0] +" "+ units;
            }

          function showForecast(tempMin, tempMax){
             for(var i=1; i<=5; i++){
              var icon = "#wx"+(i);
              var day = "#day"+(i);
              var fcDay = "#fc"+(i);
              var lowTemp = "#lt"+(i);
              var highTemp = "#ht"+(i);
              document.querySelector(icon).setAttribute("src",wx.icon[i]);
              document.querySelector(day).textContent = wx.week[i].substring(0, 3);
              document.querySelector(fcDay).textContent = wx.sky[i];
              document.querySelector(lowTemp).textContent = tempMin[i] +" " + units;
              document.querySelector(highTemp).textContent = tempMax[i] +" " + units;
            };
          }

          function kToC(temp){
            return Math.round(Math.round(temp-273.15));
          }

          function kToF(temp){
              return Math.round(32+(temp-273.15)*9/5);
            }

          // function iconToUrl (iconId)
          //     return "http://openweathermap.org/img/w/" + iconId + ".png";

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

    } //End of success for Google Maps API
  });

  },  //End of "success" for location API
  error: function(xhr, status, errorThrown) {
    console.log("There has been an error getting the users location from the IP-API");
  }
});


});
