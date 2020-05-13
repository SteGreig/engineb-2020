<?php
$args = array(
    'post_type'      => 'media',
    'posts_per_page' => 1,
);
$latestpost = new WP_Query( $args );
if ( $latestpost->have_posts() ) : ?>
    <?php while ( $latestpost->have_posts() ) : $latestpost->the_post(); ?>

      <?php include('media-post.php'); ?>

    <?php endwhile; ?>
<?php endif; wp_reset_postdata(); ?>