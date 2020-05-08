
	<button class="hamburger hamburger--collapse" type="button" aria-label="Menu" aria-controls="navigation">
		<span class="hamburger-box">
			<span class="hamburger-inner"></span>
		</span>
	</button>

	<nav class="main-nav">
	<?php 
		wp_nav_menu( array( 
			'theme_location' => 'main',
			'menu_class' => 'main-nav-list',
			'container' => ''
		));
	?>
	</nav>

