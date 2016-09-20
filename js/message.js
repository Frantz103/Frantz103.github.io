$(document).ready(function() {


$('body').append(
  "<div class='notice'> \
  <i class='fa fa-times' id='popup'></i> \
  <p>This portfolio is under contruction.<br> Please check back later</p> \
  </div>"
  );

$('#popup').css({
  "color":"white", "float":"right", "margin":"10px", "cursor": "pointer"
});

var $popup = $('#popup');
$popup.on('click', function(){
  $('.notice').remove();
});

setTimeout(function() {
  $('.notice').remove();
}, 12000)

});