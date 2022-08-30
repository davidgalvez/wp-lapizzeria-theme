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
include("includes/cptApiFields.php");
use laPizeria\PostTypes\lapizzeriaPosttypes;
use laPizeria\PostTypes\lapizzeriaTaxonomies;
use laPizeria\ApiFields\cptApiFields;

$taxonomy=new lapizzeriaTaxonomies(LAPIZZERIA_TAXONOMY_NAME,LAPIZZERIA_TAXONOMY_LABELS,LAPIZZERIA_TAXONOMY_ARGS);
$posttype=new lapizzeriaPosttypes(LAPIZZERIA_ESPECIALIDADES_CPT_NAME,LAPIZZERIA_ESPECIALIDADES_CPT_LABELS,LAPIZZERIA_ESPECIALIDADES_CPT_ARGS);
$apiFields=new cptApiFields(LAPIZZERIA_ESPECIALIDADES_CPT_NAME);
$taxonomy->addPosttypes(array($posttype->getId()));
$posttype->addTaxonomies(array($taxonomy->getId()));
$posttype->addArguments(array('show_in_rest' => true,'rest_base'  => 'especialidades-api'));//Nombre de la ruta en la que se ubicará http://la-pizzeria.local/wp-json/wp/v2/
$taxonomy->addArguments(array('show_in_rest' => true,'rest_base'  => 'categoria-menu'));
$taxonomy->addToPlugin(0);
$posttype->addToPlugin(10);
$apiFields->addToPluginApi();