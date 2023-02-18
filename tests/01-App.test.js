import * as data from '../db.json';

import { configure, mount } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from '../src/App';
import FutbolistaCard from '../src/components/FutbolistaCard/FutbolistaCard';
import FutbolistaDetail from '../src/components/FutbolistaDetail/FutbolistaDetail';
import CreateFutbolista from '../src/components/CreateFutbolista/CreateFutbolista';
import Home from '../src/components/Home/Home';
import { MemoryRouter } from 'react-router-dom';
import Nav from '../src/components/Nav/Nav';
import { Provider } from 'react-redux';
import React from 'react';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import nock from 'nock';
import nodeFetch from 'node-fetch';
import thunk from 'redux-thunk';

axios.defaults.adapter = require('axios/lib/adapters/http');

configure({ adapter: new Adapter() });

// Mocks de los componentes, acá se pueden hardcodear para que funcionen SI o SI
// De esa manera sin importar si hay errores en alguno de ellos, nos fijamos de que sean montados en app.js
jest.mock('../src/components/FutbolistaDetail/FutbolistaDetail', () => () => (
   <></>
));
jest.mock('../src/components/FutbolistaCard/FutbolistaCard', () => () => <></>);
jest.mock('../src/components/Nav/Nav', () => () => <></>);
jest.mock('../src/components/CreateFutbolista/CreateFutbolista', () => () => (
   <></>
));
jest.mock('../src/components/Home/Home', () => () => <></>);

describe('<App />', () => {
   global.fetch = nodeFetch;

   let store;
   const routes = ['/', '/futbolistas/1', '/futbolistas/create'];
   const mockStore = configureStore([thunk]);
   const state = {
      futbolistas: data.futbolistas,
      futbolistaDetail: data.futbolistas[0],
   };

   beforeEach(async () => {
      // Se Mockea las request a las api
      const apiMock = nock('http://localhost:3001').persist();

      // "/futbolistas" => Retorna la propiedad futbolistas del archivo data.json
      apiMock.get('/futbolistas').reply(200, data.futbolistas);

      // "/futbolistas/:id" => Retorna un futbolista matcheado por su id
      let id = null;
      apiMock
         .get((uri) => {
            id = Number(uri.split('/').pop()); // Number('undefined') => NaN
            return !!id;
         })
         .reply(200, (uri, requestBody) => {
            return (
               data.futbolistas.find((futbolistas) => futbolistas.id === id) ||
               {}
            );
         });
   });

   store = mockStore(state);

   const componentToUse = (route) => {
      return (
         <Provider store={store}>
            <MemoryRouter initialEntries={[route]}>
               <App />
            </MemoryRouter>
         </Provider>
      );
   };

   describe('Nav:', () => {
      it('Debe ser renderizado en la ruta "/"', () => {
         const app = mount(componentToUse(routes[0]));
         expect(app.find(Nav)).toHaveLength(1);
      });

      it('Debe ser renderizado en la ruta "/futbolistas/:id"', () => {
         const app = mount(componentToUse(routes[1]));
         expect(app.find(Nav)).toHaveLength(1);
      });
      it('Debe ser renderizado en la ruta "/futbolistas/create"', () => {
         const app = mount(componentToUse(routes[2]));
         expect(app.find(Nav)).toHaveLength(1);
      });
   });

   describe('Home:', () => {
      it('El componente "Home" debe ser renderizado solamente en la ruta "/"', () => {
         const app = mount(componentToUse(routes[0]));
         expect(app.find(FutbolistaDetail)).toHaveLength(0);
         expect(app.find(CreateFutbolista)).toHaveLength(0);
         expect(app.find(Home)).toHaveLength(1);
      });
      it('El componente "Home" no debería mostrarse en ninguna otra ruta', () => {
         const app = mount(componentToUse(routes[0]));
         expect(app.find(Home)).toHaveLength(1);

         const app2 = mount(componentToUse(routes[1]));
         expect(app2.find(Home)).toHaveLength(0);

         const app3 = mount(componentToUse(routes[2]));
         expect(app3.find(Home)).toHaveLength(0);
      });
   });

   describe('FutbolistaDetail:', () => {
      it('La ruta "/futbolistas/:id" debería mostrar sólo el componente FutbolistaDetail', () => {
         const app = mount(componentToUse(routes[1]));
         expect(app.find(Home)).toHaveLength(0);
         expect(app.find(FutbolistaCard)).toHaveLength(0);
         expect(app.find(FutbolistaDetail)).toHaveLength(1);
      });
   });

   describe('CreateFutbolista:', () => {
      it('La ruta "/futbolistas/create" debería mostrar sólo el componente CreateFutbolista', () => {
         const app = mount(componentToUse(routes[2]));
         expect(app.find(CreateFutbolista)).toHaveLength(1);
         expect(app.find(FutbolistaCard)).toHaveLength(0);
         expect(app.find(Nav)).toHaveLength(1);
         expect(app.find(Home)).toHaveLength(0);
      });
   });
});
