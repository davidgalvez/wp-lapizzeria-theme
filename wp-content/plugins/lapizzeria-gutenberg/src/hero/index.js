import { registerBlockType } from '@wordpress/blocks';
import { MediaUpload, MediaUploadCheck  } from '@wordpress/block-editor';
import { Button  } from '@wordpress/components';

//logo para el bloque
import { ReactComponent as Logo } from '../pizzeria-icon.svg';

registerBlockType('lapizzeria/hero',{
    title: 'La Pizzeria Hero',
    icon: {src: Logo},
    category: 'lapizzeria',
    attributes: {
        imagenHero: {
            type: 'string',
            selector: '.hero-block'
        }
    },
    edit: props => {
        const ALLOWED_MEDIA_TYPES = [ 'image' ];
        const {attributes:{imagenHero}, setAttributes } = props;
        const onSeleccionarNuevaImagen = nuevaImagen =>{
             setAttributes({imagenHero: nuevaImagen.sizes.full.url})            
        }
        return(
            <div 
                className='hero-block'
                style={{backgroundImage: `linear-gradient(rgba(0,0,0,.75), rgba(0,0,0,.75)), url( ${imagenHero} )`}}
            
            >
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