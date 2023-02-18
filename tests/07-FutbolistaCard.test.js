import * as actions from '../src/redux/actions/index';
import * as data from '../db.json';

import { Link, MemoryRouter } from 'react-router-dom';
import { configure, mount } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import FutbolistaCardConnected from '../src/components/FutbolistaCard/FutbolistaCard';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

configure({ adapter: new Adapter() });

jest.mock('../src/redux/actions/index', () => ({
   deleteFutbolista: () => ({
      type: 'DELETE_FUTBOLISTA',
   }),
}));

describe('<FutbolistaCard />', () => {
   let futbolistaCard, state, store;
   const mockStore = configureStore([thunk]);
   let futbolistas = data.futbolistas;
   state = {
      futbolistas: [],
      futbolistaDetail: {},
   };
   store = mockStore(state);
   beforeEach(() => {
      futbolistaCard = (futbolista) =>
         mount(
            <Provider store={store}>
               <MemoryRouter>
                  <FutbolistaCardConnected
                     id={futbolista.id}
                     name={futbolista.name}
                     pais={futbolista.pais}
                     imagen={futbolista.imagen}
                  />
               </MemoryRouter>
            </Provider>
         );
   });

   afterEach(() => jest.restoreAllMocks());

   describe('Estructura', () => {
      it('Debe renderizar un botón con el texto "x"', () => {
         const wrapper = futbolistaCard(futbolistas[0]);
         expect(wrapper.find('button').text()).toBe('x');
      });

      it('Debe renderizar un "h3" que muestre la propiedad "name" de cada futbolista', () => {
         expect(futbolistaCard(futbolistas[0]).find('h3').at(0).text()).toBe(
            'Lionel Messi'
         );
         expect(futbolistaCard(futbolistas[1]).find('h3').at(0).text()).toBe(
            'Pelé'
         );
         expect(futbolistaCard(futbolistas[2]).find('h3').at(0).text()).toBe(
            'Iván Zamorano'
         );
      });

      it('Debe renderizar la imagen de cada futbolista y un atributo "alt" con el nombre del futbolista', () => {
         expect(futbolistaCard(futbolistas[0]).find('img').prop('src')).toBe(
            futbolistas[0].imagen
         );
         expect(futbolistaCard(futbolistas[0]).find('img').prop('alt')).toBe(
            futbolistas[0].name
         );
         expect(futbolistaCard(futbolistas[1]).find('img').prop('src')).toBe(
            futbolistas[1].imagen
         );
         expect(futbolistaCard(futbolistas[1]).find('img').prop('alt')).toBe(
            futbolistas[1].name
         );
      });

      it('Debe renderizar un <p> que contenga el texto "Pais: " seguido de la prop "pais" de cada futbolista', () => {
         expect(futbolistaCard(futbolistas[0]).find('p').at(0).text()).toBe(
            'Pais: Argentina'
         );
         expect(futbolistaCard(futbolistas[1]).find('p').at(0).text()).toBe(
            'Pais: Brasil'
         );
         expect(futbolistaCard(futbolistas[2]).find('p').at(0).text()).toBe(
            'Pais: Chile'
         );
         expect(futbolistaCard(futbolistas[3]).find('p').at(0).text()).toBe(
            'Pais: Colombia'
         );
      });

      it('Debe asociar una etiqueta <Link> con el "name" de cada jugador y redirigir a "/futbolistas/:id"', () => {
         // El valor de "id" lo tenes que sacar de las props, recuerda que les estas pasando una propiedad "id".
         expect(futbolistaCard(futbolistas[0]).find(Link)).toHaveLength(1);
         expect(
            futbolistaCard(futbolistas[0]).find(Link).at(0).prop('to')
         ).toEqual('/futbolistas/1');
      });
   });

   describe('Dispatch to store', () => {
      // 🚨IMPORTANTE TRABAJAMOS CON LA REFERENCIA DE LAS ACTIONS LA IMPORTACION DE LAS ACTIONS DEBE SER DE LA SIGUIENTE MANERA🚨
      // import * as actions from "./../../redux/actions/index";

      it('Debe hacer un dispatch al estado global utilizando la action "deleteFutbolista" al hacer click en el botón "x". Debe pasarle el Id del futbolista', () => {
         const deletefutbolistaspy = jest.spyOn(actions, 'deleteFutbolista');
         const futbolistaCard = mount(
            <Provider store={store}>
               <MemoryRouter>
                  <FutbolistaCardConnected
                     id={futbolistas[0].id}
                     name={futbolistas[0].name}
                     pais={futbolistas[0].pais}
                     imagen={futbolistas[0].imagen}
                  />
               </MemoryRouter>
            </Provider>
         );
         futbolistaCard.find('button').simulate('click');
         expect(deletefutbolistaspy).toHaveBeenCalled();
         expect(deletefutbolistaspy).toHaveBeenCalledWith(futbolistas[0].id);

         const futbolistaCard2 = mount(
            <Provider store={store}>
               <MemoryRouter>
                  <FutbolistaCardConnected
                     id={futbolistas[1].id}
                     name={futbolistas[1].name}
                     pais={futbolistas[1].pais}
                     imagen={futbolistas[1].imagen}
                  />
               </MemoryRouter>
            </Provider>
         );
         futbolistaCard2.find('button').simulate('click');
         expect(deletefutbolistaspy).toHaveBeenCalled();
         expect(deletefutbolistaspy).toHaveBeenCalledWith(futbolistas[1].id);
      });
   });
});
