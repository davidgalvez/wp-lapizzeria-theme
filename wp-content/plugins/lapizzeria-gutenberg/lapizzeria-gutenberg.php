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

/** Categorías personalizadas */
function lapizzeria_categoria_personalizada($categories, $post)
{
    return array_merge(
        $categories,        
        array(
            array(
             'slug' =>'lapizzeria',
            'title'=> 'La Pizzeria',
            'icon' => 'store'
            )
        )  
    );
}
add_filter('block_categories_all','lapizzeria_categoria_personalizada',10,2);

/** Registrar bloques, scripts y CSS */

function lapizzeria_registrar_bloques()
{
    //Si gutemberg no existe, salir
    if(!function_exists('register_block_type'))
    {
        return;
    }

    // Carga automáticamente las dependencias y versiones
    $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

    // Registrar los bloques en el editor
    wp_register_script
    (
        'lapizzeria-editor-script', //nombre unico
        plugins_url('build/index.js',__FILE__), //archivo con los bloques
        array('wp-blocks','wp-i18n','wp-element', 'wp-editor'), //dependencias
        filemtime(plugin_dir_path(__FILE__).'build/index.js') //version
    );

    // Estilos para el editor unicamente
    wp_register_style
    (
        'lapizzeria-editor-styles', //nombre
        plugins_url('src/css/editor.css',__FILE__), // archivo de css para el editor
        array('wp-edit-blocks'), //dependencias
        filemtime(plugin_dir_path(__FILE__).'src/css/editor.css')
    );

    // Estilos para los bloques (backend y frontend)
    wp_register_style
    (
        'lapizzeria-frontend-styles', //nombre
        plugins_url('src/css/styles.css',__FILE__), // archivo de css para el editor
        array(), //dependencias
        filemtime(plugin_dir_path(__FILE__).'src/css/styles.css')
    ); 

    // Arreglo de bloques
    $blocks= 
    [
        'lapizzeria/boxes',
        'lapizzeria/galeria',
        'lapizzeria/hero',
        'lapizzeria/textoimagen',
        'lapizzeria/contenedor'
    ];

    foreach($blocks as $block)
    {
        register_block_type
        ($block,array
            (
                'api_version' => 2,
                'editor_script' => 'lapizzeria-editor-script', //script principal para el editor
                'editor_style' => 'lapizzeria-editor-styles', //estilos para el editor
                'style' => 'lapizzeria-frontend-styles' // estilos  para el frontend

            )
        );
    }

    /**Registrar un bloque dinámico */
    lapizzeriaRegistrarBloqueDinamico();
}

add_action('init', 'lapizzeria_registrar_bloques');

/**Registrar un bloque dinámico */
function lapizzeriaRegistrarBloqueDinamico()
{
    register_block_type('lapizzeria/menu', array(
        'api_version' => 2,
        'editor_script' => 'lapizzeria-editor-script', //script principal para el editor
        'editor_style' => 'lapizzeria-editor-styles', //estilos para el editor
        'style' => 'lapizzeria-frontend-styles', // estilos  para el frontend
        'render_callback' => 'lapizzeriaEspecialiadesFrontEnd' //query a la base de datos
    ));
}

/**Consulta la base de datos para mostrar los resultados en el front end*/
function lapizzeriaEspecialiadesFrontEnd($atts)
{
    
    //Definimos valores iniciales para las variables de los atributos
    $cantidad=(isset($atts['cantidadMostrar']))?$atts['cantidadMostrar']:4;
    $titulo=(isset($atts['tituloBLoque']))?$atts['tituloBLoque']:'Nuestras Especialidades';
    $taxonomy=array();
    if(isset($atts['categoriaMenu']))
    {
        $taxonomy[]=array(
            'taxonomy' => 'categoria-menu',
            'terms' => $atts['categoriaMenu'],
            'field' => 'term_id'
        ) ;
    }
    /*echo "<pre>";
    var_dump($atts);
    echo "</pre>";*/
    $especialidades= wp_get_recent_posts(
        array(
            'post_type'=>'especialidades',
            'post_status'=>'publish',
            'numberposts'=>$cantidad,
            'tax_query' => $taxonomy
        )
        );
    //revisar que tenga resultados
    if(count($especialidades)==0)
    {
        return 'No hay especialidades';
    }

    $cuerpo='';
    $cuerpo .= '<h2 class="titulo-menu">'.$titulo.'</h2>';
    $cuerpo .= '<ul class="nuestro-menu">';
    foreach($especialidades as $esp):
        $post=get_post($esp['ID']);
        setup_postdata($post);
        $cuerpo.= sprintf(
            '<li>
                %1$s
                <div class="platillo">
                    <div class="precio-titulo">
                        <h3>%2$s</h3>
                        <p>$ %3$s</p>
                    </div>
                    <div class="contenido-platillo">
                        <p>
                            %4$s
                        </p>
                    </div>
                </div> 
            </li>',
            get_the_post_thumbnail($post,'especialidades'),
            get_the_title($post),
            get_field('precio',$post),
            substr(get_the_content($post),0,180)
        );
        wp_reset_postdata();
    endforeach;
    $cuerpo .= '</ul>';

    return $cuerpo;


}

/** Agregar lightbox al plugin*/
function lapizzeria_frontend_scripts()
{
    wp_enqueue_style('lightbox','https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/css/lightbox.min.css',array(),'2.11.3');
    wp_enqueue_script('lightboxjs','https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/js/lightbox.min.js', array('jquery'),'2.11.3',true);
}
add_action('wp_enqueue_scripts', 'lapizzeria_frontend_scripts');
