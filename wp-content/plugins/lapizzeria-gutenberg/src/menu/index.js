import { registerBlockType } from '@wordpress/blocks';
import { withSelect } from '@wordpress/data';
import { RichText } from '@wordpress/block-editor';

// Logo para el bloque
import { ReactComponent as Logo } from '../pizzeria-icon.svg';

registerBlockType('lapizzeria/menu', {
    apiVersion: 2,
    title: 'La Pizzeria Menu',
    icon: {src: Logo},
    category: 'lapizzeria',
    edit: withSelect((select)=>{
        return {
            //Enviar una petición a la api
            especialidades: select("core").getEntityRecords('postType','especialidades')
        };
    })
    (({especialidades}) => {
        console.log(especialidades);
        return (
            <>
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