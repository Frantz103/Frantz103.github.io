$(document).ready(function() {


$('body').append(
  "<div class='notice'> \
  <i class='fa fa-times'></i> \
  <p>This portfolio is under contruction.<br> Please check back later</p> \
  </div>"
  );

$('i').css({
"background-color":"white"
});

setTimeout(function() {
  $('.notice').remove();
}, 10000)

});