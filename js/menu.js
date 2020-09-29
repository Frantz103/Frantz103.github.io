$(document).ready(function() {
  var $menu = $('.menu');

  $menu.on('click', function(){

   $('.nav').toggleClass('menu-open');

   $(".nav").css({
    "background-color": "#cb9280", 
    "height":"100%", "z-index":"9999", 
    "position":"fixed", "top":"0"
   });

   $('.closed-box').remove('.menu');

  });

});