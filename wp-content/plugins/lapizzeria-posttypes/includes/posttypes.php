<?php
namespace laPizeria\PostTypes;
if(!defined('ABSPATH')) die();
include("Toolbox.php");
use lapizeria\ToolBox\arrayPropertiesUpdator;

interface PluginPostTypesTaxonomies
{    
    public function __construct(string $id, array $labels, array $arguments);
    public function setLabels(array $labels);
    public function setLabelsToArguments();
    public function setArguments(array $arguments);
    public function addLabels(array $labels);
    public function addArguments(array $arguments);
    public function setId(string $id);
    public function getLabels();    
    public function getArguments();
    public function getId();
    public function registerObject();
    public function addToPlugin(int $priority);
}
interface PluginPostTypes extends PluginPostTypesTaxonomies
{
    public function addTaxonomies(array $taxonomies);
    //public function registerPosttype();
}
interface PluginTaxonomy extends PluginPostTypesTaxonomies
{
    public function addPosttypes(array $postTypes);
    //public function registerTaxonomy();
}

abstract class laPizzeriaBasePostTypesTaxonomies implements PluginPostTypesTaxonomies
{
    private $id;
    private  $labels;
    private  $arguments;
    public function __construct(string $id, array $labels, array $arguments){
        $this->setId($id);
        $this->setLabels($labels);
        $this->setArguments($arguments);
        $this->setLabelsToArguments();
    }
    public function setId(string $id)
    {
        $this->id=$id;
    }
    public function setLabels(array $labels){
        $this->labels=$labels;        
    }    
    public function setArguments(array $arguments){        
        $this->arguments=$arguments;
    }
    public function setLabelsToArguments(){
        $this->addArguments(array('labels'=>$this->getLabels()));        
    }
    public function addLabels(array $newLabels)
    {
        $propertiesUpdator=new arrayPropertiesUpdator;
        $this->labels=$propertiesUpdator->updateProperties($this->labels,$newLabels);             
        
    }
    public function addArguments(array $newArguments)
    {
        $propertiesUpdator=new arrayPropertiesUpdator;
        $this->arguments=$propertiesUpdator->updateProperties($this->arguments,$newArguments);        
    }    
    
    public function getLabels()
    {
        return $this->labels;
    }
    
    public function getArguments()
    {
        return $this->arguments;
    }    
    
    public function getId()
    {
        return $this->id;
    }

    abstract function registerObject();

    public function addToPlugin(int $priority)
    {
        add_action( 'init', array($this, 'registerObject'), $priority );
    }
}

class lapizzeriaPosttypes extends laPizzeriaBasePostTypesTaxonomies implements PluginPostTypes
{
    
    public function addTaxonomies(array $taxonomies)
    {
        $this->addArguments(array('taxonomies',$taxonomies));
    }
    public function registerObject()
    {
        register_post_type( $this->getId(), $this->getArguments());
    }
   
}

class lapizzeriaTaxonomies extends laPizzeriaBasePostTypesTaxonomies implements PluginTaxonomy
{
    private $postTypesList;
    public function addPosttypes(array $postTypesList){
        $this->postTypesList=$postTypesList;
    }
    public function registerObject()
    {
        register_taxonomy( $this->getId(), $this->postTypesList, $this->getArguments() );
    }
   
}