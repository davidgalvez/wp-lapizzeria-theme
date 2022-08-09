import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
// Logo para el bloque
import { ReactComponent as Logo } from '../pizzeria-icon.svg';


registerBlockType('lapizzeria/boxes',{
      apiVersion: 2,
      title: 'Pizzeria Cajas',
      icon: {src: Logo},
      category: 'lapizzeria',
      attributes: {
            headingBox : {
                  type: 'string',
                  source: 'html',
                  selector: '.box h2'
            },
            textoBox: {
                  type: 'string',
                  source: 'html',
                  selector: '.box p'
            },
            colorFondo: {
                  type: 'string'
            },
            colorTexto: {
                  type: 'string'
            }
      },
      edit: (props) =>{

            console.log(props);
            const blockProps = useBlockProps();
            //Extraer el contenido desde props
            const {attributes: {headingBox, textoBox, colorFondo, colorTexto }, setAttributes } = props;
            console.log(headingBox);

            const onChangeHeadingBox =(nuevoHeading) =>{
                  //console.log(nuevoHeading);
                  setAttributes({ headingBox: nuevoHeading});
            }
            const onChangeTextoBox = nuevoTexto =>{
                  setAttributes({ textoBox: nuevoTexto});
            }
            const onChangeColorFondo = nuevoColor =>{
                  console.log(nuevoColor);
                  setAttributes({ colorFondo: nuevoColor});
            }
            const onChangeColorTexto = nuevoColor =>{
                 
                  setAttributes({ colorTexto: nuevoColor});
            }
           
            return(
                  <>
                        <InspectorControls>
                              <PanelBody                              
                                    title={'Color de Fondo'}
                                    initialOpen={true}
                              >   
                                    <div className='components-base-control'>
                                          <div className='components-base-control__field'>
                                                <label className='components-base-control__label'>
                                                      Color de fondo
                                                </label>
                                                <ColorPalette
                                                      onChange={onChangeColorFondo}
                                                      value={colorFondo}
                                                />
                                          </div>
                                    </div>                                    
                              </PanelBody>
                              <PanelBody                              
                                    title={'Color de Texto'}
                                    initialOpen={false}
                              >   
                                    <div className='components-base-control'>
                                          <div className='components-base-control__field'>
                                                <label className='components-base-control__label'>
                                                      Color de texto
                                                </label>
                                                <ColorPalette
                                                      onChange={onChangeColorTexto}
                                                      value={colorTexto}
                                                />
                                          </div>
                                    </div>                                    
                              </PanelBody>
                              
                        </InspectorControls>
                        <div  className='box wp-block' style={{backgroundColor:colorFondo}} >
                              <h2 style={{color:colorTexto}}>
                                    <RichText 
                                                { ...blockProps }
                                                placeholder="Agrega el encabezado"
                                                onChange={onChangeHeadingBox}
                                                value={headingBox}
                                    />
                              </h2>
                              <p style={{color:colorTexto}}>
                                    <RichText 
                                               { ...blockProps } 
                                                placeholder="Agrega el texto"
                                                onChange={onChangeTextoBox}
                                                value={textoBox}
                                    />
                              </p>
                        </div>
                 </>
            )            
      },
      save: (props) =>{

            console.log(props);
            const blockProps = useBlockProps.save();
            //Extraer el contenido desde props
            const {attributes: {headingBox, textoBox, colorFondo, colorTexto } } = props;
            
            return(
                  <div   className='box' style={{backgroundColor:colorFondo}} >
                       <h2 style={{color:colorTexto}} >
                             <RichText.Content { ...blockProps }  value = {headingBox} />
                       </h2>
                       <p style={{color:colorTexto}} >
                              <RichText.Content { ...blockProps }  value = {textoBox} />
                       </p>
                 </div>
            )            
      }
});