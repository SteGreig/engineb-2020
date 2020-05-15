function GlobalSetCookie(cname, cvalue, exdays) {
	"use strict";
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


// Cookie notice
if (localStorage.getItem("cookies") === null) {
  $('.cookie-notice').show();
} else {
	$('.cookie-notice').hide();
}
$('.cookie-notice-accept').click(function() {
	$('.cookie-notice').hide();
	localStorage.setItem('cookies', 'accepted');
});


// Hero Scroll Arrow
$(".scroll-arrow").click(function() {
	$("html, body").animate({
	scrollTop: $("#about-us").offset().top
	}, 650);
});


// Persona Module Read More
$('.persona-content__more').click(function() {
	$(this).next().show();
	$(this).next().next().show();
	$(this).hide();
});

$('.persona-content__less').click(function() {
	$(this).prev().hide();
	$(this).prev().prev().show();
	$(this).hide();
});


// Amend logo colour on purple/pink/teal sections
function logoColour() {
	if($('.section.theme--grey').length > 0) {
		var top_of_element = $('.section.theme--grey').offset().top;
		var bottom_of_element = $('.section.theme--grey').offset().top + $('.section.theme--grey').outerHeight();
	} else {
		var top_of_element = 0;
		var bottom_of_element = 0;
	}
	if($('.section.theme--alternative').length > 0) {
		var top_of_element2 = $('.section.theme--alternative').offset().top;
		var bottom_of_element2 = $('.section.theme--alternative').offset().top + $('.section.theme--alternative').outerHeight();
	} else {
		var top_of_element2 = 0;
		var bottom_of_element2 = 0;
	}
	if($('.section.theme--white').length > 0) {
		var top_of_element3 = $('.section.theme--white').offset().top;
		var bottom_of_element3 = $('.section.theme--white').offset().top + $('.section.theme--white').outerHeight();
	} else {
		var top_of_element3 = 0;
		var bottom_of_element3 = 0;
	}
	if($('.section.theme--blue').length > 0) {
		var top_of_element4 = $('.section.theme--blue').offset().top;
		var bottom_of_element4 = $('.section.theme--blue').offset().top + $('.section.theme--blue').outerHeight();
	} else {
		var top_of_element4 = 0;
		var bottom_of_element4 = 0;
	}

	var top_of_screen = $(window).scrollTop() + 10;

	if ((top_of_screen >= top_of_element) && (top_of_screen <= bottom_of_element) || (top_of_screen >= top_of_element2) && (top_of_screen <= bottom_of_element2) || (top_of_screen >= top_of_element3) && (top_of_screen <= bottom_of_element3) || (top_of_screen >= top_of_element4) && (top_of_screen <= bottom_of_element4)){
		$('.site-logo__img--main').css('opacity','1');
	} else {
		$('.site-logo__img--main').css('opacity','0');
	}
}

$(window).scroll(function() {
	logoColour();
});
$('.section').hover(function() {
	logoColour();
});

// Amend nav colours on white/grey sections
function navColour() {
	if($('.section.theme--grey').length > 0) {
		var top_of_element = $('.section.theme--grey').offset().top;
		var bottom_of_element = $('.section.theme--grey').offset().top + $('.section.theme--grey').outerHeight();
	} else {
		var top_of_element = 0;
		var bottom_of_element = 0;
	}
	if($('.section.theme--alternative').length > 0) {
		var top_of_element2 = $('.section.theme--alternative').offset().top;
		var bottom_of_element2 = $('.section.theme--alternative').offset().top + $('.section.theme--alternative').outerHeight();
	} else {
		var top_of_element2 = 0;
		var bottom_of_element2 = 0;
	}
	if($('.section.theme--white').length > 0) {
		var top_of_element3 = $('.section.theme--white').offset().top;
		var bottom_of_element3 = $('.section.theme--white').offset().top + $('.section.theme--white').outerHeight();
	} else {
		var top_of_element3 = 0;
		var bottom_of_element3 = 0;
	}

	//var top_of_screen = $(window).scrollTop();
	var top_of_screen = $(window).scrollTop() + 10;

	if (top_of_screen !== 0 && (top_of_screen >= top_of_element) && (top_of_screen <= bottom_of_element) || (top_of_screen >= top_of_element2) && (top_of_screen <= bottom_of_element2) || (top_of_screen >= top_of_element3) && (top_of_screen <= bottom_of_element3)){
		$('.header').addClass('dark');
	} else {
		$('.header').removeClass('dark');
	}
}

$(window).scroll(function() {
	navColour();
});
$('.section').hover(function() {
	navColour();
});