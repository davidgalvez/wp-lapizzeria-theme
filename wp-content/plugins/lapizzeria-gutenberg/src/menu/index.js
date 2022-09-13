import { registerBlockType } from '@wordpress/blocks';
import { withSelect } from '@wordpress/data';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl } from '@wordpress/components';

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
        },
        categoriaMenu:
        {
            type: "number"
        }
    },
    edit: withSelect((select, props)=>{

        //extraer valores de atributos
        const {attributes: {cantidadMostrar, categoriaMenu},setAttributes} = props;
        
        const onChangeCantidadMostrar = nuevaCantidad =>{
            setAttributes({cantidadMostrar:parseInt(nuevaCantidad)});            
        }
        const onChangeCategoriaMenu = nuevaCategoria =>{
            setAttributes({categoriaMenu: nuevaCategoria})
        }
        return {
            categorias: select("core").getEntityRecords('taxonomy','categoria-menu'),
            //Enviar una petición a la api
            especialidades: select("core").getEntityRecords('postType','especialidades',{
                'categoria-menu': categoriaMenu,
                per_page:cantidadMostrar
            }),
            onChangeCantidadMostrar,
            onChangeCategoriaMenu,
            props
        };
    })
    (({categorias, especialidades,onChangeCantidadMostrar,onChangeCategoriaMenu, props}) => {
        console.log(categorias);

        //extraer los props
        const {attributes: {cantidadMostrar, categoriaMenu},setAttributes} = props;

        //verificar especialidades
        if(!especialidades){
            return ('Cargando...');
        }

        //si no hay especialidades
        if(especialidades && especialidades.length===0){
            return 'No hay resultados';
        }

        //Verificar Categorias
        if(!categorias){
            return 'No hay categorias aun';
        }

        if(categorias && categorias.length===0){
            return 'No hay resultados';
        }

        //Generamos los label y values de las categorias para mostralo en el panel body
        categorias.forEach(categoria=>{
            categoria['label']=categoria.name;
            categoria['value']=categoria.id;
        })

        // Arreglo con valores por default
        const opcionDefault = [{value:' ',label:'--Todos--'}];

        const listadoCategorias= [...opcionDefault,...categorias];
                

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
                      <PanelBody                              
                            title={'Categoria de Especialidad'}
                            initialOpen={false}
                      >   
                            <div className='components-base-control'>
                                  <div className='components-base-control__field'>
                                        <label className='components-base-control__label'>
                                        Categoria de Especialidad
                                        </label>
                                        <SelectControl 
                                            options={ listadoCategorias }
                                            onChange={onChangeCategoriaMenu}
                                            value={categoriaMenu}
                                        />
                                  </div>
                            </div>                                    
                      </PanelBody>
                </InspectorControls>
                <h2 className="titulo-menu">Nuestras Especialidades</h2>
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