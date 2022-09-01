import { registerBlockType } from '@wordpress/blocks';
import { withSelect } from '@wordpress/data';

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
                            <h3>{especialidad.title.rendered}</h3>
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