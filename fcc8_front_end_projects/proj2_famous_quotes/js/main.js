$(document).ready(function() {

  //Download new quote & image URL from json datafile stored in my dropbox
  //Replaces existing quote and image on webpage
  $("#newQuote").click(function(){
    $.ajax({
      url: 'https://dl.dropboxusercontent.com/s/p5zx9nv7qpyexnc/quotes.json',
      dataType: 'json',
      success: function(data) {
        var i = Math.floor(Math.random() * (data.length));
        var quote = data[i].quote;
        var author = data[i].author;
        var imageUrl = data[i].imageUrl;
        var imageColor = data[i].imageColor;
        var twitterPost = "Love this quote by "+author+": '"+quote+"'";
        var twitterPost140 = twitterPost.length > 140 ? twitterPost.substring(0,137)+"..." : twitterPost;
        var quoteURI = encodeURI(twitterPost140);
        var twitterQueryString = "https://twitter.com/intent/tweet?text="+quoteURI;
        $('#quote').text("'"+quote+"'");
        $('#quote-image').attr("src", imageUrl);
        $('#author').text('Author: '+author);
        $("#shareTwitter").attr("href", twitterQueryString);
        console.log(twitterPost);
        console.log(twitterQueryString);
        console.log(twitterPost140);
        console.log(twitterPost140.length);
      },
      error: function(err) {
        var quote = "This app is shit!  You have an error. Error Message: "+ err;
        var author = "Steve Jobs"
        var imageUrl = "https://dl.dropboxusercontent.com/s/5ris4qilrskw5mr/sucks.jpg"
        $("#quote").text("'"+quote+"'");
        $('#quote-image').attr("src", imageUrl);
        $('#author').text('Author: '+author);
        console.log(quote);
      }
    });
  });
});
