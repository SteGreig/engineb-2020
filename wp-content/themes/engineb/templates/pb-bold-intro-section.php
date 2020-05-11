
<article class="section section--intro section--<?php echo $section; ?> flex flex-col align--center" id="<?php the_sub_field('bis_id'); ?>">

  <div class="w100 theme--grey section--intro__copy flex items-center justify-center">
    <section class="container--intro-copy">

      <?php the_sub_field('bis_bold_intro_copy'); ?>
      
    </section>
  </div>

  <?php if(have_rows('bis_ctas')): ?>
  <div class="w100 theme--white section--intro__ctas flex items-center justify-center">
    <section class="container--intro-ctas flex flex-col justify-center">

      <?php while(have_rows('bis_ctas')): the_row(); ?>

        <button data-dest="<?php the_sub_field('bis_cta_destination'); ?>" class="cta cta--lg cta--<?php the_sub_field('bis_cta_colour'); ?>-white"><?php the_sub_field('bis_cta_text'); ?></button>

      <?php endwhile; ?>
      
    </section>
  </div>
  <?php endif; ?>
	
</article>
