/*5️⃣ ***COMPONENTE Home*** 5️⃣

Implementar el componente Home. Este deberá renderizar todos los futbolistas (Cards) que contengan la 
información consumida directamente del estado global de Redux. 
📢¡Sigue las instrucciones de los tests!📢

REQUISITOS
🟢 Tendrás que conectar el componente con el estado global de Redux mediante dos funciones: mapStateToProps y 
mapDispatchToProps.

🟢 Tendrás que renderizar una serie de etiquetas HTML con información dentro.

🟢 Tendrás que mappear tu estado global para luego renderizar su información utilizando el componente <FutbolistaCard />.

IMPORTANTE
❗Este componente debe ser de CLASE.
❗Importar las actions como Object Modules, ¡sino los test no funcionarán!
 [Ej]: import * as actions from "./../../redux/actions/index";

*/


import './home.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionsCreators from '../../redux/actions/index'
import FutbolistaCard from '../FutbolistaCard/FutbolistaCard';


export class Home extends Component {
   componentDidMount() {this.props.getAllFutbolistas()}

   

   render() {
 

      

      return <div className='home'>
         <h1>Mundial Qatar</h1>
         <img src="main-image-cp2.jpg" alt="mundial-logo" />
         <h3>Futbolistas:</h3>
         <h4>Checkpoint M2</h4>
s
         {

         this.props.futbolistas?  
        this.props.futbolistas.map((futbolista)=>(  <FutbolistaCard
         key={futbolista.id}
         name={futbolista.name}
         pais={futbolista.pais}
         imagen={futbolista.imagen}
         id={futbolista.id}
         /> 
        )) : <div></div>

            }


        



      </div>;

}


}

export const mapStateToProps = (state) => (
   {
      futbolistas:state.futbolistas,
   
 });

export const mapDispatchToProps = (dispatch)=> {
   return bindActionCreators(actionsCreators, dispatch);
 }

export default connect(mapStateToProps, mapDispatchToProps)(Home);
