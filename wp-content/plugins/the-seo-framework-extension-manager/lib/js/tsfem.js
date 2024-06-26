/**
 * This file holds The SEO Framework Extension Manager plugin's JS code.
 * Serve JavaScript as an addition, not as an ends or means.
 *
 * @author Sybre Waaijer <https://cyberwire.nl/>
 * @link <https://theseoframework.com/extension-manager/>
 */

/**
 * The SEO Framework - Extension Manager plugin
 * Copyright (C) 2016-2019 Sybre Waaijer, CyberWire (https://cyberwire.nl/)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published
 * by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

/**
 * Holds tsfem values in an object to avoid polluting global namespace.
 *
 * @since 1.0.0
 *
 * @constructor
 */
window.tsfem = {

	/**
	 * @since 1.0.0
	 * @access private
	 * @type {string|null} nonce Ajax nonce
	 */
	nonce : tsfemL10n.nonce,

	/**
	 * @since 1.0.0
	 * @access private
	 * @param {object|null} i18n Localized strings
	 */
	i18n : tsfemL10n.i18n,

	/**
	 * @since 1.0.0
	 * @since 1.3.0 Now public.
	 * @access public
	 * @param {boolean|undefined|null} rtl RTL enabled
	 */
	rtl : tsfemL10n.rtl,

	/**
	 * @since 1.0.0
	 * @since 1.3.0 Now public.
	 * @access public
	 * @param {boolean|undefined|null} debug Debugging enabled
	 */
	debug : tsfemL10n.debug,

	/**
	 * @since 1.0.0
	 * @since 1.3.0 Now public.
	 * @access public
	 * @param {boolean} touchBuffer Maintains touch-buffer
	 */
	touchBuffer : false,

	/**
	 * @since 1.3.0
	 * @access private
	 * @param {boolean} noticeBuffer Maintains notice loader buffer
	 */
	noticeBuffer : false,

	/**
	 * @since 1.3.0
	 * @access private
	 * @param {boolean} navWarn Whether to warn the user on navigation.
	 */
	navWarn : false,

	/**
	 * Sets touch buffer to set ms. After which it resets.
	 *
	 * @since 1.0.0
	 * @since 1.3.0 Now public.
	 * @access public
	 *
	 * @function
	 * @param {number} ms The touch buffer in miliseconds.
	 * @return {undefined}
	 */
	setTouchBuffer: function( ms ) {

		tsfem.touchBuffer = true;

		setTimeout( () => {
			tsfem.touchBuffer = false;
		}, ms );
	},

	/**
	 * Visualizes AJAX loading time through target class change.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @function
	 * @param {(jQuery.element|Element|string)} arg1
	 * @return {undefined}
	 */
	setAjaxLoader: function( target ) {
		jQuery( target ).toggleClass( 'tsfem-loading' );
	},

	/**
	 * Adjusts class loaders on Ajax response.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @function
	 * @param {(jQuery.element|Element|string)} arg1
	 * @param {number} success
	 * @param {string} notice
	 * @param {number} html
	 * @return {undefined}
	 */
	unsetAjaxLoader: function( target, success, notice, html ) {

		let newclass = 'tsfem-success',
			fade = 2500;

		if ( ! success ) {
			newclass = 'tsfem-error';
			fade = html ? 20000 : 10000;
		} else if ( 2 === success ) {
			newclass = 'tsfem-unknown';
			fade = 7500;
		}

		//* Slow down if there's a notice.
		fade = notice ? fade * 2 : fade;

		if ( html ) {
			jQuery( target ).removeClass( 'tsfem-loading' ).addClass( newclass ).html( notice ).fadeOut( fade );
		} else {
			notice = jQuery( '<span/>' ).html( notice ).text();
			jQuery( target ).removeClass( 'tsfem-loading' ).addClass( newclass ).text( notice ).fadeOut( fade );
		}
	},

	/**
	 * Cleans and resets Ajax wrapper class and contents to default.
	 * Also stops any animation and resets fadeout to beginning.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @function
	 * @param {(jQuery.element|Element|string)} arg1
	 * @return {undefined}
	 */
	resetAjaxLoader: function( target ) {
		//* Reset CSS, with IE compat.
		jQuery( target ).stop().empty().prop( 'class', 'tsfem-ajax' ).css( { 'opacity' : '1', 'display' : 'initial' } ).prop( 'style', '' );
	},

	/**
	 * Updates the feed option.
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @function
	 * @param {jQuery.event} event
	 * @return {undefined}
	 */
	updateFeed: function( event ) {

		let disabled = 'tsfem-button-disabled',
			$button = jQuery( event.target ),
			loader = '#tsfem-feed-ajax',
			status = 0;

		if ( $button.prop( 'disabled' ) )
			return;

		$button.addClass( disabled );
		$button.prop( 'disabled', true );

		//* Reset ajax loader
		tsfem.resetAjaxLoader( loader );

		//* Set ajax loader.
		tsfem.setAjaxLoader( loader );

		const unknownError = () => {
			$button.removeClass( disabled );
			$button.prop( 'disabled', false );
			tsfem.updatedResponse( loader, status, tsfem.i18n['UnknownError'], 0 );
		};

		//* Setup external update.
		jQuery.ajax( {
			method: 'POST',
			url: ajaxurl,
			dataType: 'json',
			data: {
				'action': 'tsfem_enable_feeds',
				'nonce': tsfem.nonce,
			},
			timeout: 12000,
			async: true,
		} ).done( ( response ) => {

			response = tsfem.convertJSONResponse( response );

			tsfem.debug && console.log( response );

			let data = response && response.data || void 0,
				type = response && response.type || void 0;

			if ( 'success' === type && data ) {

				let content = data.content;

				switch ( content.status ) {
					case 'success':
						status = 1;

						//* Insert wrap.
						jQuery( '.tsfem-trends-wrap' ).empty().css( 'opacity', 0 ).append( content.wrap ).animate(
							{ 'opacity' : 1 },
							{ 'queue' : true, 'duration' : 250 }
						);

						let duration = 400,
							total = content.data.length,
							wait = 0;

						//* Calculate loader wait.
						// Remove last entry from calculation (total-1) as it has adds no timing effect.
						for ( let i = 1; i < total - 1; i++ ) {
							wait += Math.round( duration / Math.pow( 1 + ( i / 2 ) / 100, 2 ) );
						}
						// Remove first and last entries from calculation as they have no timing effects.
						wait -= ( duration * 2 ) + ( duration / 2 );

						//* Loop through each issue and slowly insert it. It's run asynchronously...
						jQuery.each( content.data, ( index, value ) => {
							duration = Math.round( duration / Math.pow( 1 + ( index / 2 ) / 100, 2 ) );
							setTimeout( () => {
								jQuery( value ).hide().appendTo( '.tsfem-feed-wrap' ).slideDown( duration );
							}, duration / 2 * index );
						} );

						//* Expected to be done in 3.858 seconds
						setTimeout( () => { tsfem.updatedResponse( loader, status, '', 0 ); }, wait );
						break;

					case 'parse_error':
					case 'unknown_error':
					default:
						jQuery( '.tsfem-trends-wrap' ).empty().css( 'opacity', 0 ).append( content.error_output ).css( 'opacity', 1 ).find( '.tsfem-feed-wrap' ).css(
							{ 'opacity' : 0 }
						).animate(
							{ 'opacity' : 1 },
							{ queue: true, duration: 2000 }
						);
						//* 2 means the feed is offline. 0 means a server parsing error.
						// Don't enable the button. Make the user reload.
						status = 'unknown_error' === content.status ? 2 : 0;
						setTimeout( () => { tsfem.updatedResponse( loader, status, tsfem.i18n['UnknownError'], 0 ); }, 1000 );
						break;
				}
			} else if ( 'unknown' === response.type ) {
				status = 2;
				unknownError();
			} else {
				unknownError();
			}
		} ).fail( ( jqXHR, textStatus, errorThrown ) => {
			let _error = tsfem.getAjaxError( jqXHR, textStatus, errorThrown );

			$button.removeClass( disabled );
			$button.prop( 'disabled', false );
			tsfem.updatedResponse( loader, 0, _error, 0 );
		} );
	},

	/**
	 * Updates the selected extension state.
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @function
	 * @param {jQuery.event} event jQuery event
	 * @return {undefined}
	 */
	updateExtension: function( event ) {

		let disabled = 'tsfem-button-disabled',
			$button = jQuery( event.target );

		if ( $button.prop( 'disabled' ) || $button.hasClass( disabled ) )
			return;

		let $buttons = jQuery( '.tsfem-button-extension-activate, .tsfem-button-extension-deactivate' ).not( jQuery( '.' + disabled ) ),
			actionSlug = $button.data( 'slug' ),
			actionCase = $button.data( 'case' );

		let loader = '#tsfem-extensions-ajax',
			status = 0,
			topNotice = '',
			topNoticeCode = 0,
			loaderText = '';

		//* Disable buttons
		$buttons.map( () => {
			jQuery( this ).addClass( disabled );
			jQuery( this ).prop( 'disabled', true );
		} );

		//* Reset ajax loader
		tsfem.resetAjaxLoader( loader );

		//* Set ajax loader.
		tsfem.setAjaxLoader( loader );

		//* Setup external update.
		jQuery.ajax( {
			method: 'POST',
			url: ajaxurl,
			dataType: 'json',
			data: {
				'action' : 'tsfem_update_extension',
				'nonce' : tsfem.nonce,
				'slug' : actionSlug,
				'case' : actionCase,
			},
			timeout: 10000,
			async: true,
		} ).done( ( response ) => {

			response = tsfem.convertJSONResponse( response );

			tsfem.debug && console.log( response );

			let data = response && response.data || void 0,
				type = response && response.type || void 0; // type is unused but it's a standard.

			if ( ! data || ! type ) {
				//* Erroneous output.
				loaderText = tsfem.i18n['UnknownError'];
			} else {
				let rCode = data.results && data.results.code || void 0,
					success = data.results && data.results.success || void 0;

				loaderText = data.results && data.results.notice || void 0;

				if ( 'activate' === actionCase ) {
					switch ( rCode ) {
						case 10001: // No extensions checksum found.
						case 10002: // Extensions checksum mismatch.
						case 10003: // Method outcome mismatch.
						case 10004: // Account isn't allowed to use premium extension.
						case 10006: // Option update failed for unknown reason. Maybe overload.
						case 10007: // No slug set.
						case 10013: // Forced inactive...
						case 10014: // Hidden... User didn't log out when this was imposed.
							status        = 0;
							topNoticeCode = rCode;
							break;

						case 10005: // Extension caused fatal error.
							status         = 0;
							let fatalError = data && data.fatal_error || void 0;
							topNotice      = fatalError;
							topNoticeCode  = rCode;
							break;

						case 10008: // Premium/Essentials activated.
						case 10010: // Free activated.
						case 10012: // Already active...
							status = 1;
							$button.removeClass( 'tsfem-button tsfem-button-extension-activate' ).addClass( 'tsfem-button-primary tsfem-button-primary-dark tsfem-button-extension-deactivate' );
							$button.data( 'case', 'deactivate' );
							$button.text( tsfem.i18n['Deactivate'] );
							jQuery( '#' + actionSlug + '-extension-entry' ).removeClass( 'tsfem-extension-deactivated' ).addClass( 'tsfem-extension-activated' );
							tsfem.updateExtensionDescFooter( actionSlug, actionCase );
							break;

						case 10009: // User not premium, trying to activate premium extension.
							status = 2;
							topNoticeCode = rCode;
							break;

						default:
							status = 0;
							loaderText = tsfem.i18n['UnknownError'];
							break;
					}
				} else if ( 'deactivate' === actionCase ) {
					switch ( rCode ) {
						case 11001: // success.
							status = 1;
							$button.removeClass( 'tsfem-button-primary tsfem-button-primary-dark tsfem-button-extension-deactivate' ).addClass( 'tsfem-button tsfem-button-extension-activate' );
							$button.data( 'case', 'activate' );
							$button.text( tsfem.i18n['Activate'] );
							jQuery( '#' + actionSlug + '-extension-entry' ).removeClass( 'tsfem-extension-activated' ).addClass( 'tsfem-extension-deactivated' );
							tsfem.updateExtensionDescFooter( actionSlug, actionCase );
							break;

						case 11002: // failure.
						case 11003: // Forced active...
						case 11004: // Hidden... User didn't log out when this was imposed.
							status = 0;
							topNoticeCode = rCode;
							break;

						default :
							status = 0;
							loaderText = tsfem.i18n['UnknownError'];
							break;
					}
				}
			}
		} ).fail( ( jqXHR, textStatus, errorThrown ) => {
			// Set Ajax response for wrapper.
			loaderText = tsfem.getAjaxError( jqXHR, textStatus, errorThrown );

			// Try to set top notices, regardless.
			tsfem.setTopNotice( 1071100 ); // Notifies that there's an error saving.
			errorThrown && tsfem.setTopNotice( -1, 'jQ error: ' + errorThrown );
		} ).always( () => {
			tsfem.updatedResponse( loader, status, loaderText, 0 );
			$buttons.removeClass( disabled );
			$buttons.prop( 'disabled', false );
			$button.focus();
			topNoticeCode && tsfem.setTopNotice( topNoticeCode, topNotice );
		} );
	},

	/**
	 * Tries to convert JSON response to values if not already set.
	 *
	 * @since 1.2.0
	 * @access public
	 *
	 * @function
	 * @param {(object|string|undefined)} response
	 * @return {(object|undefined)}
	 */
	convertJSONResponse: function( response ) {

		let testJSON = response && response.json || void 0,
			isJSON = 1 === testJSON;

		if ( ! isJSON ) {
			let _response = response;

			try {
				response = JSON.parse( response );
				isJSON = true;
			} catch ( error ) {
				isJSON = false;
			}

			if ( ! isJSON ) {
				// Reset response.
				response = _response;
			}
		}

		return response;
	},

	/**
	 * Visualizes the AJAX response to the user.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @function
	 * @param {string} target
	 * @param {number} success 0 = error, 1 = success, 2 = unknown but success.
	 * @param {string} notice The updated notice.
	 * @param {number} html 0 = output text, 1 = output HTML
	 * @return {undefined}
	 */
	updatedResponse: function( target, success, notice, html ) {
		switch ( success ) {
			case 0:
			case 1:
			case 2:
				tsfem.unsetAjaxLoader( target, success, notice, html );
				break;

			default:
				tsfem.resetAjaxLoader( target );
				break;
		}
	},

	/**
	 * Returns bound AJAX reponse error with the help from i18n.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @function
	 * @param {(jQuery.xhr|Object)} jqXHR
	 * @param {String} textStatus
	 * @param {String} errorThrown
	 * @return {String}
	 */
	getAjaxError: function( jqXHR, textStatus, errorThrown ) {

		if ( tsfem.debug ) {
			console.log( jqXHR.responseText );
			console.log( errorThrown );
		}

		let _error = '';

		switch ( errorThrown ) {
			case 'abort': // client error, no code.
			case 'timeout': // 408
				_error = tsfem.i18n['TimeoutError'];
				break;

			case 'Bad Request': // 400
				_error = tsfem.i18n['BadRequest'];
				break;

			case 'Internal Server Error': // 500
				_error = tsfem.i18n['FatalError'];
				break;

			case 'parsererror': // PHP error, no code.
				_error = tsfem.i18n['ParseError'];
				break;

			default:
				// @TODO use ajaxOptions.status? i.e. 400, 401, 402, 503.
				_error = tsfem.i18n['UnknownError'];
				break;
		}

		return _error;
	},

	/**
	 * Generates AJAX notices and top notices based on error return values.
	 *
	 * @since 1.3.0
	 * @access public
	 *
	 * @function
	 * @param {object} response The response body.
	 * @return {undefined}
	 */
	unexpectedAjaxErrorNotice: function( response ) {

		response = tsfem.convertJSONResponse( response ) || void 0;

		let data = response && response.data || void 0;

		if ( tsfem.debug ) console.log( response );

		if ( data && 'results' in data && 'code' in data.results )
			tsfem.setTopNotice( data.results.code, data.results.notice );
	},

	/**
	 * Converts multidimensional arrays to single array with key wrappers.
	 * All first array keys become the new key. The final value becomes its value.
	 *
	 * Great for creating form array keys.
	 * matosa: "Multidimensional Array TO Single Array"
	 *
	 * The latest value must be scalar.
	 *
	 * Example: a = [ 1 => [ 2 => [ 3 => [ 'value' ] ] ] ];
	 * Becomes: '1[2][3]' => 'value';
	 *
	 * @since 1.2.0
	 * @access public
	 *
	 * @param {(String|Object)} value The array or string to loop.
	 * @return {(Object|Boolean)} The iterated array to string. False if input isn't array.
	 */
	matosa: function( value ) {

		var last = null,
			output = '';

		(function _matosa( _value, _i ) {
			_i++;
			if ( typeof _value === 'object' ) {
				let _index, _item;
				for ( _index in _value ) {
					_item = _value[ _index ];
				}

				last = _item;

				if ( 1 === _i ) {
					output += _index + _matosa( _item, _i );
				} else {
					output += '[' + _index + ']' + _matosa( _item, _i );
				}
			} else if ( 1 === _i ) {
				last = null;
				return output = false;
			}

			return output;
		})( value, 0 );

		if ( false === output )
			return false;

		let retval = {};
		retval[ output ] = last;

		return retval;
	},

	/**
	 * Gets and inserts the AJAX response for the Extension Description Footer.
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @function
	 * @param {String} actionSlug The extension slug.
	 * @param {String} actionCase The update case. Either 'activate' or 'deactivate'.
	 * @return {undefined}
	 */
	updateExtensionDescFooter: function( actionSlug, actionCase ) {

		jQuery.ajax( {
			method: 'POST',
			url: ajaxurl,
			dataType: 'json',
			data: {
				action: 'tsfem_update_extension_desc_footer',
				nonce:  tsfem.nonce,
				slug:   actionSlug,
				case:   actionCase,
			},
			timeout: 7000,
			async: true,
		} ).done( ( response ) => {

			response = tsfem.convertJSONResponse( response );

			tsfem.debug && console.log( response );

			let data = response && response.data || void 0,
				type = response && response.type || void 0;

			if ( ! data ) return;

			let $footer = jQuery( '#' + actionSlug + '-extension-entry .tsfem-extension-description-footer' ),
				direction = 'activate' === actionCase ? 'up' : 'down';

			$footer.addClass( 'tsfem-flip-hide-' + direction );

			//! TODO use promises.
			setTimeout( () => {
				$footer.empty().append( data );
				//* Flush tooltip cache.
				tsfTT.triggerReset();
			}, 250 );
			setTimeout( () => {
				$footer.addClass( 'tsfem-flip-show-' + direction );
			}, 500 );
			setTimeout( () => {
				$footer.removeClass( 'tsfem-flip-hide-' + direction + ' tsfem-flip-show-' + direction );
			}, 750 );
		} ).fail( ( jqXHR, textStatus, errorThrown ) => {
			// Don't invoke anything fancy, yet. This is automatically called.
			if ( tsfem.debug ) {
				console.log( jqXHR.responseText );
				console.log( errorThrown );
			}
		} );
	},

	/**
	 * Prevents browser default actions.
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @function
	 * @param {Object} event jQuery event
	 * @return {undefined}
	 */
	preventDefault: function( event ) {
		event.preventDefault();
		event.stopPropagation();
	},

	/**
	 * Engages switcher button reset toggle.
	 *
	 * @since 1.5.0
	 * @access private
	 *
	 * @function
	 * @param {Object} event jQuery event
	 */
	engageSwitcher: function( event ) {

		const events = 'click.tsfemResetSwitcher';
		const resetSwitcher = ( event ) => {
			let $switcher = jQuery( '.tsfem-switch-button-container > input[type="checkbox"]:checked' );

			if ( 'undefined' !== typeof $switcher && $switcher.length > 0 ) {
				let $wrap = $switcher.parents( '.tsfem-switch-button-container-wrap' );

				if ( jQuery( event.target ).closest( $wrap ).length < 1 ) {
					$switcher.prop( 'checked', false );
					jQuery( window ).off( events );
				}
			}
		}

		jQuery( window ).off( events ).on( events, resetSwitcher );
	},

	/**
	 * Set a flag, to indicate user needs to be warned on navigation.
	 *
	 * @since 1.3.0
	 * @access public
	 *
	 * @function
	 * @return {undefined}
	 */
	registerNavWarn: function() {
		tsfem.navWarn = true;
	},

	/**
	 * Set a flag, to indicate user needs to be warned on navigation.
	 *
	 * @since 1.3.0
	 * @access public
	 *
	 * @function
	 * @return {Boolean}
	 */
	mustNavWarn: function() {
		return !! tsfem.navWarn;
	},

	/**
	 * Sets up dismissible notice listener. Uses class .tsfem-dismiss.
	 *
	 * @since 1.3.0
	 * @access private
	 *
	 * @function
	 * @return {undefined}
	 */
	setDismissNoticeListener: function() {

		const dismissNotice = ( event ) => {
			jQuery( event.target ).closest( '.tsfem-notice' ).slideUp( 200, function() {
				this.remove();
			} );
		};

		jQuery( '.tsfem-dismiss' ).off( 'click', dismissNotice ).on( 'click', dismissNotice );
	},

	/**
	 * Gets and inserts AJAX top notice.
	 *
	 * @since 1.3.0
	 * @since 1.5.0 Now uses fallback notices on fatal AJAX error.
	 * @access public
	 *
	 * @function
	 * @param {number} noticeKey The notice key.
	 * @param {(string|undefined)} msg The notice message, if set this is going to be used.
	 * @return {undefined}
	 */
	setTopNotice: function( noticeKey, msg ) {

		//* Wait a little until AJAX is resolved.
		if ( tsfem.noticeBuffer ) {
			window.setTimeout( () => {
				tsfem.setTopNotice( noticeKey, msg );
			}, 500 );
			return;
		}

		tsfem.noticeBuffer = true;

		let hasMsg = msg ? 1 : 0;

		jQuery.ajax( {
			method: 'POST',
			url: ajaxurl,
			datatype: 'json',
			data: {
				action: 'tsfem_get_dismissible_notice',
				nonce: tsfem.nonce,
				'tsfem-notice-key': noticeKey,
				'tsfem-notice-has-msg': hasMsg,
			},
			timeout: 7000,
			async: true,
		} ).done( ( response ) => {

			response = tsfem.convertJSONResponse( response );

			tsfem.debug && console.log( response );

			let data = response && response.data || void 0,
				type = response && response.type || void 0;

			if ( ! data || ! type || 'undefined' === typeof data.notice ) {
				//* Erroneous output. Do nothing as this error is invoked internally.
			} else {
				let notice = '';

				if ( hasMsg ) {
					notice = jQuery( data.notice );
					if ( tsfem.rtl ) {
						notice.find( 'p' ).first().prepend( msg + ' ' );
					} else {
						notice.find( 'p' ).first().append( ' ' + msg );
					}
				} else {
					notice = data.notice;
				}

				tsfem.appendTopNotice( notice );
			}
		} ).fail( ( jqXHR, textStatus, errorThrown ) => {
			// Simply log what happened.
			if ( tsfem.debug ) {
				console.log( jqXHR.responseText );
				console.log( errorThrown );
			}

			// Output fallback notice.
			let fallbackNotice = hasMsg ? wp.template( 'tsfem-fbtopnotice-msg' ) : wp.template( 'tsfem-fbtopnotice' ),
				template = fallbackNotice( { 'code' : noticeKey, 'msg' : msg } );
			tsfem.appendTopNotice( template );
		} ).always( () => {
			tsfem.noticeBuffer = false;
		} );
	},

	/**
	 * Appends top notice.
	 *
	 * @since 1.5.0
	 * @access private
	 *
	 * @function
	 * @param {string} notice The notice to append.
	 */
	appendTopNotice: function( notice ) {

		let $top = jQuery( '.tsfem-notice-wrap' ),
			$notices = $top.children( '.tsfem-notice, .tsfem-notice-wrap .notice' ),
			slideOps = {
				duration: 200,
				queue: false,
			};

		$top.css( 'willChange', 'contents' );

		//= Prevent bounce by locking maxHeight to current height.
		$notices.length > 1 && $top.css( 'maxHeight', $top.outerHeight() + 'px' );

		if ( $notices.length > 1 ) {
			// Kill them all with fire. Except one, one may stay.
			$notices.slice( 0, $notices.length - 1 ).each( function() {
				jQuery( this ).slideUp( jQuery.extend(
					slideOps,
					{ complete: () => this.remove() }
				) );
			} );
		}

		jQuery( notice ).hide().appendTo( $top ).slideDown( jQuery.extend(
			slideOps,
			//= Reset CSS.
			{ complete: () => $top.css( 'maxHeight', '' ) }
		) );

		tsfem.setDismissNoticeListener();
	},

	/**
	 * Creates modal dialog box from options. Also allows multiselect, instead
	 * of just confirm/cancel.
	 *
	 * NOTE: If options.select is set, you must set options.confirm to get the
	 *       return value.
	 *
	 * @since 1.3.0
	 * @access public
	 *
	 * @function
	 * @param {object} options The dialog options.
	 * @return {undefined}
	 */
	dialog: function( options ) {

		let title = options.title || '',
			text = options.text || '',
			select = options.select || '',
			confirm = options.confirm || '',
			cancel = options.cancel || '',
			modal = {};

		modal.mask = document.createElement( 'div' );
		modal.mask.className = 'tsfem-modal-mask';
		modal.maskNoScroll = document.createElement( 'div' );
		modal.maskNoScroll.className = 'tsfem-modal-mask-noscroll';
		modal.mask.appendChild( modal.maskNoScroll );

		modal.container = document.createElement( 'div' );
		modal.container.className = 'tsfem-modal-container';

		modal.dialogWrap = document.createElement( 'div' );
		modal.dialogWrap.className = 'tsfem-modal-dialog-wrap';
		modal.dialogWrap.style.marginLeft = document.getElementById( 'adminmenuwrap' ).offsetWidth + 'px';
		modal.dialogWrap.style.marginTop = document.getElementById( 'wpadminbar' ).offsetHeight + 'px';

		modal.dialog = document.createElement( 'div' );
		modal.dialog.className = 'tsfem-modal-dialog';

		modal.trap = document.createElement( 'div' );
		modal.trap.className = 'tsfem-modal-trap';
		modal.trap.tabIndex = 0;
		modal.bottomTrap = modal.trap.cloneNode( false );
		modal.dialog.appendChild( modal.trap );

		modal.x = document.createElement( 'div' );
		modal.x.className = 'tsfem-modal-dismiss';
		modal.x.addEventListener( 'click', function() {
			window.dispatchEvent( new Event( 'tsfem_modalCancel' ) );
		} );
		modal.dialog.appendChild( modal.x );

		if ( title ) {
			modal.titleWrap = document.createElement( 'div' );
			modal.titleWrap.className = 'tsfem-modal-title';

			modal.titleWrapTitle = document.createElement( 'h4' );
			modal.titleWrapTitle.innerHTML = title;
			modal.titleWrap.appendChild( modal.titleWrapTitle );

			modal.dialog.appendChild( modal.titleWrap );
		}

		modal.inner = document.createElement( 'div' );
		modal.inner.className = 'tsfem-modal-inner';

		if ( text ) {
			modal.textWrap = document.createElement( 'div' );
			modal.textWrap.className = 'tsfem-modal-text';

			if ( Array.isArray( text ) ) {
				for ( let _iT in text ) {
					modal.textWrapContent = document.createElement( 'p' );
					modal.textWrapContent.innerHTML = text[ _iT ];
					modal.textWrap.appendChild( modal.textWrapContent );
				}
			} else {
				modal.textWrapContent = document.createElement( 'p' );
				modal.textWrapContent.innerHTML = text;
				modal.textWrap.appendChild( modal.textWrapContent );
			}

			modal.inner.appendChild( modal.textWrap );
		}

		let hasSelect = false;

		if ( select ) {
			hasSelect = true;

			modal.selectWrap = document.createElement( 'div' );
			modal.selectWrap.className = 'tsfem-modal-select';

			let selectWrapItem = {};

			selectWrapItem.wrap = document.createElement( 'div' );
			selectWrapItem.wrap.className = 'tsfem-modal-select-option';

			selectWrapItem.radio = document.createElement( 'input' );
			selectWrapItem.radio.setAttribute( 'type', 'radio' );
			selectWrapItem.radio.setAttribute( 'name', 'tsfem-modal-select-option-group' );
			selectWrapItem.radio.tabIndex = 0;

			selectWrapItem.label = document.createElement( 'label' );

			(function() {
				for ( let i in select ) {
					let wrap = selectWrapItem.wrap.cloneNode( true ),
						radio = selectWrapItem.radio.cloneNode( false ),
						label = selectWrapItem.label.cloneNode( false );

					radio.setAttribute( 'value', i );
					label.innerHTML = select[ i ];

					//= i can be a string and integer because of "possible" JSON parsing.
					if ( i == 0 ) {
						radio.checked = true;
					}

					let id = 'tsfem-dialog-option-' + i;

					radio.setAttribute( 'id', id );
					label.setAttribute( 'for', id );

					wrap.appendChild( radio );
					wrap.appendChild( label );

					modal.selectWrap.appendChild( wrap );
				}
			})();

			modal.inner.appendChild( modal.selectWrap );
		}

		modal.dialog.appendChild( modal.inner );

		if ( confirm || cancel ) {
			modal.buttonWrap = document.createElement( 'div' );
			modal.buttonWrap.className = 'tsfem-modal-buttons';

			if ( confirm ) {
				modal.confirmButton = document.createElement( 'button' );
				modal.confirmButton.className = 'tsfem-modal-confirm tsfem-button-small';
				if ( hasSelect ) {
					modal.confirmButton.className += ' tsfem-button-primary tsfem-button-primary-bright';
				} else {
					modal.confirmButton.className += ' tsfem-button';
				}

				modal.confirmButton.innerHTML = confirm;
				modal.confirmButton.addEventListener( 'click', function() {
					let detail = void 0;
					if ( hasSelect ) {
						detail = { 'detail' : {
							'checked' : document.querySelector( '.tsfem-modal-select input:checked' ).value
						} };
					}
					window.dispatchEvent( new CustomEvent( 'tsfem_modalConfirm', detail ) );
				} );

				modal.buttonWrap.appendChild( modal.confirmButton );
			}

			if ( cancel ) {
				modal.cancelButton = document.createElement( 'button' );
				modal.cancelButton.className = 'tsfem-modal-cancel tsfem-button tsfem-button-small';
				modal.cancelButton.innerHTML = cancel;
				modal.cancelButton.addEventListener( 'click', () => {
					window.dispatchEvent( new Event( 'tsfem_modalCancel' ) );
				} );

				modal.buttonWrap.appendChild( modal.cancelButton );
			}

			modal.dialog.appendChild( modal.buttonWrap );
		}

		modal.dialog.appendChild( modal.bottomTrap );

		modal.dialogWrap.appendChild( modal.dialog );
		modal.container.appendChild( modal.dialogWrap );

		document.body.appendChild( modal.mask );
		document.body.appendChild( modal.container );

		const resetFocus = () => {
			modal.trap.focus();
		};
		modal.trap.addEventListener( 'focus', resetFocus );
		modal.bottomTrap.addEventListener( 'focus', resetFocus );
		modal.trap.focus();

		tsfem.fadeIn( modal.mask );
		tsfem.fadeIn( modal.container );

		const preventDefault = ( e ) => {
			e.preventDefault();
		};
		modal.maskNoScroll.addEventListener( 'wheel', preventDefault );
		modal.maskNoScroll.addEventListener( 'touchmove', preventDefault );

		const resizeListener = function() {
			modal.dialogWrap.style.marginLeft = document.getElementById( 'adminmenuwrap' ).offsetWidth + 'px';
			modal.dialogWrap.style.marginTop = document.getElementById( 'wpadminbar' ).offsetHeight + 'px';
		}
		window.addEventListener( 'resize', resizeListener );

		const removeModal = () => {
			modal.maskNoScroll.removeEventListener( 'wheel', preventDefault );
			modal.maskNoScroll.removeEventListener( 'touchmove', preventDefault );
			window.removeEventListener( 'tsfem_modalCancel', removeModal );
			window.removeEventListener( 'tsfem_modalConfirm', removeModal );
			window.removeEventListener( 'resize', resizeListener );
			tsfem.fadeOut( modal.mask, 250, () => modal.mask.remove() );
			tsfem.fadeOut( modal.container, 250, () => modal.container.remove() );
		};

		window.addEventListener( 'tsfem_modalCancel', removeModal );
		window.addEventListener( 'tsfem_modalConfirm', removeModal );
	},

	/**
	 * Fades in target.
	 * Can also fade out a target when show if false. It will remove the target
	 * on completion.
	 *
	 * @since 1.3.0
	 * @since 1.5.0 : 1. Added done parameter.
	 *                2. Added roughness to reduce FLOPS.
	 * @access public
	 *
	 * @function
	 * @param {Element} target The target to fade in (or out).
	 * @param {number} ms The time it takes to fade in (or out).
	 * @param {function} done Callback to run after transition is done.
	 * @param {boolean} show Whether to show or hide and delete the target.
	 * @return {undefined}
	 */
	fadeIn: function( target, ms, done, show ) {

		if ( void 0 === target || ! target instanceof HTMLElement )
			return;

		if ( ! target.style || ! ( 'opacity' in target.style ) )
			return;

		ms = ms || 250;
		show = void 0 === show ? true : show;

		let opacity = 0,
			cO = 0,
			roughness = 3,
			oBuffer,
			fadeGo;

		if ( show ) {
			/**
			 * TODO convert to requestAnimationFrame
			 */
			fadeGo = () => {
				cO = ( opacity += roughness ) / 100;
				target.style.display = null;
				target.style.opacity = cO;
				if ( cO >= 1 ) {
					clearInterval( oBuffer );
					target.style.opacity = 1;
					typeof done === 'function' && (done)();
				}
			};
		} else {
			/**
			 * TODO convert to requestAnimationFrame
			 */
			opacity = 100;
			fadeGo = () => {
				cO = ( opacity -= roughness ) / 100;
				target.style.opacity = cO;
				if ( cO <= 0 ) {
					clearInterval( oBuffer );
					target.style.opacity = 0;
					//= Defer paint asynchronously to prevent bounce if there's a callback.
					setTimeout( () => { target.style.display = 'none' }, 0 );
					typeof done === 'function' && (done)()
				}
			};
		}
		oBuffer = setInterval( fadeGo, ms / 100 );
	},

	/**
	 * Fades out and deletes target.
	 *
	 * @since 1.3.0
	 * @since 1.5.0 Added done parameter.
	 * @access public
	 *
	 * @function
	 * @param {Element} target The target to fade out.
	 * @param {number} ms The time it takes to fade out.
	 * @param {function} done Callback to run after transition is done.
	 * @return {undefined}
	 */
	fadeOut: function( target, ms, done ) {
		tsfem.fadeIn( target, ms, done, false );
	},

	/**
	 * Initialises all aspects of the scripts.
	 *
	 * Generally ordered with stuff that inserts new elements into the DOM first,
	 * then stuff that triggers an event on existing DOM elements when ready,
	 * followed by stuff that triggers an event only on user interaction. This
	 * keeps any screen jumping from occuring later on.
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @TODO restructure calling. This file is loaded on extraneous pages.
	 *
	 * @function
	 * @param {Object} jQ jQuery
	 * @return {undefined}
	 */
	ready: function( jQ ) {

		// Move the page updates notices below the top-wrap.
		jQ( '#wpbody-content' ).find( '.updated, .error, .notice-error, .notice-warning' ).appendTo( '.tsfem-notice-wrap' );

		// AJAX feed update.
		jQ( 'a#tsfem-enable-feeds' ).on( 'click', tsfem.updateFeed );

		// AJAX extension update.
		jQ( '.tsfem-button-extension-activate, .tsfem-button-extension-deactivate' ).on( 'click', tsfem.updateExtension );

		// AJAX on-heartbeat active extension check to update buttons accordingly on multi-admin sites or after timeout. @TODO
		//jQ( document ).on( 'heartbeat-tick', tsfem.checkExtensions );

		// Disable semi-disabled buttons.
		jQ( '.tsfem-button-disabled' ).on( 'click', tsfem.preventDefault );

		// Reset switcher button to default when clicked outside.
		jQ( '.tsfem-switch-button-container-wrap' ).on( 'click', 'label', tsfem.engageSwitcher );

		// Set dismissible notice listener.
		jQ( document.body ).ready( tsfem.setDismissNoticeListener );
	}
};
jQuery( tsfem.ready );
