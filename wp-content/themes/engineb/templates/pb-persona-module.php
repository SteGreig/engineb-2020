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
  $sectionCopyExtra = get_sub_field( 'pm_additional_copy' );
	$sectionButtonText = get_sub_field( 'pm_button_text' );
?>

<article class="section section--persona <?php echo strtolower(str_replace(" ", "-", $sectionName)); ?> section--<?php echo $section; ?> theme--<?php echo $sectionTheme; ?> theme--<?php echo $sectionAlignment; ?>" id="<?php the_sub_field('pm_id'); ?>">

  <section class="persona-content flex flex-col">

    <h2 class="persona-content__section-name"><?php echo $sectionName; ?></h2>

    <div class="persona-content__block persona-content__block--img">
      <img class="lazyload" data-src="<?php echo $sectionImage['url']; ?>" alt="<?php echo $sectionHeader; ?> illustration">
    </div>

    <div class="persona-content__block persona-content__block--copy">
      <h3 class="persona-content__title"><?php echo $sectionHeader; ?></h3>
      <div class="persona-content__copy">
        <?php echo $sectionCopy; ?>
        <p class="persona-content__more">Read more</p>
        <div class="persona-content__additional"><?php echo $sectionCopyExtra; ?></div>
        <p class="persona-content__less">Read less</p>
      </div>
      <button data-dest="how-it-works" class="cta cta--white-<?php echo $sectionTheme; ?> cta--lg"><?php echo $sectionButtonText; ?></button>
    </div>
    
  </section>
	
</article>
