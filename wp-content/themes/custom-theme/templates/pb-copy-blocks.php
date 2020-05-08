<?php
/**
 * Stanard config
 */	
	$sectionAlignment = get_sub_field( 'cb_alignment' );
	$sectionTheme = get_sub_field( 'cb_theme' );
/**
 * Copy
 */	
	$sectionHeader = get_sub_field( 'cb_main_header' );
	$sectionSubHeader = get_sub_field( 'cb_sub_header' );
	$sectionCopy = get_sub_field( 'cb_copy' );
/**
 * Section Blocks
*/
	$sectionBlocks = get_sub_field( 'cb_blocks' );
	$count = count( $sectionBlocks );
	if( $count === 4 || $count === 8 ):
		$grid = 4;
	elseif( $count === 3 || $count === 6 ):
		$grid = 3;
	else:
		$grid = 2;
	endif;
?>

<article class="section section--copy section--copy-blocks section--<?php echo $section; ?> theme--<?php echo $sectionTheme; ?> align--<?php echo $sectionAlignment; ?>" id="section-<?php echo $section; ?>">
	
<section class="container">
		
		<?php if( $sectionHeader ) : ?>
		<h1 class="banner__header"><?php echo $sectionHeader; ?></h1>
		<?php endif; ?>

		<?php if( $sectionSubHeader ) : ?>
		<h2 class="banner__sub-header"><?php echo $sectionSubHeader; ?></h2>
		<?php endif; ?>

		<?php if( $sectionCopy ) :  echo $sectionCopy;  endif; ?>

		<section class="grid grid--<?php echo $grid; ?>">
		<?php
			foreach( $sectionBlocks as $block ) :
				$blockAlignment = $block['cb_block_alignment'];
				$blockImageArray = $block['cb_block_image'];
				$blockImageUrl = $blockImageArray['sizes']['medium'];
				$blockHeader = $block['cb_block_header'];
				$blockCopy = $block['cb_block_content'];
				$blockCta = $block['cb_cta'];
				$blockCtaText = $blockCta['cb_cta_text'];
				$blockCtaUrl = $blockCta['cb_cta_url'];
				$blockCtaExternal = false;
				if( $blockCta['cb_new_window'] ):
					$blockCtaExternal = true;
				endif;
		?>
				<article class="block align--<?php echo $blockAlignment; ?>">

					<img class="rwd" src="<?php echo $blockImageUrl;?>" alt="">
						
					<?php if( $blockHeader ) : ?>
					<h3><?php echo $blockHeader; ?></h3>
					<?php endif; ?>

					<?php if( $blockCopy ): echo $blockCopy; endif; ?>
						
					<a class="cta cta--sm"  href="<?php echo $blockCtaUrl; ?>" <?php if( $blockCtaExternal ): echo ' target="_blank" rel="noopener nofollow"'; endif;?>><?php echo $blockCtaText; ?></a>

				</article>

		<?php $blockCtaExternal = false; endforeach; ?>
		</section>

	</section>

</article>
