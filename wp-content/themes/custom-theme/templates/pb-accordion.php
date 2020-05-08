<?php
/**
 * Stanard config
 */	
	$sectionTheme = get_sub_field('ac_theme');

/**
 * Copy
 */	
	$sectionHeader = get_sub_field( 'ac_main_header' );
	$sectionSubHeader = get_sub_field( 'ac_sub_header' );
	$sectionCopy = get_sub_field( 'ac_copy' );


/**
 * Accordion
 */
	$sectionAccordion = get_sub_field( 'ac_accordion' );
?>

<article class="section section--accordion section--<?php echo $section; ?> theme--<?php echo $sectionTheme;?>" id="section-<?php echo $section; ?>">
	
	<section class="container">
		
		<?php if( $sectionHeader ) : ?>
		<h1 class="section__header"><?php echo $sectionHeader; ?></h1>
		<?php endif; ?>

		<?php if( $sectionSubHeader ) : ?>
		<h2 class="banner__sub-header"><?php echo $sectionSubHeader; ?></h2>
		<?php endif; ?>

		<?php if( $sectionCopy ) :  echo $sectionCopy;  endif; ?>

		<?php if( $sectionAccordion ): ?>
		<dl class="accordion">
		<?php 
			foreach( $sectionAccordion as $panel ):
				$panelHeader = $panel['ac_panel_header'];
				$panelContent = $panel['ac_panel_content'];
		?>
			<dt><a href=""><?php echo $panelHeader; ?></a></dt>
			<dd><?php echo $panelContent; ?></dd>
		<?php endforeach; ?>
		</dl>
		<?php endif; ?>


	</section>

</article>


