<?php
/**
 * Stanard config
 */	
	$sectionAlignment = get_sub_field( 'g_alignment' );
	$sectionTheme = get_sub_field('g_theme');

/**
 * Copy
 */	
	$sectionHeader = get_sub_field( 'g_main_header' );
	$sectionSubHeader = get_sub_field( 'g_sub_header' );
	$sectionCopy = get_sub_field( 'g_copy' );

/**
 * Gallery
 */
	$sectionGallery = get_sub_field( 'g_gallery' );
	$count = count( $sectionGallery );
	if( $count === 4 || $count === 8 ):
		$grid = 4;
	elseif( $count === 3 || $count === 6 ):
		$grid = 3;
	else:
		$grid = 2;
	endif;
?>

<article class="section section--gallery section--<?php echo $section; ?> theme--<?php echo $sectionTheme;?> align--<?php echo $sectionAlignment; ?>" id="section-<?php echo $section; ?>">
	
	<section class="container">
		
		<?php if( $sectionHeader ) : ?>
		<h1 class="banner__header"><?php echo $sectionHeader; ?></h1>
		<?php endif; ?>

		<?php if( $sectionSubHeader ) : ?>
		<h2 class="banner__sub-header"><?php echo $sectionSubHeader; ?></h2>
		<?php endif; ?>

		<?php if( $sectionCopy ) :  echo $sectionCopy;  endif; ?>

		<?php if( $sectionGallery ): ?>
		<section class="grid grid--<?php echo $grid;?>">
		<?php 
			foreach( $sectionGallery as $image ):
				$imageArray = $image['g_image'];
				$imageUrl = $imageArray['url'];
				$imageAlt = $imageArray['title'];
		?>
			<div class="block">
				<img class="rwd" src="<?php echo $imageUrl;?>" alt="<?php echo $imageAlt;?>">
			</div>
		<?php endforeach; ?>
		</section>
		<?php endif; ?>

	</section>

</article>


