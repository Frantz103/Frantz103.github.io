$(document).ready(function() {


$('body').append(
  "<div class='notice'>
  <p>This portfolio is under contruction.
  <br> Please check back Later</p></div>"
  );
setTimeout(function() {
  $('.notice').remove();
}, 10000)

});