$(window).scroll(function(){
    if($('.navbar').offset().top > 50){
        $('.navbar-fixed-top').addClass('top-nav-collapse');
    } else {
        $('.navbar-fixed-top').removeClass('top-nav-collapse');
    }
    $('#navbar li a').blur();
});



$(document).ready(function () {
  //hide hamburger menu once clicked ...
  $(".navbar-nav li a").click(function(event) {
    $(".navbar-collapse").collapse('hide');
  });

  //Gives HTML page a "scrolling" effect when click on link in SPA.  "Scrolls" down.
  //Must include following line in HTML file for following jquery code to work
  //<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
  $(function(){
      $('.page-scroll a').bind('click', function(){
          var $anchor = $(this);
          $('html, body').stop().animate({
              scrollTop: $($anchor.attr('href')).offset().top
          }, 1500,'easeInOutExpo');
          event.preventDefault();
      });
  });
});
