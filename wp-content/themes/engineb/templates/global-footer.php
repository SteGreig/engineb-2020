<footer class="footer theme--primary flex items-center">
    <p>&copy; <?php echo get_bloginfo()." ".date('Y'); ?></p>
    <?php
        wp_nav_menu([
            'menu' => 'Footer Links',
            'menu_class' => "footer-links",
            'container' => ''
        ]);
    ?>
</footer>