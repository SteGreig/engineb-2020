<!DOCTYPE html>
<html lang="en" class="no-js" dir="ltr">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link href="https://fonts.googleapis.com/css?family=Montserrat|Roboto" rel="stylesheet">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="<?php bloginfo('template_directory'); ?>/assets/js/libs/jquery-2.2.4.min.js"><\/script>')</script>
	<?php wp_head(); ?>
	<!-- <style>body{color: white!important; }.cta {background:white;}</style> -->
</head>
<body>
<?php wp_body_open(); ?>
<a class="srt" href="#aria-main">Skip to main content</a>

<?php
	if( !is_page(  array( 'privacy', 'privacy-policy', 'cookie-privacy' ) ) ) :
		//get_template_part( 'templates/global-gdpr' );
	endif;
	get_template_part( 'templates/global-header' );
?>

<main class="global-main" id="aria-main">
