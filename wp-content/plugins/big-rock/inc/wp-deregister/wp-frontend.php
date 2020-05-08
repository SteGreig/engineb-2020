<?php
	/**
	 * Disable gutenberg
	 */
	function bigrock_remove_gutenberg_styles() {
		wp_dequeue_style( 'wp-block-library' );
	}
	add_action( 'wp_enqueue_scripts', 'bigrock_remove_gutenberg_styles', 100 );

	/**
	 * Disable wp embed
	 */
	function bigrock_deregister_wp_embed(){
		wp_deregister_script( 'wp-embed' );
	}
	add_action( 'wp_footer', 'bigrock_deregister_wp_embed' );

	/**
	 * Remove s.w.org prefetch
	 */
	remove_action( 'wp_head', 'wp_resource_hints', 2 );
