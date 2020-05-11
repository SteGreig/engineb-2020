
	<header class="header w100 flex items-center <?php if(is_front_page()) { echo "sp"; } ?>">
		<a class="site-logo" href="<?php echo get_site_url(); ?>">
			<img class="site-logo__img site-logo__img--main" src="<?php echo get_field('logo', 'option')['url']; ?>" alt="<?php echo get_bloginfo(); ?>">
			<img class="site-logo__img site-logo__img--alt" src="<?php echo get_field('logo_alt', 'option')['url']; ?>" alt="<?php echo get_bloginfo(); ?>">
		</a>

		<nav class="desktop-nav">
			<?php
			// Primary menu for desktop
				wp_nav_menu([
					'menu' => 'Primary Menu',
					'menu_class' => "main-menu",
					'container' => ''
				]);
			?>
		</nav>

		<a class="cta cta--ghost cta--white header__contact-cta" href="<?php echo get_site_url(); ?>/#contact">Contact us</a>

		<button class="mob-nav-toggle" type="button" aria-label="Menu" aria-controls="navigation">
			<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/icon-menu.svg" alt="Menu icon">
			<img class="close" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/icon-close.svg" alt="Close icon">
		</button>

		<nav class="mob-nav">
			<div class="scroll-container"><?php /* Main menu will be cloned into here to form the mobile nav */ ?></div>
		</nav>
	</header>

