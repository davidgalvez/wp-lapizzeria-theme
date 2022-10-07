import { registerBlockType } from '@wordpress/blocks';
import { MediaUpload, MediaUploadCheck  } from '@wordpress/block-editor';
import { Button  } from '@wordpress/components';

import { ReactComponent as Logo } from '../pizzeria-icon.svg';

registerBlockType('lapizzeria/galeria',{
    title: 'La Pizzeria Galeria',
    icon: {src: Logo},
    category: 'lapizzeria',
    edit: props => {
        const ALLOWED_MEDIA_TYPES = [ 'image' ];

        const onSeleccionarNuevaImagen = nuevaImagen =>{
            console.log("nueva Imagen",nuevaImagen);
        }
        return(
            <div className='galeria-pizzeria'>
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={ onSeleccionarNuevaImagen /*( media ) =>
                            console.log( 'selected ', media.title )*/
                        }
                        allowedTypes={ ALLOWED_MEDIA_TYPES }                        
                        render={ ( { open } ) => (
                            <Button onClick={ open }>Abrir libreria</Button>
                        ) }
                    />
                </MediaUploadCheck>
            </div>
        );
    },
    save: props => {
        return(<h1>En el frontend</h1>);
    }
})