import { registerBlockType } from '@wordpress/blocks';
import { withSelect } from '@wordpress/data';

// Logo para el bloque
import { ReactComponent as Logo } from '../pizzeria-icon.svg';

registerBlockType('lapizzeria/menu', {
    apiVersion: 2,
    title: 'La Pizzeria Menu',
    icon: {src: Logo},
    category: 'lapizzeria',
    edit: () =>{
        return  (<><h1>en el editor</h1></>) 
    },
    save: () =>{
        return null;
    }
})