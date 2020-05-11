// --------------------------------------------------------------------------------------------------
// Scroll to Section Menu
// --------------------------------------------------------------------------------------------------

$('.sp a[href*="/#"]').click(function() {

    event.preventDefault();

    var url = $(this).attr('href');

    var link = url.substring(url.lastIndexOf('#') + 1);

    $("html, body").animate({
        scrollTop: $('#'+link).offset().top
    }, 650);

});


var sections = $('.section').length;

console.log(sections);

for (var i=1; i<=sections; i++) {
    (function(i){
        $(window).scroll(function() {
            var top_of_element = $('.section:nth-child('+i+')').offset().top;
            var bottom_of_element = $('.section:nth-child('+i+')').offset().top + $('.section:nth-child('+i+')').outerHeight();
            var bottom_of_screen = $(window).scrollTop() + ($(window).innerHeight() / 3);
            var top_of_screen = $(window).scrollTop();

            var sectionID = $('.section:nth-child('+i+')').attr('id');

            if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)){
                $('.main-menu a').removeClass('active');
                $('.main-menu a[href*="#'+sectionID+'"]').addClass('active');
            } else {
                $('.main-menu a[href*="#'+sectionID+'"]').removeClass('active');
            }
        });
    })(i);
}