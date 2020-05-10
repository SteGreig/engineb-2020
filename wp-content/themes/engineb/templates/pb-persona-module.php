<?php
/**
 * Stanard config
 */
  $sectionTheme = get_sub_field( 'pm_theme' );
  $sectionAlignment = get_sub_field( 'pm_alignment' );
/**
 * Image
 */
	$sectionImage = get_sub_field( 'pm_image' );
/**
 * Copy
 */	
  $sectionName = get_sub_field( 'pm_section_name' );
	$sectionHeader = get_sub_field( 'pm_title' );
	$sectionCopy = get_sub_field( 'pm_copy' );
	$sectionButtonText = get_sub_field( 'pm_button_text' );
?>

<article class="section section--persona section--<?php echo $section; ?> theme--<?php echo $sectionTheme; ?> theme--<?php echo $sectionAlignment; ?>" id="section-<?php echo $section; ?>">

  <section class="persona-content flex flex-col">

    <h2 class="persona-content__section-name"><?php echo $sectionName; ?></h2>

    <div class="persona-content__block persona-content__block--img">
      <img class="lazyload" data-src="<?php echo $sectionImage['url']; ?>" alt="<?php echo $sectionHeader; ?> illustration">
    </div>

    <div class="persona-content__block persona-content__block--copy">
      <h3 class="persona-content__title"><?php echo $sectionHeader; ?></h3>
      <div class="persona-content__copy">
        <?php echo $sectionCopy; ?>
      </div>
      <button class="cta cta--white-<?php echo $sectionTheme; ?> cta--lg"><?php echo $sectionButtonText; ?></button>
    </div>
    
  </section>
	
</article>
