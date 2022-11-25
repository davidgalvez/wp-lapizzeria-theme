import { registerBlockType } from '@wordpress/blocks';
import { MediaUpload, MediaUploadCheck  } from '@wordpress/block-editor';
import { Button  } from '@wordpress/components';

import { ReactComponent as Logo } from '../pizzeria-icon.svg';

registerBlockType('lapizzeria/galeria',{
    title: 'La Pizzeria Galeria',
    icon: {src: Logo},
    category: 'lapizzeria',
    attributes: {
        imagenes: {
            type: 'array'
        }
    },
    edit: props => {
        const ALLOWED_MEDIA_TYPES = [ 'image' ];

        const {attributes:{imagenes=[]}, setAttributes } = props;

        console.log("imagenes",imagenes);

        const onSeleccionarNuevaImagen = nuevaImagen =>{
            const imagen ={
                thumb: nuevaImagen.sizes.medium.url,
                full: nuevaImagen.sizes.full.url,
                id: nuevaImagen.id
            }

            setAttributes({imagenes: [...imagenes, imagen]})
            
        }
        return(
            <div className='galeria-pizzeria'>
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

                <h2 className='texto-primario'>Galería</h2>
                <ul className='listado-imagenes'>
                    {imagenes.map(imagen =>(
                        <li className='imagen'>
                            <div className='borrar-imagen' onClick={ ()=>console.log("Eliminando...")}>
                                <span className='dashicons dashicons-trash'></span>
                            </div>
                            <img src={imagen.thumb} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    },
    save: props => {
        return(<h1>En el frontend</h1>);
    }
})