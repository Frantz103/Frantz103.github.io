$(document).ready(function() {

 

  $('body').append(
  "<div class='notice'> \
  <i class='fa fa-times' id='popup'></i> \
  <p>This portfolio is under contruction.<br> \
  <a href='http://lefrantz.weebly.com'> \
   Please click here to visit my past portfolio</p> \
  </div>"
  );

  $('#popup').css({
    "color":"white", 
    "float":"right", 
    "margin":"20px",
    "cursor": "pointer"
  });

  var $popup = $('#popup');
  $popup.on('click', function(){
  $('.notice').remove();
  });

$( window ).unload(function() {

  setTimeout(function() {
  $('.notice').remove();
  }, 12000)

 });

})
