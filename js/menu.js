$(document).ready(function() {
  var $menu = $('.menu');

  $menu.on('click', function(){

    $(".menu-open").css({"background-color": "white"});
    $(this).toggleClass('menu-open');

  });

});

