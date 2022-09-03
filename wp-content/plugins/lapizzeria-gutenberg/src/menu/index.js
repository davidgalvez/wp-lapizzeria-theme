import { registerBlockType } from '@wordpress/blocks';
import { withSelect } from '@wordpress/data';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

// Logo para el bloque
import { ReactComponent as Logo } from '../pizzeria-icon.svg';

registerBlockType('lapizzeria/menu', {
    apiVersion: 2,
    title: 'La Pizzeria Menu',
    icon: {src: Logo},
    category: 'lapizzeria',
    attributes: 
    {
        cantidadMostrar:
        {
            type: 'number',
            default: 4
        }
    },
    edit: withSelect((select, props)=>{

        //extraer valores de atributos
        const {attributes: {cantidadMostrar},setAttributes} = props;
        
        const onChangeCantidadMostrar = nuevaCantidad =>{
            setAttributes({cantidadMostrar:parseInt(nuevaCantidad)});            
        }
        return {
            //Enviar una petición a la api
            especialidades: select("core").getEntityRecords('postType','especialidades',{
                per_page:cantidadMostrar
            }),
            onChangeCantidadMostrar,
            props
        };
    })
    (({especialidades,onChangeCantidadMostrar,props}) => {
        console.log(especialidades);

        //extraer los props
        const {attributes: {cantidadMostrar},setAttributes} = props;

        return (
            <>
                <InspectorControls>
                      <PanelBody                              
                            title={'Cantidad a Mostrar'}
                            initialOpen={true}
                      >   
                            <div className='components-base-control'>
                                  <div className='components-base-control__field'>
                                        <label className='components-base-control__label'>
                                              Cantidad a Mostrar
                                        </label>
                                        <RangeControl 
                                            onChange={onChangeCantidadMostrar}
                                            min={2}
                                            max={10}
                                            value={cantidadMostrar}

                                        />
                                  </div>
                            </div>                                    
                      </PanelBody>
                </InspectorControls>
                <h2>Nuestras Especialidades</h2>
                <ul className='nuestro-menu'>
                    {especialidades.map(especialidad =>(
                        <li>
                            <img src={especialidad.imagen_destacada} />
                            <div className='platillo'>
                                <div className='precio-titulo'>
                                    <h3>{especialidad.title.rendered}</h3>
                                    <p>$ {especialidad.precio}</p>
                                </div>
                                <div className='contenido-platillo'>
                                    <p>
                                        <RichText.Content value={especialidad.content.rendered.substring(0,180)} />

                                    </p>
                                </div>
                            </div>                            
                        </li>
                    ))}
                </ul>
            </>
        )
    }),   
    save: () =>{
        return null;
    }
})