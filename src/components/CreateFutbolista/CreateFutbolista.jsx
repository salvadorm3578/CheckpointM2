/* 6️⃣ ***COMPONENTE CreateFutbolista*** 6️⃣

Implementar el componente CreateFutbolista. Este consistirá en un formulario controlado con estados de react.
📢¡Sigue las instrucciones de los tests!📢

REQUISITOS
🟢 Aquí tendrás que renderizar una serie de elementos HTML con distintos atibutos e información dentro.

🟢 Debes manejar cada uno de los inputs de tu formulario mediante un estado local llamado "input".

🟢 La información del formulario se debe despachar al estado global cuando se hace un submit.

🟢 Debes manejar los errores que pueden tener los inputs del formulario.

IMPORTANTE
❗Importar las actions como Object Modules, ¡sino los test no funcionarán!
❗Este componente debe ser funcional.
❗¡Puedes implementar el manejo de errores como mejor prefieras! Sólo recuerda renderizar el error apropiado en cada caso.
❗NO hacer un destructuring de los hooks de React, debes utilizarlos con la siguiente forma:
      - 'React.useState'
      - 'React.useEffect'
*/

import React from 'react';
import {useDispatch } from 'react-redux';
import  * as actions  from '../../redux/actions/index'



const CreateFutbolista = () => {

      const dispatch = useDispatch();

      const [state, setState] = React.useState ({
            name: '',
            pais: '',
            posición: '',
            descripción: '',
            numeroCamiseta: 0,
            imagen: '',
            nacimiento: '',
          });

      
          const handleSubmit = (event) => {
            event.preventDefault();
            if ( state.name <31 && state.pais <31 && state.numeroCamiseta>=0){
                  dispatch(actions.createFutbolista(state))
            }


          };


const handleChange = (e)=>{
      setState ({ ...state, [e.target.name] : e.target.value});  
}




   return <div>
      <form onSubmit={handleSubmit}>
            <label htmlFor="">Name: </label> <input type="text" name="name" value={state.name} onChange={handleChange}/>
            <label htmlFor="">Pais: </label> <input type="text" name="pais" value={state.pais} onChange={handleChange}/>
            <label htmlFor="">Posición: </label> <input type="text" name="posición" value={state.posición} onChange={handleChange}/>
            <label htmlFor="">Descripción: </label> <textarea  name="descripción" value={state.descripción} onChange={handleChange}/>
            <label htmlFor="">Numero Camiseta: </label> <input type="number" name="numeroCamiseta" value={state.number} onChange={handleChange}/>
            <label htmlFor="">Imagen: </label> <input type="text" name="imagen" value={state.imagen} onChange={handleChange}/>
            <label htmlFor="">Nacimiento: </label> <input type="text" name="nacimiento" value={state.nacimiento} onChange={handleChange}/>
            <button type='submit'>Crear Jugador</button>

      </form>
      {
            state.name.length>30 || state.pais.length>30 ? <p>Nombre u Pais demasiado largo</p>:null
      }
 
      {
            state.numeroCamiseta<0 ?<p>El numero de camiseta tiene que ser mayor a 0</p>:null
      }
      

   </div>;
};


export default CreateFutbolista


