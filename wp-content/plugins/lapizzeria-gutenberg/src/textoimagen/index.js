import { registerBlockType } from '@wordpress/blocks';

//logo para el bloque
import { ReactComponent as Logo } from '../pizzeria-icon.svg';

registerBlockType('lapizzeria/textoimagen',{
    title: 'Piezzeria Texto e Imagen',
    icon: {src: Logo},
    category: 'lapizzeria',
    edit: ()=>{
        return(
            <p>Desde el editor</p>
        )
    },
    save: () => {
        return(
            <p>Desde el front end</p>
        )
    }
});