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
        },
        tituloBloque: {
            type: 'string',
            source: 'html',
            selector: '.texto-ingredientes h1'
        },
        textoBloque: {
            type: 'string',
            source: 'html',
            selector: '.texto-ingredientes p'
        },
        urlBloque: {
            type: 'string',
            source: 'attribute',
            attribute: 'href'
        },

    },
    edit: ({attributes,setAttributes})=>{
        const ALLOWED_MEDIA_TYPES = [ 'image' ];
        const onSeleccionarNuevaImagen = (nuevaImagen) =>
        {
            setAttributes({imagenFondo: nuevaImagen.sizes.full.url})  
        }
        const onChageTitulo = (nuevoTitulo)=>
        {
            setAttributes({tituloBloque:nuevoTitulo})
        } 
        const onChageTexto = (nuevoTexto)=>
        {
            setAttributes({textoBloque:nuevoTexto})
        } 
        const onChangeUrl = (nuevaUrl)=>
        {
            setAttributes({urlBloque:nuevaUrl})
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
                            <h1 className='titulo'>
                                <RichText 
                                    placeholder='Agrega el titulo del Hero'
                                    onChange={onChageTitulo}
                                    value={attributes.tituloBloque}
                                />
                            </h1>
                            <p>
                                <RichText 
                                    placeholder='Agrega el texto del Hero'
                                    onChange={onChageTexto}
                                    value={attributes.textoBloque}
                                />
                            </p>
                            <div>
                                <a href={attributes.urlBloque} className="boton boton-secundario">Leer Más</a>
                            </div>
                            <URLInputButton
                                onChange={onChangeUrl}
                                url={attributes.urlBloque}
                            />
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