<?php
namespace laPizeria\ToolBox;
if(!defined('ABSPATH')) die();
class arrayPropertiesUpdator{
    function updateProperties(array $properties, array $newValues)
    {
        foreach($newValues as $key =>$value)
        {
            if(!array_key_exists($key, $properties))
            {
                $properties+=array($key=>$value);
            }else
            {
                $properties[$key] = $value;
            }
        }
        return $properties; 
    }
}