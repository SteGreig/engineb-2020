<?php
			if( $sectionCompareBlocks ):?>
			<section class="grid grid--<?php echo $grid; ?>">
				<?php foreach( $sectionCompareBlocks as $block ):
					$blockAlignment = $block['com_block_alignment'];
					$blockHeader = $block['com_block_header'];
					$blockContent = $block['com_block_content'];
					$blockCta = $block['com_cta'];
					$blockCtaLink = $blockCta['com_cta_url'];
					$blockCtaText = $blockCta['com_cta_text'];
					$blockCtaNewWindow = $blockCta['com_new_window'];
		?>
			<article class="block compare align--<?php echo $blockAlignment; ?>">
					
					<h3><?php echo $blockHeader; ?></h3>
					
					<?php echo $blockContent; ?>

					<a class="cta cta--compare" href="<?php echo $blockCtaLink; ?>" <?php if( $blockCtaNewWindow ): echo ' target="_blank" rel="noopener nofollow"'; endif;?>><?php echo $blockCtaText; ?></a>

			</article>
		<?php 
				$blockCtaNewWindow = false; endforeach; ?>
				</section>
		<?php endif; ?>