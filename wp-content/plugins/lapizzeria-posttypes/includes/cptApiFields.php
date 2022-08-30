<?php
namespace laPizeria\ApiFields;
class cptApiFields{
    private $cptName;

    public function __construct(string $cptName)
    {
        $this->cptName=$cptName;
    }

    public function addToPluginApi()
    {
        add_action('rest_api_init',  array($this, 'addFieldsToAPI') );
    }

    public function addFieldsToAPI()
    {
        $this->registerRestField('precio','getCptPrecio');
        $this->registerRestField('categoria_menu','getCptTaxonomiaMenu');
        $this->registerRestField('imagen_destacada','getCptImagenDestacada');
    }

    public function registerRestField(string $fieldName, string $getCallback, string $updateCallback=NULL, string $schema=NULL)
    {
        $args=$this->setRestFieldArguments($getCallback,$updateCallback,$schema);
        register_rest_field($this->cptName,$fieldName,$args);
    }
    public function setRestFieldArguments(string $getCallback, string $updateCallback=NULL, string $schema=NULL)
    {
        $getCallback    =($getCallback!=NULL)?array($this,$getCallback):NULL;
        $updateCallback =($updateCallback!=NULL)?array($this,$updateCallback):NULL;
        $schema         =($schema!=NULL)?array($this,$schema):NULL;
        return array(            
                'get_callback' => $getCallback,
                'update_callback' => $updateCallback,
                'schema' => $schema            
        );
    }

    public function getCptPrecio() 
    {
        if(!function_exists('get_field')) 
        {
            return;
        }
        if(get_field('precio')) 
        {
            return get_field('precio');
        }
        return false;
    }
    
    public function getCptTaxonomiaMenu() {
        global $post;
        return get_object_taxonomies($post);
    }
    
    public function getCptImagenDestacada($object, $field_name, $request) {
        if($object['featured_media']) {
            $imagen = wp_get_attachment_image_src( $object['featured_media'], 'especialidades' );
            return $imagen[0];
        }
        return false;
    }
}