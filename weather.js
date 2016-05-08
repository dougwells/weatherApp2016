

// weather api
$(document).ready(function() {
  console.log ("All Systems go!");
  
  $.ajax({
    
    url: "https://api.openweathermap.org/data/2.5/weather?q=sandiego,usa&APPID=094c7cfda5c9b5993192ea76c73f8d41",
    dataType : "json",
    type: "GET", 

    success: function(json) {
        var temp = Math.round(json.main.temp - 273.15);
        console.log(temp);
    },
    error: function(xhr, status, errorThrown) {
      //do something if there was an error. Right now it will just show the default values in the html
    }
  });
  

  
});