$(document).ready(function() {
  var $menu = $('.menu');

  $menu.on('click', function(){
   $('.nav').toggleClass('menu-open');
     $(".nav").css({"background-color": "white", "width":"100%"});

  });

});

