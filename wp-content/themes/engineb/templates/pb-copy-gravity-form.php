<?php
/**
 * Stanard config
 */	
	$sectionAlignment = get_sub_field( 'cgf_section_alignment' );
	$sectionTheme = get_sub_field( 'cfg_theme' );
/**
 * Image
 */
	$sectionImage = get_sub_field( 'cgf_image' );
/**
 * Copy
 */	
	$sectionHeader = get_sub_field( 'cgf_main_header' );
	$sectionSubHeader = get_sub_field( 'cgf_sub_header' );
	$sectionCopy = get_sub_field( 'cgf_copy' );
/**
 * CTAs
 */
	$sectionCtas = get_sub_field( 'cgf_ctas' );
	$sectionCtaSize = $sectionCtas['cgf_cta_size'];
	$sectionCtaRepeater = $sectionCtas['cgf_ctas_repeater'];
?>

<article class="section section--copy section--copy-form section--<?php echo $section; ?> theme--<?php echo $sectionTheme; ?>" id="section-<?php echo $section; ?>">
	
<section class="container">

	<div class="grid grid--2">
		<?php 
			if( $sectionAlignment === 'left' ):
				include( 'pb-copy-form--copy.php' );
				include( 'pb-copy-form--gravity.php' );
			else:
				include( 'pb-copy-form--gravity.php' );	
				include( 'pb-copy-form--copy.php' );
			endif;
		?>
		</div>
		
	</section>
	
</article>
