<article class="section section--copy section--copy-form section--<?php echo $section; ?> theme--primary align--center" id="section-<?php echo $section; ?>">
	
	<section class="container container--600">

		<?php
			$form = GFAPI::get_form('1'); // ID for Request a demo form
		?>

		<div class="block">
			<h2 class="section__header"><?php echo $form['title']; ?></h2>

			<div class="copy-form__description">
				<?php echo $form['description']; ?>
			</div>
		</div>

		<section class="block clearfix">
			<?php
				gravity_form( $form['title'], $display_title = false, $display_description = false, $display_inactive = false, $field_values = null, $ajax = true, $tabindex = 3, $echo = true );
			?>
    </section>
    
    <p>Want to know more? <a href="">Download our brochure here!</a></p>
		
	</section>
	
</article>