<?php
/**
 * Stanard config
 */	
	$sectionTheme = get_sub_field( 'hs_background' );
/**
 * Image
 */
	$sectionImage = get_sub_field( 'hs_image' );
/**
 * Copy
 */	
	$sectionHeader = get_sub_field( 'hs_headline' );
?>

<article class="section section--hero section--<?php echo $section; ?> theme--<?php echo $sectionTheme; ?>" id="section-<?php echo $section; ?>">
	
  <section class="section--hero__container container flex justify-center items-center">

    <h1 class="section--hero__header"><?php echo $sectionHeader; ?></h1>

    <img class="section--hero__image" src="<?php echo $sectionImage['url'];?>" alt="<?php echo $sectionHeader; ?> illustration">

		<button class="scroll-arrow flex flex-col items-center">
			<span>Scroll down</span>
			<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/icon-arrow-down.svg" alt="Down arrow icon">
		</button>
		
	</section>
	
</article>
