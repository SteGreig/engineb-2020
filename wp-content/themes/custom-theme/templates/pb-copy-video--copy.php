<div class="block">
	<?php if( $sectionHeader ) : ?>
		<h1 class="banner__header"><?php echo $sectionHeader; ?></h1>
		<?php endif; ?>


		<?php if( $sectionSubHeader ) : ?>
		<h2 class="banner__sub-header"><?php echo $sectionSubHeader; ?></h2>
		<?php endif; ?>

		<?php if( $sectionCopy ) : echo $sectionCopy; endif; ?>

		<?php 
			if( $sectionCtaRepeater ) :
				foreach( $sectionCtaRepeater as $cta ):
					$ctaText = $cta['cv_cta_text'];
					$ctaUrl = $cta['cv_cta_url'];
					if( $cta['cv_new_window'] ):
					?>
				<a class="cta cta--<?php echo $sectionCtaSize;?>" href="<?php echo $ctaUrl; ?>" target="_blank" rel="noopener nofollow"><?php echo $ctaText; ?></a>
			<?php	else: ?>
				<a class="cta cta--<?php echo $sectionCtaSize;?>" href="<?php echo $ctaUrl; ?>"><?php echo $ctaText; ?></a>
				<?php endif;	
				endforeach;
			endif;
		?>

</div>
