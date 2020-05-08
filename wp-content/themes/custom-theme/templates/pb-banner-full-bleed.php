<?php
/**
 * Stanard config
 */	
	$bannerHeight = get_sub_field( 'bfb_banner_height' );
	$bannerAlignment = get_sub_field( 'bfb_banner_alignment' );
/**
 * Image setup
 */
	if( get_sub_field( 'bfb_background_images' ) ):
		$bannerImages = get_sub_field( 'bfb_background_images' );
		if( $bannerImages['bfb_landscape'] ):
			$bannerImagesActive = true;
			$bannerLandscapeUrl = $bannerImages['bfb_landscape']['sizes']['image-max-16x9'];
			$bannerPortraitUrl = $bannerImages['bfb_portrait']['sizes']['image-max-9x16'];
		endif; 
	else:
		$bannerImagesActive = false;
	endif; 
/**
 * Copy
 */	
	$bannerHeader = get_sub_field( 'bfb_main_header' );
	$bannerCopy = get_sub_field( 'bfb_sub_copy' );
/**
 * CTAs
 */
	$bannerCtas = get_sub_field( 'bfb_ctas' );
	$bannerCtaSize = $bannerCtas['bfb_cta_size'];
	$bannerCtaRepeater = $bannerCtas['bta_ctas_repeater'];
?>


<?php if( $bannerImagesActive ): ?>
<style>
	.banner--<?php echo $section;?> {
		background: url( '<?php echo $bannerLandscapeUrl;?>' ) no-repeat center center;
	}
	
	@media screen and (orientation: portrait) {
		.banner--<?php echo $section;?> {
			background: url( '<?php echo $bannerPortraitUrl;?>' ) no-repeat center top;
		}
	}

	@media screen and (orientation: landscape) {
		.banner--<?php echo $section;?> {
			background: url( '<?php echo $bannerLandscapeUrl;?>' ) no-repeat center center;
		}
	}

	@media screen and (min-width: 768px) (orientation: portrait) {
		.banner--<?php echo $section;?> {
			background: url( '<?php echo $bannerPortraitUrl;?>' ) no-repeat center top;
		}
	}

	@media screen and (min-width: 769px) {
		.banner--<?php echo $section;?> {
			background: url( '<?php echo $bannerLandscapeUrl;?>' ) no-repeat center center;
		}
	}

	.banner--<?php echo $section;?> {
		background-size: cover;
	}
</style>
<?php endif; ?>

<article class="banner banner--<?php echo $bannerHeight; ?> banner--<?php echo $section; ?> align--<?php echo $bannerAlignment; ?>" id="section-<?php echo $section; ?>">
	
	<section class="overlay overlay--<?php echo $bannerAlignment; ?>">

		<div>

			<?php if( $bannerHeader ) : ?>
			<h1 class="banner__header"><?php echo $bannerHeader; ?></h1>
			<?php endif; ?>

			<?php if( $bannerCopy ) :?><p><?php echo $bannerCopy; ?></p><?php endif; ?>

			<?php 
				if( $bannerCtaRepeater ) :
					foreach( $bannerCtaRepeater as $cta ):
						$ctaText = $cta['bfb_cta_text'];
						$ctaUrl = $cta['bfb_cta_url'];
						if( $cta['bfb_new_window'] ):
						?>
					<a class="cta cta--<?php echo $bannerCtaSize;?>" href="<?php echo $ctaUrl; ?>" target="_blank" rel="noopener nofollow"><?php echo $ctaText; ?></a>
				<?php	else: ?>
					<a class="cta cta--<?php echo $bannerCtaSize;?>" href="<?php echo $ctaUrl; ?>"><?php echo $ctaText; ?></a>
					<?php endif;	
					endforeach;
				endif;
			?>

			<?php if( $bannerHeight === '100' ): ?>
				<a class="banner__scroll" href="#section--<?php echo $section + 1;?>">
					<span></span>
					<span></span>
					<span></span>
				</a>
				<?php endif; ?>

			</div>

	</section>

</article>

<?php $bannerImagesActive = false; ?>
