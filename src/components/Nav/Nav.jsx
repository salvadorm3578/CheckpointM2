/* 2️⃣ ***COMPONENTE NAV*** 2️⃣
Implementar el componente Nav. En este ejercicio tendrás que asociar dos etiquetas Link to='' a 
distintos elementos.

REQUISITOS
🟢 El primer <Link> debe dirigir a "/" con el texto "Home".
🟢 El segundo <Link> debe dirigir a "/futbolistas/create" con el texto "Create Futbolista".

IMPORTANTE
❗Este componente debe ser FUNCIONAL.
*/

import './nav.css';


import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
   return <div className='nav'>
      <Link to='/' >Home</Link>
      <Link to='/futbolistas/create'>Create Futbolista</Link>
   </div>;
};

export default Nav;