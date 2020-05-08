<?php
	
	if( have_rows( 'sections' ) ):
	
		$section = 1;
	
		while ( have_rows( 'sections' ) ): the_row();

			if( get_row_layout() == 'banner_full_bleed' ):

					include( 'pb-banner-full-bleed.php' );
	
				elseif( get_row_layout() == 'copy_only' ):
	
					include( 'pb-copy-only.php' );

				elseif( get_row_layout() == 'copy_image' ):
	
					include( 'pb-copy-image.php' );

				elseif( get_row_layout() == 'copy_gravity_form' ):
				
					include( 'pb-copy-gravity-form.php' );

				elseif( get_row_layout() == 'copy_video' ):
	
					include( 'pb-copy-video.php' );

				elseif( get_row_layout() == 'copy_blocks' ):
	
					include( 'pb-copy-blocks.php' );
				
				elseif( get_row_layout() == 'copy_block_picker' ):
	
					include( 'pb-copy-block-picker.php' );

				elseif( get_row_layout() == 'compare' ):
	
					include( 'pb-compare.php' );

				elseif( get_row_layout() == 'full_width_video' ):
	
					include( 'pb-full-width-video.php' );

				elseif( get_row_layout() == 'quote' ):
	
					include( 'pb-quote.php' );
				
				elseif( get_row_layout() == 'accordion' ):
	
					include( 'pb-accordion.php' );

				elseif( get_row_layout() == 'gallery' ):
	
					include( 'pb-gallery.php' );
				
				elseif( get_row_layout() == 'google_map' ):
	
					include( 'pb-google-map.php' );
	
			endif;
	
			$section++;
		
		endwhile;
	
	endif;
