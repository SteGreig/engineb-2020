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

<article class="section section--copy section--copy-image flex items-center section--<?php echo $section; ?> theme--<?php echo $sectionTheme; ?> <?php echo strtolower(str_replace(" ", "-", $sectionHeader)); ?>" id="<?php the_sub_field('ci_id'); ?>">
	
<section class="container">

	<div class="grid grid--2 items-center">
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

	<?php if(get_sub_field('ci_modal_copy')) { include( 'modal-tray.php' ); } ?>
	
</article>
