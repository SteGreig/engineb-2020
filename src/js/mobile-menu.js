// --------------------------------------------------------------------------------------------------
// Mobile Navigation
// @author Stephen Greig
// --------------------------------------------------------------------------------------------------

$('.mob-nav').show();
        
// Copy primary and secondary menus to .mob-nav element
var mobNav = document.querySelector('.mob-nav .scroll-container');

if($('.desktop-nav .main-menu').length > 0) {
    var copyPrimaryMenu = document.querySelector('.desktop-nav .main-menu').cloneNode(true);
    mobNav.appendChild(copyPrimaryMenu);
}

// Show underlay and fix the body scroll when menu button is clicked
$('.mob-nav-toggle').click(function() {
    $('.mob-nav').toggleClass('active');
    $('body').toggleClass('fixed');
    $(this).find('img').toggle();
    $('.site-logo__img--main').toggleClass('hide');
});