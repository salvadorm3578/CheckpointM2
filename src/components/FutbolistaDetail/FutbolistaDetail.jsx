/* 8️⃣ ***COMPONENTE FutbolistaDetail*** 8️⃣

Implementar el componente FutbolistaDetail. En este ejercicio tendrás que renderizar las diferentes propiedades del futbolista.
📢¡Sigue las instrucciones de los tests!📢

REQUISITOS
🟢 Tendrás que despachar una action con el "id" del futbolista cuando se monta el componente. Luego, traer esa 
información de tu estado global.

🟢 Tendrás que renderizar algunos datos del futbolista correspondiente.

IMPORTANTE
❗Importar las actions como Object Modules, ¡sino los test no funcionarán!
❗Este componente debe ser FUNCIONAL.
❗Para obtener el id puedes utilizar useParams.
❗NO hacer un destructuring de los hooks de React, debes utilizarlos con la siguiente forma:
      -'React.useState' - 'React.useEffect';
*/
import "./FutbolistaDetail.css"


import {useDispatch,useSelector } from 'react-redux';
import  * as actions  from '../../redux/actions/index'
import { useParams} from "react-router-dom";
import React from "react";


const FutbolistaDetail = (props) => {
      const {id}=useParams();
      const dispatch = useDispatch();

      const futbolistaDetail = useSelector(state => state.futbolistaDetail);

      React.useEffect(()=>{
            dispatch(actions.getFutbolistasDetails(id))
      },[dispatch,id])

   return (
   <div className="detail">
   
      <h1>{futbolistaDetail.name}</h1>
      <img src={futbolistaDetail.imagen} alt={futbolistaDetail.name} />
      <h3>Nacimiento: {futbolistaDetail.nacimiento}</h3>
      <h5>Pais: {futbolistaDetail.pais}</h5>
      <h5>Posición: {futbolistaDetail.posición}</h5>
      <h5>Descripción: {futbolistaDetail.descripción}</h5>
      <h5>Numero Camiseta: {futbolistaDetail.numeroCamiseta}</h5>
    

   </div>
   )

};



  
  
    export default FutbolistaDetail

