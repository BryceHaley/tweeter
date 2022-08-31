$(document).ready(function() {
  $('#tweet-text').keyup(function() {
    $('#counter').text(140 - this.value.length);
    if (this.value.length > 140) {
      $('#counter').addClass('negative');
    } else {
      $("#counter").removeClass('negative');
    }
  });
});