$(document).ready(function() {
  var $menu = $('.menu');

  $menu.on('click', function(){

   $('.nav').toggleClass('menu-open');
   $(".nav").css({"background-color": "black", "height":"100%", "z-index":"9999", "position":"absolute", "top":"0"});
   $('.closed-box').remove('menu-open');

  });

});

