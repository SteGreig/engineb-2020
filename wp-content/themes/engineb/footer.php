
	</main>

	<div class="cookie-notice">
		<h4 class="cookie-notice__title">Cookies &amp; Privacy</h4>
		<p class="cookie-notice__text">This website uses cookies to ensure you get the best experience on our website.</p>
		<div class="cookie-notice__links flex space-between">
			<a href="<?php echo get_site_url(); ?>/privacy-policy">More information</a>
			<button class="cta cta--orange-white cta--sm cookie-notice-accept">Accept</button>
		</div>
	</div>
	

	<?php get_template_part( 'templates/global-footer' ); ?>

	<!-- <script defer src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script defer src="<?php bloginfo('template_directory'); ?>/assets/js/libs/jquery-2.2.4.min.js"><\/script>')</script> -->

	<script>
		var themeURL = "<?php echo get_stylesheet_directory_uri(); ?>";
	</script>
	<?php wp_footer(); ?>

	<script src="//instant.page/1.2.2" type="module" integrity="sha384-2xV8M5griQmzyiY3CDqh1dn4z3llDVqZDqzjzcY+jCBCk/a5fXJmuZ/40JJAPeoU"></script>

</body>
</html>
