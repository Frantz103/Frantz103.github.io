$(document).ready(function() {
  var $menu = $('.menu');

  $menu.on('click', function(){
   $('.nav').toggleClass('menu-open');
   $(".nav").css({"background-color": "white", "height":"100%", "z-index":"9999", "position":"absolute", "top":"0"});

  });

});

