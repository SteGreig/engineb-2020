<?php
/**
 * Stanard config
 */	
	$sectionAlignment = get_sub_field( 'ci_section_alignment' );
	$sectionTheme = get_sub_field( 'ci_theme' );
/**
 * Image
 */
	$sectionImage = get_sub_field( 'ci_image' );
/**
 * Copy
 */	
	$sectionHeader = get_sub_field( 'ci_main_header' );
	$sectionSubHeader = get_sub_field( 'ci_sub_header' );
	$sectionCopy = get_sub_field( 'ci_copy' );
/**
 * CTAs
 */
	$sectionCtas = get_sub_field( 'ci_ctas' );
	$sectionCtaSize = $sectionCtas['ci_cta_size'];
	$sectionCtaRepeater = $sectionCtas['ci_ctas_repeater'];
?>

<article class="section section--copy section--copy-image section--<?php echo $section; ?> theme--<?php echo $sectionTheme; ?>" id="section-<?php echo $section; ?>">
	
<section class="container">

	<div class="grid grid--2">
		<?php 
			if( $sectionAlignment === 'left' ):
				include( 'pb-copy-image--copy.php' );
				include( 'pb-copy-image--image.php' );
			else:
				include( 'pb-copy-image--image.php' );	
				include( 'pb-copy-image--copy.php' );
			endif;
		?>
		</div>
		
	</section>
	
</article>
