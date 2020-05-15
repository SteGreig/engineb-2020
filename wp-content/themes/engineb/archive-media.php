<?php get_header(); ?>

<article class="section theme--blue section--standard-pg">
  <section class="container">

    <h1 class="standard-pg__header">Media</h1>

    <div class="media-hero flex">
      <?php include('templates/media-post--featured.php'); ?>

      <div class="twitter-feed">
        <a class="twitter-timeline" data-height="590" href="https://twitter.com/EngineB_?ref_src=twsrc%5Etfw">Tweets by EngineB_</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </div>
    </div>

    <?php
    $args = array(
        'post_type'      => 'media',
        'posts_per_page' => 1000,
        'offset' => 1
    );

    $mediaposts = new WP_Query( $args );

    if ( $mediaposts->have_posts() ) : ?>

      <div class="media-posts-list flex flex-wrap">

        <?php while ( $mediaposts->have_posts() ) : $mediaposts->the_post(); ?>

          <?php include('templates/media-post.php'); ?>

        <?php endwhile; ?>

      </div>

    <?php endif; wp_reset_postdata(); ?>

      <div class="align--center">
        <p><a href="">Download our press pack</a></p>
      </div>

  </section>
</article>


<?php get_footer(); ?>