import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, MediaUpload, MediaUploadCheck, RichText, URLInputButton, BlockControls, AlignmentToolbar  } from '@wordpress/block-editor';
import { Button, TextControl, PanelBody  } from '@wordpress/components';
//logo para el bloque
import { ReactComponent as Logo } from '../pizzeria-icon.svg';

registerBlockType('lapizzeria/textoimagen',{
    title: 'Piezzeria Texto e Imagen',
    icon: {src: Logo},
    category: 'lapizzeria',
    attributes:{
        imagenFondo: {
            type: 'string',
            selector: '.ingredientes-bloque'
        }
    },
    edit: ({attributes,setAttributes})=>{
        const ALLOWED_MEDIA_TYPES = [ 'image' ];
        const onSeleccionarNuevaImagen = (nuevaImagen) =>{
            setAttributes({imagenFondo: nuevaImagen.sizes.full.url})            
       }
        return(
            <div { ...useBlockProps() } 
                className='ingredientes-bloque' 
                style={{ backgroundImage:`url(${attributes.imagenFondo})`}}
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
                <div className='contenido-ingredientes'>
                    <div className='texto-ingredientes'>

                    </div>
                    <div className='imagen-ingredientes'>

                    </div>
                </div>
            </div> 
        )
    },
    save: () => {
        return(
            <p>Desde el front end</p>
        )
    }
});