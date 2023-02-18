/* 7️⃣ ***COMPONENTE FutbolistaCard*** 7️⃣

Implementar el componente FutbolistaCard.
📢¡Sigue las instrucciones de los tests!📢

REQUISITOS
🟢 Tendrás que renderizar una serie de etiquetas HTML que incluyan texto y propiedades.
🟢 Tendrás que despachar una action para eliminar un jugador específico.

IMPORTANTE
❗Este componente debe ser FUNCIONAL.
❗Importar las actions como Object Modules, ¡sino los test no funcionarán!
*/
import './futbolistaCard.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionsCreators from '../../redux/actions/index'

const FutbolistaCard = (props) => {

   const {deleteFutbolista} = props;

   return <div className='card'>
      <button onClick={()=> deleteFutbolista(props.id)} >x</button>
      <h3>
      <Link to={`/futbolistas/${props.id}`} >
         {props.name}
      </Link>
      </h3>
      <img src={props.imagen} alt={props.name} />
      <p>Pais: {props.pais}</p>
      
         
         



   </div>;
};

const mapStateToProps = (state) => (
   {
      futbolistas: state.futbolistas,
   
 });


 function mapDispatchToProps(dispatch) {
   return bindActionCreators(actionsCreators, dispatch);
 }

 export default connect(mapStateToProps,mapDispatchToProps)(FutbolistaCard)

//export default FutbolistaCard;
