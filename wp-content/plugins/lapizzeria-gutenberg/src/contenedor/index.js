import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, MediaUpload, MediaUploadCheck, RichText, URLInputButton, InspectorControls, ColorPalette, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { Button, PanelBody } from '@wordpress/components';
// Logo para el bloque
import { ReactComponent as Logo } from '../pizzeria-icon.svg';

registerBlockType('lapizzeria/contenedor',{
    apiVersion: 2,
    title: 'Pizzeria Contenedor',
    icon: {src: Logo},
    category: 'lapizzeria',
    attributes:{
        imagenFondo: {
            type: 'string',
            selector: '.bloque-contendor'
        }
    },
    edit: ({attributes,setAttributes})=>{
        const ALLOWED_MEDIA_TYPES = [ 'image' ];
        const onSeleccionarNuevaImagen = (nuevaImagen) =>
        {
            setAttributes({imagenFondo: nuevaImagen.sizes.full.url})  
        }
        return(
            <div { ...useBlockProps() } 
                className='bloque-contendor'
                style={{ backgroundImage:`url(${attributes.imagenFondo})`}}
            >
                <div className='contenido-bloque'>
                    <div className='imagen-fondo'>
                    <MediaUploadCheck>
                        <MediaUpload 
                            onSelect={ onSeleccionarNuevaImagen 
                            }
                            allowedTypes={ ALLOWED_MEDIA_TYPES }
                            render={ ( { open } ) => (
                                <Button onClick={ open }>Elegir imagen de fondo</Button>
                            ) }
                        />
                    </MediaUploadCheck>                        
                    </div>
                    <div className='bloques-internos'>
                        {/*TODO: Bloques Internos*/}
                        <p>Hola</p>
                    </div>
                </div>
            </div>
        )
    },
    save: ({attributes}) => {
        return(
            <h1>Front</h1>
        )

    }
})