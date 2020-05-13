<?php

	function br_media_posts() {
		$plural = 'Media Posts';
		$single = 'Media Post';
		$slug = 'media';
		// @link https://developer.wordpress.org/resource/dashicons/
		$dashicon = 'dashicons-admin-links';
		$menu_position = 5;
    $labels = array(
			'name' => $plural,
			'singular_name' => $single,
			'menu_name' => $plural,
			'name_admin_bar' => $plural,
			'parent_item_colon' => 'Parent Item:',
			'all_items' => 'All ' . $plural,
			'add_new_item' => 'Add New ' . $single,
			'add_new' => 'Add New ' . $single,
			'new_item' => 'New ' . $single,
			'edit_item' => 'Edit ' . $single,
			'update_item' => 'Update ' . $single,
			'view_item' => 'View ' . $single,
			'search_items' => 'Search ' . $plural,
			'not_found' => 'No ' . $plural . ' found',
			'not_found_in_trash'  => $single . ' not found in Trash'
    );
    $args = array(
			'label' => $plural,
			'description' =>  $plural,
			'labels' => $labels,
			'supports' => array( 'title', 'editor', 'thumbnail' ),
			'hierarchical' => false,
			'public' => true,
			'show_ui' => true,
			'show_in_menu' => true,
			'show_in_rest' => true,
			'rest_base' => $plural,
			'menu_position' => $menu_position,
			'menu_icon' => $dashicon,
			'show_in_admin_bar' => true,
			'show_in_nav_menus' => true,
			'can_export' => true,
			'has_archive' => true,
			'exclude_from_search' => false,
			'publicly_queryable' => true,
			'capability_type' => 'post'
		);
    register_post_type( $slug , $args );
	}
	add_action( 'init', 'br_media_posts', 0 );
