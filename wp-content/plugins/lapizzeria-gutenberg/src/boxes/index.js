//const { registerBlockType } = wp.blocks;
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
// Logo para el bloque
import { ReactComponent as Logo } from '../pizzeria-icon.svg';


registerBlockType('lapizzeria/boxes',{
      apiVersion: 2,
      title: 'Pizzeria Cajas',
      icon: {src: Logo},
      category: 'lapizzeria',
      edit: () =>{
            return(
                  <h1>Se ve en el editor</h1>
            )            
      },
      save: () =>{
            return(
                  <h1>Se ve en el frontend</h1>
            )            
      }
});