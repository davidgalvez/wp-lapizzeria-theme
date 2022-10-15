import { registerBlockType } from '@wordpress/blocks';
import { MediaUpload, MediaUploadCheck  } from '@wordpress/block-editor';
import { Button  } from '@wordpress/components';

import { ReactComponent as Logo } from '../pizzeria-icon.svg';

registerBlockType('lapizzeria/galeria',{
    title: 'La Pizzeria Galeria',
    icon: {src: Logo},
    category: 'lapizzeria',
    attributes: {
        imagenes: {
            type: 'array'
        }
    },
    edit: props => {
        const ALLOWED_MEDIA_TYPES = [ 'image' ];

        const {attributes:{imagenes=[]}, setAttributes } = props;

        console.log("imagenes",imagenes);
        
        const onSeleccionarNuevaImagen = nuevaImagen =>{
            const imagen ={
                thumb: nuevaImagen.sizes.medium.url,
                full: nuevaImagen.sizes.full.url,
                id: nuevaImagen.id
            }

            setAttributes({imagenes: [...imagenes, imagen]})
            
        }
        return(
            <div className='galeria-pizzeria'>
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={ onSeleccionarNuevaImagen 
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