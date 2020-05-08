<?php
/**
 * Stanard config
 */	
	$sectionAlignment = get_sub_field( 'com_alignment' );
	$sectionTheme = get_sub_field( 'com_theme' );
	
/**
 * Copy
 */	
	$sectionHeader = get_sub_field( 'com_main_header' );
	$sectionSubHeader = get_sub_field( 'com_sub_header' );
	$sectionCopy = get_sub_field( 'com_copy' );

/**
 * Compare blocks
 */
	$sectionCompareBlocks = get_sub_field( 'com_blocks' );
	$count = count( $sectionCompareBlocks );
	if( $count === 4 ):
		$grid = 4;
	elseif( $count === 3 ):
		$grid = 3;
	else:
		$grid = 2;
	endif;
?>

<article class="section section--copy section--copy-blocks section--<?php echo $section; ?> theme--<?php echo $sectionTheme;?> align--<?php echo $sectionAlignment; ?>" id="section-<?php echo $section; ?>">
	
	<section class="container">
		
<?php 
	if( $count === 4 ):
		include( 'pb-compare-copy.php' );
		include( 'pb-compare-blocks.php' );
	else:
	?>
	<section class="grid grid--2">
		<div class="block">
			<?php include( 'pb-compare-copy.php' ); ?>
		</div>
		<div class="block">
			<?php include( 'pb-compare-blocks.php' ); ?>
		</div>
	</section>
	<?php 
	endif;
?>




	</section>

</article>
