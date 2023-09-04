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


document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function() {
    const circleOne = document.querySelector(".circle.one");
    const circleTwo = document.querySelector(".circle.two");
    const notifBuble = document.querySelector(".notify-bubble");
    
    if (circleOne) {
      circleOne.style.display = "none";
    }

    if (circleTwo) {
      circleTwo.style.display = "none";
    }

    if (notifBuble) {
      notifBuble.style.display = "none";
    }
  }, 3000);
});