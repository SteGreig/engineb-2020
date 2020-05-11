
$('.modal-trigger').click(function() {
  $(this).parents('.section').find('.modal-tray').addClass('active');
});

$('.modal-tray__close').click(function() {
  $('.modal-tray').removeClass('active');
});