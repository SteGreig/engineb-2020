<?php
  $buttonText = get_field('mpo_button_text');
  
  if(get_field('mpo_file')) {
    $buttonLink = get_field('mpo_file')['url'];
  } else {
    $buttonLink = get_field('mpo_link')['url'];
  }

  if(get_the_post_thumbnail_url($post->ID, 'large')) {
    $img = get_the_post_thumbnail_url($post->ID, 'large');
  } else {
    $img = get_stylesheet_directory_uri()."/assets/img/media-fallback.jpg";
  }
?>

<div class="media-post flex flex-col">

  <div class="media-post__img-wrap">
    <img class="lazyload" data-src="<?php echo $img; ?>">
  </div>

  <div class="media-post__text flex flex-col">
    <p class="media-post__meta"><?php the_time('F j, Y'); ?></p>

    <h2 class="media-post__title"><?php the_title(); ?></h2>

    <div class="media-post__desc"><?php the_content(); ?></div>

    <a target="_blank" href="<?php echo $buttonLink; ?>" class="cta cta--lg cta--orange-white"><?php echo $buttonText; ?></a>
  </div>
  
</div>