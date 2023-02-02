import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, MediaUpload, MediaUploadCheck, RichText, URLInputButton, BlockControls, AlignmentToolbar, InspectorControls  } from '@wordpress/block-editor';
import { Button, TextControl, PanelBody  } from '@wordpress/components';

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
        },
        tituloHero: {
            type: 'string',
            source: 'html',
            selector: '.hero-block h1'            
        },
        textoHero: {
            type: 'string',
            source: 'html',
            selector: '.hero-block p'    
        },
        urlHero: {
            type: 'string',
            source: 'attribute',
            attribute: 'href'
        },
        alinearContenido: {
            type: 'string',
            default: 'center'
        }
    },
    edit: props => {
        const ALLOWED_MEDIA_TYPES = [ 'image' ];
        const {attributes:{imagenHero, tituloHero, textoHero, urlHero, alinearContenido}, setAttributes } = props;
        const onSeleccionarNuevaImagen = nuevaImagen =>{
             setAttributes({imagenHero: nuevaImagen.sizes.full.url})            
        }
        const onChageTitulo =nuevoTitulo =>{
            setAttributes({tituloHero: nuevoTitulo})
        }
        const onChageTexto =nuevoTexto =>{
            setAttributes({textoHero: nuevoTexto})
        }
        const onChangeUrl = nuevaUrl =>{
            setAttributes({urlHero: nuevaUrl})
        }
        const onChangeAlinearContenido = nuevaAlineacion =>{
            setAttributes({alinearContenido: nuevaAlineacion})
        }
        return(
            <>
                <InspectorControls>
                    <PanelBody
                        title={'Altura Hero'}
                        initialOpen={true}
                    >
                        <div className='components-base-control'>
                          <div className='components-base-control__field'>
                                <label className='components-base-control__label'>
                                      Altura en Pixeles
                                </label>
                                <TextControl
                                    type="number"
                                    max={700}
                                    min={300}
                                    step={10}
                                    value={500}
                                 />                               
                                
                          </div>
                        </div> 
                    </PanelBody>
                </InspectorControls>
                <div {...useBlockProps()}
                    className='hero-block'
                    style={{backgroundImage: `linear-gradient(rgba(0,0,0,.75), rgba(0,0,0,.75)), url( ${imagenHero} )`, textAlign: alinearContenido}}
                
                >
                    <BlockControls>
                        <AlignmentToolbar
                            onChange={onChangeAlinearContenido}
                            value={alinearContenido}
                        />
                    </BlockControls>
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

                    <h1 className='titulo'>
                        <RichText 
                            placeholder={'Agrega el Titulo del Hero'}
                            onChange={onChageTitulo}
                            value={tituloHero}

                        />
                    </h1>
                    <p>
                        <RichText 
                            placeholder={'Agrega el Texto del Hero'}
                            onChange={onChageTexto}
                            value={textoHero}
                        />
                    </p>

                    <div>
                        <a href={urlHero} className="boton boton-primario">Leer Más</a>
                    </div>
                    <URLInputButton
                        onChange={onChangeUrl}
                        url={urlHero}
                    />

                </div>
            </>
        )
    },
    save: props => {
        //const ALLOWED_MEDIA_TYPES = [ 'image' ];
        const {attributes:{imagenHero, tituloHero, textoHero, urlHero, alinearContenido}, setAttributes } = props;
        return(
            <div 
                className='hero-block'
                style={{backgroundImage: `linear-gradient(rgba(0,0,0,.75), rgba(0,0,0,.75)), url( ${imagenHero} )`, textAlign: alinearContenido}}
            
            >
                <h1 className='titulo'>
                    <RichText.Content value={tituloHero} />
                </h1>
                <p>
                    <RichText.Content value={textoHero} />
                </p>

                <div>
                    <a href={urlHero} className="boton boton-primario">Leer Más</a>
                </div>
               

            </div>
        )
    }

})