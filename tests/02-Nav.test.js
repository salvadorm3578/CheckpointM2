import { configure, shallow } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Link } from 'react-router-dom';
import Nav from '../src/components/Nav/Nav';
import React from 'react';

configure({ adapter: new Adapter() });

describe('<Nav />', () => {
   let nav;
   beforeEach(() => {
      nav = shallow(<Nav />);
   });

   it('Debe haber dos etiquetas <Link>. Uno que dirija a la ruta "/" y otro a la ruta "/futbolistas/create"', () => {
      // Puedes importar el componente Link de react-router-dom.
      expect(nav.find(Link).length).toBeGreaterThanOrEqual(2);
      expect(nav.find(Link).find({ to: '/' }).length).toBe(1);
      expect(nav.find(Link).find({ to: '/futbolistas/create' }).length).toBe(1);
   });

   it('Debe haber una etiqueta <Link> con el texto "Home" que dirija a la ruta "/"', () => {
      expect(nav.find(Link).find({ to: '/' }).text()).toBe('Home');
   });

   it('Debe haber una etiqueta <Link> con el texto "Create Futbolista" que dirija a la ruta "/futbolistas/create"', () => {
      expect(nav.find(Link).find({ to: '/futbolistas/create' }).text()).toBe(
         'Create Futbolista'
      );
   });
});
