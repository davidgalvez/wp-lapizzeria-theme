import { registerBlockType } from '@wordpress/blocks';
import { RichText} from '@wordpress/block-editor';

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
            }
      },
      edit: (props) =>{

            console.log(props);
            //Extraer el contenido desde props
            const {attributes: {headingBox}, setAttributes } = props;
            console.log(headingBox);

            const onChangeHeadingBox =(nuevoHeading) =>{
                  //console.log(nuevoHeading);
                  setAttributes({ headingBox: nuevoHeading});
            }
            return(
                 <div className='box'>
                       <h2>
                             <RichText 
                                    placeholder="Agrega el encabezado"
                                    onChange={onChangeHeadingBox}
                             />
                       </h2>
                 </div>
            )            
      },
      save: () =>{
            return(
                  <h1>Se ve en el frontend</h1>
            )            
      }
});