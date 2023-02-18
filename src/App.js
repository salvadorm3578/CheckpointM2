/* 1️⃣ ***COMPONENTE APP*** 1️⃣
Implementar el componente App. En este ejercicio tendrás que crear diferentes rutas para otros componentes. 
¡Ten en cuenta los nombres y las especificaciones de cada uno!

REQUISITOS
🟢 El componente Nav debe renderizarse en todas las rutas.
🟢 El componente Home debe renderizarse en la ruta "/".
🟢 El componente FutbolistaDetail debe renderizarse en la ruta "/futbolistas/:id".
🟢 El componente CreateFutbolista debe renderizarse en la ruta "/futbolista/create".
*/

import React from "react";
import { Route, Routes } from 'react-router-dom';
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import FutbolistaDetail from "./components/FutbolistaDetail/FutbolistaDetail";
import CreateFutbolista from "./components/CreateFutbolista/CreateFutbolista";


const App = () => {
   return <div>

   <Nav/>

   <Routes>
<Route exact path="/" element={<Home/>} />
<Route exact path="/futbolistas/:id" element={<FutbolistaDetail/>} />
<Route exact path="/futbolistas/create" element={<CreateFutbolista/>} />  

</Routes> 




   </div>;
};
export default App;
