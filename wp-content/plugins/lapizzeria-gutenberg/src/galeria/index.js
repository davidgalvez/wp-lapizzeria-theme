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

        const borrarImagen = imagenIdex => {
            const nuevasImagenes = imagenes.filter((imagen,index) => index !== imagenIdex);
            console.log("nuevasImagenes:",nuevasImagenes);
            setAttributes({imagenes: nuevasImagenes});
        }

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
                    {imagenes.map((imagen, index) =>(
                        <li className='imagen'>
                            <div className='borrar-imagen' onClick={ () => borrarImagen(index)}>
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
        const{ attributes: {imagenes = []} } = props;
        if(imagenes.length === 0){
            return (
                <p>No hay imágenes</p>
            )
        }

        return(
            <div className='galeria-pizzeria'>
                <h2 className='texto-primario'>Galería</h2>
                <ul className='listado-imagenes'>
                    {imagenes.map(imagen =>(
                        <li className='imagen'>                            
                            <img src={imagen.thumb} />
                        </li>
                    ))}
                </ul>

            </div>           
        )
    }
})