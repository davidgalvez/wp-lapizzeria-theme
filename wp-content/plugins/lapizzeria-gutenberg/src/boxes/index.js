import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPalette } from '@wordpress/components';
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
            }
      },
      edit: (props) =>{

            console.log(props);
            const blockProps = useBlockProps();
            //Extraer el contenido desde props
            const {attributes: {headingBox, textoBox}, setAttributes } = props;
            console.log(headingBox);

            const onChangeHeadingBox =(nuevoHeading) =>{
                  //console.log(nuevoHeading);
                  setAttributes({ headingBox: nuevoHeading});
            }
            const onChangeTextoBox = nuevoTexto =>{
                  setAttributes({ textoBox: nuevoTexto});
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
                                                <ColorPalette />
                                          </div>
                                    </div>                                    
                              </PanelBody>
                              
                        </InspectorControls>
                        <div className='box'>
                              <h2>
                                    <RichText 
                                                { ...blockProps }
                                                placeholder="Agrega el encabezado"
                                                onChange={onChangeHeadingBox}
                                                value={headingBox}
                                    />
                              </h2>
                              <p>
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
            const {attributes: {headingBox, textoBox} } = props;
            
            return(
                  <div className='box'>
                       <h2>
                             <RichText.Content  { ...blockProps }  value = {headingBox} />
                       </h2>
                       <p>
                              <RichText.Content  { ...blockProps }  value = {textoBox} />
                       </p>
                 </div>
            )            
      }
});