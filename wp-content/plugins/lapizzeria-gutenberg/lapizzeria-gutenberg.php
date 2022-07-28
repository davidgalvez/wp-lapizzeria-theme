<?php 
/*
    plugin Name: La Pizzeria Gutenberg blocks
    PLugin URI:
    Description: Agrega bloques de Gutenberg nativos para el theme Lapizzeria
    Version: 1.0
    Author: David Henry Galvez Valverde
    Author URI: https://davidgalvezv.wordpress.com/
    License: GPL2
    License URI: https:www.gnu.org/licenses/gpl-2.0.html
*/

if(!defined('ABSPATH')) exit;

/** Registrar bloques, scripts y CSS */

function lapizzeria_registrar_bloques()
{
    //Si gutemberg no existe, salir
    if(function_exists('register_block_type'))
    {
        return;
    }

    // Registrar los bloques en el editor
    wp_register_script
    (
        'lapizzeria-editor-script', //nombre unico
        plugins_url('build/index.js',__FILE__), //archivo con los bloques
        array('wp-blocks','wp-i18n','wp-element', 'wp-editor'), //dependencias
        filemtime(plugin_dir_path(__FILE__).'build/index.js') //version
    );
    
}
add_action('init', 'lapizzeria_registrar_bloques');