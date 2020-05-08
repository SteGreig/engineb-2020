function GlobalSetCookie(cname, cvalue, exdays) {
	"use strict";
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//https://css-tricks.com/snippets/jquery/simple-jquery-accordion/
(function ($) {

	var allPanels = $('.accordion > dd').hide();

	$('.accordion > dt > a').click(function () {
		allPanels.slideUp();
		$(this).parent().next().slideDown();
		return false;
	});

})(jQuery);

/*
	@author Rob Watson
	@name GDPR Setup

	GDPR
	----
	setting up the GDPR vars
*/
var $euCookieBar,
	$euCookieBarActive,
	$btnDeclineEuCookieBar,
	btnAcceptEuCookieBar,
	COOKIE_DECLINE,
	COOKIE_DECLINE_VALUE,
	COOKIE_ACCEPT,
	COOKIE_ACCEPT_VALUE,
	CLASS_ACTIVE,
	DEBUG_GDPR;

$euCookieBar = $('.section--gdpr');
$euCookieBarActive = $('.section--gdpr--active');
$btnDeclineEuCookieBar = $('.section--gdpr .btn--decline');
$btnAcceptEuCookieBar = $('.section--gdpr .btn--accept');
COOKIE_EXPIRE_DAYS = 1;
COOKIE_DECLINE = 'mf_eu_cookie_decline';
COOKIE_DECLINE_VALUE = 'declined';
COOKIE_ACCEPT = 'mf_eu_cookie_accept';
COOKIE_ACCEPT_VALUE = 'accepted';
CLASS_ACTIVE = 'section--gdpr--active';
DEBUG_GDPR = false;


/*
	- window.load()
	-- We need to check here if the user had previously accepted or declined the cookie.

	---	Check: Decline
			--------------
			If user has previoously declined the cookie we update it to expire in 24 hours

	---	Check: Accept
			--------------
			If user has previoously declined the cookie we update it to expire in 24 hours

	---	Default Action
			--------------
			If user has previoously neither declined or accepted, or the cookie has expired we add the acive class (CLASS_ACTIVE) to display the GDPR message

*/
$(window).load(function () {
	/* Check if decline cookie exists  */
	if (Cookies.get(COOKIE_DECLINE) === COOKIE_DECLINE_VALUE) {

		if (DEBUG_GDPR === true) {
			console.log('GDPR: PAGE LOAD - USER PREVIOUSLY DECLINED');
		}
		/*  set decline cookie to declined */
		Cookies.set(COOKIE_DECLINE, COOKIE_DECLINE_VALUE, {
			expires: COOKIE_EXPIRE_DAYS
		});
		if (DEBUG_GDPR === true) {
			console.log('GDPR: PAGE LOAD (CHECK) - DECLINE COOKIE IS SET TO: DECLINED');
		}

		/* Set accept cookie to declined */
		Cookies.set(COOKIE_ACCEPT, COOKIE_DECLINE_VALUE, {
			expires: COOKIE_EXPIRE_DAYS
		});
		if (DEBUG_GDPR === true) {
			console.log('GDPR: PAGE LOAD (CHECK) - ACCEPT COOKIE IS SET TO: DECLINED');
		}

	} else if (Cookies.get(COOKIE_ACCEPT) === COOKIE_ACCEPT_VALUE) {

		if (DEBUG_GDPR === true) {
			console.log('GDPR: PAGE LOAD - USER PREVIOUSLY ACCEPTED');
		}
		/* if accept cookie exists, set it to accepted */
		Cookies.set(COOKIE_ACCEPT, COOKIE_ACCEPT_VALUE, {
			expires: COOKIE_EXPIRE_DAYS
		});
		if (DEBUG_GDPR === true) {
			console.log('GDPR: PAGE LOAD (CHECK) - ACCEPT COOKIE IS SET TO: ACCEPTED');
		}
		/* set decline cookie to accepted */

		Cookies.set(COOKIE_DECLINE, COOKIE_ACCEPT_VALUE, {
			expires: COOKIE_EXPIRE_DAYS
		});
		if (DEBUG_GDPR === true) {
			console.log('GDPR: PAGE LOAD (CHECK) - DECLINE COOKIE IS SET TO: ACCEPTED');
		}

	} else {

		if (DEBUG_GDPR === true) {
			console.log('GDPR: PAGE LOAD (CHECK) - NEW USER OR NO COOKIES ARE SET');
		}
		/* Neither cookie exisit so show GDPR alert */
		$($euCookieBar).fadeIn('slow').addClass(CLASS_ACTIVE).attr('role', 'alert');

	}
});
/*
	- document.ready()
	-- Here we set the cookies when the user clicks either accept or decline

	---	Event: Click: Decline
			--------------------
			If user clicks declined we set the cookie COOKIE_DECLINE to COOKIE_DECLINE_VALUE with an expiry time of 24 hours

	---	Event: Click: Accept
			--------------------
			If user clicks accept we set the cookie COOKIE_ACTIVE to COOKIE_ACTIVE_VALUE with an expiry time of 24 hours

*/
$(document).ready(function () {

	$($btnDeclineEuCookieBar).on('click', function () {

		$($euCookieBar).fadeOut('slow').removeClass(CLASS_ACTIVE).removeAttr('role');

		Cookies.set(COOKIE_DECLINE, COOKIE_DECLINE_VALUE, {
			expires: COOKIE_EXPIRE_DAYS
		});
		if (DEBUG_GDPR === true) {
			console.log('GDPR: CLICK - DECLINE COOKIE IS SET TO DECLINED');
		}

		Cookies.set(COOKIE_ACCEPT, COOKIE_DECLINE_VALUE, {
			expires: COOKIE_EXPIRE_DAYS
		});
		if (DEBUG_GDPR === true) {
			console.log('GDPR: CLICK - ACCEPT COOKIE IS SET TO DECLINED');
		}

	});

	$($btnAcceptEuCookieBar).on('click', function () {

		$($euCookieBar).fadeOut('slow').removeClass(CLASS_ACTIVE).removeAttr('role');

		Cookies.set(COOKIE_ACCEPT, COOKIE_ACCEPT_VALUE, {
			expires: COOKIE_EXPIRE_DAYS
		});
		if (DEBUG_GDPR === true) {
			console.log('GDPR: CLICK - ACCEPT COOKIE IS SET TO ACCEPT');
		}

		Cookies.set(COOKIE_DECLINE, COOKIE_ACCEPT_VALUE, {
			expires: COOKIE_EXPIRE_DAYS
		});
		if (DEBUG_GDPR === true) {
			console.log('GDPR: CLICK - DECLINE COOKIE IS SET TO ACCEPT');
		}

	});

});

(function ($) {
	function new_map($el) {
		var $markers = $el.find('.marker');
		var args = {
			zoom: 16,
			center: new google.maps.LatLng(0, 0),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map($el[0], args);
		map.markers = [];
		$markers.each(function () {
			add_marker($(this), map);
		});
		center_map(map);
		return map;
	}

	function add_marker($marker, map) {
		var latlng = new google.maps.LatLng($marker.attr('data-lat'), $marker.attr('data-lng'));
		var marker = new google.maps.Marker({
			position: latlng,
			map: map
		});
		map.markers.push(marker);
		if ($marker.html()) {
			var infowindow = new google.maps.InfoWindow({
				content: $marker.html()
			});
			google.maps.event.addListener(marker, 'click', function () {
				infowindow.open(map, marker);
			});
		}
	}
	function center_map(map) {
		var bounds = new google.maps.LatLngBounds();
		$.each(map.markers, function (i, marker) {
			var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
			bounds.extend(latlng);
		});
		if (map.markers.length == 1) {
			map.setCenter(bounds.getCenter());
			map.setZoom(16);
		} else {
			map.fitBounds(bounds);
		}
	}
	var map = null;
	$(document).ready(function () {
		$('.container--map').each(function () {
			map = new_map($(this));
		});
	});
})(jQuery);
