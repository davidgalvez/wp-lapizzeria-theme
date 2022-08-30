<?php 

/*
    Plugin Name: La Pizzeria - Especialidades
    Plugin URI: 
    Description: Añade Post Types al Sitio Web
    Version: 1.0.0
    Author: David Galvez Valverde
    Author URI: http://davidgalvez.wordpress.com
    Text Domain: lapizzeria
*/

if(!defined('ABSPATH')) die();
include("lapizzeria-config.php");
include("includes/posttypes.php");
use laPizeria\PostTypes\lapizzeriaPosttypes;
use laPizeria\PostTypes\lapizzeriaTaxonomies;

$taxonomy=new lapizzeriaTaxonomies(LAPIZZERIA_TAXONOMY_NAME,LAPIZZERIA_TAXONOMY_LABELS,LAPIZZERIA_TAXONOMY_ARGS);
$posttype=new lapizzeriaPosttypes(LAPIZZERIA_ESPECIALIDADES_CPT_NAME,LAPIZZERIA_ESPECIALIDADES_CPT_LABELS,LAPIZZERIA_ESPECIALIDADES_CPT_ARGS);
$taxonomy->addPosttypes(array($posttype->getId()));
$posttype->addTaxonomies(array($taxonomy->getId()));
$posttype->addArguments(array('show_in_rest' => true,'rest_base'  => 'especialidades-api'));//Nombre de la ruta en la que se ubicará http://la-pizzeria.local/wp-json/wp/v2/
$taxonomy->addArguments(array('show_in_rest' => true,'rest_base'  => 'categoria-menu'));
$taxonomy->addToPlugin(0);
$posttype->addToPlugin(10);




add_action('rest_api_init', 'lapizzeria_agregar_campos_rest_api');
function lapizzeria_agregar_campos_rest_api() {

    register_rest_field( 
        LAPIZZERIA_ESPECIALIDADES_CPT_NAME, 
        'precio', 
        array(
            'get_callback' => 'lapizzeria_obtener_precio',
            'update_callback' => null,
            'schema' => null
        ) 
    );

    register_rest_field( 
        LAPIZZERIA_ESPECIALIDADES_CPT_NAME, 
        'categoria_menu', 
        array(
            'get_callback' => 'lapizzeria_taxonomia_menu',
            'update_callback' => null,
            'schema' => null
        ) 
    );

    register_rest_field( 
        LAPIZZERIA_ESPECIALIDADES_CPT_NAME, 
        'imagen_destacada', 
        array(
            'get_callback' => 'lapizzeria_obtener_imagen_destacada',
            'update_callback' => null,
            'schema' => null
        ) 
    );
}


function lapizzeria_obtener_precio() {
    if(!function_exists('get_field')) {
        return;
    }
    if(get_field('precio')) {
        return get_field('precio');
    }
    return false;
}

function lapizzeria_taxonomia_menu() {
    global $post;
    return get_object_taxonomies($post);
}

function lapizzeria_obtener_imagen_destacada($object, $field_name, $request) {
    if($object['featured_media']) {
        $imagen = wp_get_attachment_image_src( $object['featured_media'], 'especialidades' );
        return $imagen[0];
    }
    return false;
}