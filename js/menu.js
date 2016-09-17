$(document).ready(function() {
  var $menu = $('.menu');

  $menu.on('click', function(){
    $(this).toggleClass('menu-open');
  });

});