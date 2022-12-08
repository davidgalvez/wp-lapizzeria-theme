import { registerBlockType } from '@wordpress/blocks';

//logo para el bloque
import { ReactComponent as Logo } from '../pizzeria-icon.svg';

registerBlockType('lapizzeria/hero',{
    title: 'La Pizzeria Hero',
    icon: {src: Logo},
    category: 'lapizzeria',
    edit: props => {
        return(
            <h1>Editor</h1>
        )
    },
    save: props => {
        return(
            <h1>Frontend</h1>
        )
    }

})