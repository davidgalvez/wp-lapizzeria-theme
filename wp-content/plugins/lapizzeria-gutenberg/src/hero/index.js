import { registerBlockType } from '@wordpress/blocks';
import { MediaUpload, MediaUploadCheck  } from '@wordpress/block-editor';
import { Button  } from '@wordpress/components';

//logo para el bloque
import { ReactComponent as Logo } from '../pizzeria-icon.svg';

registerBlockType('lapizzeria/hero',{
    title: 'La Pizzeria Hero',
    icon: {src: Logo},
    category: 'lapizzeria',
    edit: props => {
        const ALLOWED_MEDIA_TYPES = [ 'image' ];
        const {attributes:{imagenes=[]}, setAttributes } = props;
        const onSeleccionarNuevaImagen = nuevaImagen =>{
            const imagen ={
                thumb: nuevaImagen.sizes.medium.url,
                full: nuevaImagen.sizes.full.url,
                id: nuevaImagen.id
            }

            setAttributes({imagenes: [...imagenes, imagen]})
            
        }
        return(
            <div className='hero-block'>
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
        )
    },
    save: props => {
        return(
            <h1>Frontend</h1>
        )
    }

})