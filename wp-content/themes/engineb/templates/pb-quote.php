<?php
/**
 * Stanard config
 */	
	$sectionAlignment = get_sub_field( 'q_alignment' );
	$sectionTheme = get_sub_field('q_theme');
/**
* Quotes
*/
	$sectionQuotes = get_sub_field( 'q_quotes' );
?>



<article class="section section--quote section--<?php echo $section; ?> theme--<?php echo $sectionTheme;?> align--<?php echo $sectionAlignment; ?>" id="section-<?php echo $section; ?>">
	

	<section class="container">

		<?php
			if( $sectionQuotes ) :
			foreach( $sectionQuotes as $quote ):
				$mainQuote = $quote['q_quote'];
				$mainCite = $quote['q_person'];
				$mainAvatar = $quote['q_avatar']['sizes']['thumbnail'];
		?>
			<?php if( $mainQuote ):?>

			<?php if( $mainAvatar ): ?>
			<img loading="lazy" src="<?php echo $mainAvatar; ?>" alt="">
			<?php endif; ?>
			<blockquote>
				<p><?php echo $mainQuote; ?></p>
				<?php if( $mainCite ): ?><cite><?php echo $mainCite; ?></cite><?php endif; ?>
			</blockquote>
			<?php endif; ?>
			<?php endforeach; endif; ?>

	</section>

</article>


