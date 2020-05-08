<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', '');

/** MySQL database username */
define( 'DB_USER', '');

/** MySQL database password */
define( 'DB_PASSWORD', '');

/** MySQL hostname */
define( 'DB_HOST', '');

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '602c3383d82f16f2e3abf54cdfd8e1bbb6f1d6da');
define( 'SECURE_AUTH_KEY',  '8ba49e75a5939fe9311743079c1e5aaed97a9a42');
define( 'LOGGED_IN_KEY',    '85bd4d565a15ff3a2348aaf7bc1d8df9ac1fbee0');
define( 'NONCE_KEY',        'd5c0818be6aa50bf33bfd0f62f4cd2aef38a0ead');
define( 'AUTH_SALT',        '3a56a05969ba28e0dd7925489d84f3c15a1ed519');
define( 'SECURE_AUTH_SALT', '817bc17ad600fb64336cf7ea184a19fefb433f02');
define( 'LOGGED_IN_SALT',   'cfa08fb4712aa30eacb2921b9dd2323947621f07');
define( 'NONCE_SALT',       '7b19426b50840e054f4a71d937ee72cfde92d7f1');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'br_wp_';


/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
/** GLOBAL SETTINGS */
define( 'WPLANG', 'en_GB' );
define( 'WP_MEMORY_LIMIT', '128M' );
define( 'WP_MAX_MEMORY_LIMIT', '256M' );
define( 'WP_POST_REVISIONS', 2 );
define( 'EMPTY_TRASH_DAYS', 10 );
define( 'AUTOSAVE_INTERVAL', 160 );
/** STAG ONLY SETTINGS */
define( 'DISALLOW_FILE_EDIT', true );
define( 'DISALLOW_FILE_MODS', true );
define( 'AUTOMATIC_UPDATER_DISABLED', true );
define( 'WP_AUTO_UPDATE_CORE', false );
define( 'WP_DEBUG', true );
@error_reporting( E_ALL );
@ini_set( 'log_errors', true );
@ini_set( 'log_errors_max_len', '0' );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
@ini_set( 'display_errors', 0 );
define( 'CONCATENATE_SCRIPTS', false );
define( 'SAVEQUERIES', true );
define( 'SCRIPT_DEBUG', false );
define( 'WP_CACHE', false );

// If we're behind a proxy server and using HTTPS, we need to alert Wordpress of that fact
// see also http://codex.wordpress.org/Administration_Over_SSL#Using_a_Reverse_Proxy
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
	$_SERVER['HTTPS'] = 'on';
}

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
