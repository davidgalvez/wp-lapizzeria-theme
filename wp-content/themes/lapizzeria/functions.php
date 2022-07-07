<?php

function lappizeria_setup() {

    //Imagenes destacadas
    add_theme_support( 'post-thumbnails' );
}
add_action( 'after_setup_theme', 'lappizeria_setup' );

/* Lapizzeria JS Y CSS */
function lapizzeria_styles(){
    wp_enqueue_style( 'normalize', 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css', array(), '8.0.1' );
    wp_enqueue_style( 'slicknav', 'https://cdnjs.cloudflare.com/ajax/libs/SlickNav/1.0.10/slicknav.min.css', array('normalize'), '1.0.10' );
    wp_enqueue_style( 'googlefonts', 'https://fonts.googleapis.com/css2?family=Open+Sans&family=Raleway:wght@400;700;900&display=swap', array(), '1.0.0');
    wp_enqueue_style( 'style', get_stylesheet_uri(), array('normalize'), '1.0.0');

    wp_enqueue_script( 'jquery');
    wp_enqueue_script( 'slicknav', 'https://cdnjs.cloudflare.com/ajax/libs/SlickNav/1.0.10/jquery.slicknav.min.js', array('jquery'), '1.0.10', true );
    wp_enqueue_script( 'scripts', get_template_directory_uri().'/js/scripts.js', array('jquery'), '1.0.0', true );

}
add_action( 'wp_enqueue_scripts', 'lapizzeria_styles');

/* Lapizzeria Menus */
function lapizzeria_menus(){ 
    register_nav_menus(array(
            'header-menu' => 'Header Menu' ,
            'redes-sociales' => 'Redes Sociales'
    ));
}
add_action('init','lapizzeria_menus');
?>