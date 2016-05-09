$(document).ready(function() {
  console.log ("All Systems go!");

  $.ajax({

    url: "http://api.openweathermap.org/data/2.5/weather?q=sandiego,usa&APPID=094c7cfda5c9b5993192ea76c73f8d41",
    dataType : "json",
    type: "GET",

    success: function(json) {
        var tempC = Math.round(json.main.temp - 273.15);
        var tempF = Math.round(tempC*9/5 + 32);
        var temp = tempF;
        var city = json.name;
        var sky = json.weather[0].description.toUpperCase();
        document.querySelector('#city').textContent = "Todays weather for "+city;
        document.querySelector('#wx').textContent = sky + ". Temp = " + temp + " DEG F.";
        console.dir(json);
    },
    error: function(xhr, status, errorThrown) {
      console.log("There has been an error connecting to OpenWeather API");
    }
  });
});
