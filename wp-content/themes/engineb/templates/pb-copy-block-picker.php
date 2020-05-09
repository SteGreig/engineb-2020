<?php
/**
 * Stanard config
 */	
 	$sectionAlignment = get_sub_field( 'cbp_alignment' );
	$sectionTheme = get_sub_field( 'cbp_theme' );
/**
 * Copy
 */	
	$sectionHeader = get_sub_field( 'cbp_main_header' );
	$sectionSubHeader = get_sub_field( 'cbp_sub_header' );
	$sectionCopy = get_sub_field( 'cbp_copy' );

/**
 */
	$sectionBlocks = get_sub_field( 'cbp_blocks' );
	$count = count( $sectionBlocks );
	if( $count === 4 || $count === 8 ):
		$grid = 4;
	elseif( $count === 3 || $count === 6 ):
		$grid = 3;
	else:
		$grid = 2;
	endif;
?>

<article class="section section--copy section--copy-blocks section--<?php echo $section; ?> theme--<?php echo $sectionTheme;?> align--<?php echo $sectionAlignment; ?>" id="section-<?php echo $section; ?>">
	
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
				foreach( $sectionBlocks as $block ):
					$blockAlignment = $block['cbp_block_alignment'];
					$blockArticle = $block['cbp_cta_article'];
					$blockCtaText = $block['cbp_cta_text'];
					$blockCtaExternal = $block['cbp_new_window'];
				?>
				<article class="block align--<?php echo $blockAlignment; ?>">

				<?php 
					$post_object = $blockArticle;

					if( $post_object ): 
						$post = $post_object;
						setup_postdata( $post );
				?>

					<h3><?php the_title(); ?></h3>
					
					<p><?php the_excerpt(); ?></p>

					<a class="cta cta--sm" href="<?php the_permalink(); ?>" <?php if( $blockCtaExternal ): echo ' target="_blank" rel="noopener nofollow"'; endif;?>><?php echo $blockCtaText; ?></a>
					<?php wp_reset_postdata();endif;?>
				</article>
				<?php endforeach; ?>

			</section>
	</section>

</article>
