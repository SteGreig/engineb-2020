function GlobalSetCookie(cname, cvalue, exdays) {
	"use strict";
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}



// Hero Scroll Arrow
$(".scroll-arrow").click(function() {
	$("html, body").animate({
	scrollTop: $("#section-2").offset().top
	}, 650);
});