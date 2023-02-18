
import * as ReactRedux from 'react-redux';
import * as actions from '../src/redux/actions';
import * as data from '../db.json';

import { configure, mount } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import FutbolistaDetail from '../src/components/FutbolistaDetail/FutbolistaDetail';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import Router from 'react-router-dom';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import isReact from 'is-react';
import nock from 'nock';
import nodeFetch from 'node-fetch';
import thunk from 'redux-thunk';

axios.defaults.adapter = require('axios/lib/adapters/http');

configure({ adapter: new Adapter() });

jest.mock('../src/redux/actions/index.js', () => ({
   getFutbolistasDetails: () => ({
      type: 'GET_FUTBOLISTAS_DETAIL',
   }),
}));

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
   useParams: () => ({
      id: '12',
   }),
}));

describe('<FutbolistaDetail />', () => {
   global.fetch = nodeFetch;
   let futbolistaDetail, useSelectorStub, useSelectorFn, useEffect;
   const noProd = {
      id: 1,
      name: 'Lio Messi',
      pais: 'Argentina',
      posición: 'Delantero',
      descripción: 'el mejor',
      numeroCamiseta: 30,
      imagen: 'imagen',
      nacimiento: 'buenos aires',
   };

   const match = (id) => ({
      params: { id },
      isExact: true,
      path: '/futbolistas/:id',
      url: `/futbolistas/${id}`,
   });
   const mockStore = configureStore([thunk]);

   const store = (id) => {
      let state = {
         futbolistas: data.futbolistas.concat(noProd),
         futbolistaDetail:
            id !== 10
               ? data.futbolistas[id - 1]
               : data.futbolistas.concat(noProd),
      };
      return mockStore(state);
   };
   // Si o si vas a tener que usar functional component! No van a correr ninguno de los tests si no lo haces!
   // También fijate que vas a tener que usar algunos hooks. Tanto de React como de Redux!
   // Los hooks de React si o si los tenes que usar "React.useState", "React.useEffect". El test no los reconoce
   // cuando se hace destructuring de estos métodos === test no corren.
   beforeAll(() =>
      expect(isReact.classComponent(FutbolistaDetail)).toBeFalsy()
   );
   const mockUseEffect = () => useEffect.mockImplementation((fn) => fn());

   beforeEach(() => {
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
               data.futbolistas.find((futbolista) => futbolista.id === id) || {}
            );
         });
      useSelectorStub = jest.spyOn(ReactRedux, 'useSelector');
      useSelectorFn = (id) =>
         useSelectorStub.mockReturnValue(store(id).getState().futbolistaDetail);
      useEffect = jest.spyOn(React, 'useEffect');
      futbolistaDetail = (id) =>
         mount(
            <ReactRedux.Provider store={store(id)}>
               <MemoryRouter initialEntries={[`/futbolistas/${id}`]}>
                  <FutbolistaDetail match={match(id)} />
               </MemoryRouter>
            </ReactRedux.Provider>
         );
      mockUseEffect();
      mockUseEffect();
   });

   afterEach(() => jest.restoreAllMocks());

   // 🚨IMPORTANTE TRABAJAMOS CON LA REFERENCIA DE LAS ACTIONS LA IMPORTACION DE LAS ACTIONS DEBE SER DE LA SIGUIENTE MANERA🚨
   // import * as actions from "./../../redux/actions/index";

   it('Debe usar un React.useEffect en el que se despache la acción "getFutbolistasDetails", pasándole como argumento el ID del futbolista', async () => {
      // Nuevamente testeamos todo el proceso. Tenes que usar un useEffect, y despachar la acción "getFutbolistasDetails".
      const useDispatch = jest.spyOn(ReactRedux, 'useDispatch');
      const getFutbolistasDetails = jest.spyOn(
         actions,
         'getFutbolistasDetails'
      );
      futbolistaDetail(1);
      expect(useEffect).toHaveBeenCalled();
      expect(useDispatch).toHaveBeenCalled();
      expect(getFutbolistasDetails).toHaveBeenCalled();

      futbolistaDetail(2);
      expect(useEffect).toHaveBeenCalled();
      expect(useDispatch).toHaveBeenCalled();
      expect(getFutbolistasDetails).toHaveBeenCalled();
   });

   it('Debería llamar a la función useParams y obtener el id', async () => {
      jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });
      mount(
         <ReactRedux.Provider store={store(1)}>
            <MemoryRouter initialEntries={['/futbolistas/1']}>
               <FutbolistaDetail />
            </MemoryRouter>
         </ReactRedux.Provider>
      );
      expect(Router.useParams).toHaveBeenCalled();
   });

   describe('Debe utilizar el "id" de "params" para despachar la action "getFutbolistasDetails" y renderizar los detalles del futbolista', () => {
      const futbolistas = data.futbolistas[0];
      // Fijate que para traerte los datos desde Redux, vas a tener que usar el hook de Redux "useSelector"
      // para que los tests pasen!
      // Lo que se esta testeando aca, es que el componente renderice los detalles del todo correctamente,
      // no la estructura del componente asi que eres libre de diseñar la estructura, siempre y cuando se muestren los datos del todo.
      // Verificar la llegada del id proveniente de useParams, puede romper en el caso que no exista nada.
      it("Debe renderizar un tag 'h1' que muestre el nombre de cada 'futbolista'", () => {
         useSelectorFn(1);
         expect(futbolistaDetail(1).text().includes(futbolistas.name)).toEqual(
            true
         );
         expect(futbolistaDetail(1).find('h1').at(0).text()).toBe(
            futbolistas.name
         );
         expect(useSelectorStub).toHaveBeenCalled();
         expect(useEffect).toHaveBeenCalled();
      });

      it("Debe renderizar una etiqueta 'img' donde su prop 'src' sea la imagen del futbolista y la prop 'alt' el nombre del futbolista.", () => {
         useSelectorFn(1);
         expect(futbolistaDetail(1).find('img').prop('src')).toBe(
            futbolistas.imagen
         );
         expect(futbolistaDetail(1).find('img').prop('alt')).toBe(
            futbolistas.name
         );
         expect(useSelectorStub).toHaveBeenCalled();
         expect(useEffect).toHaveBeenCalled();
      });

      it("Debe renderizar una etiqueta 'h3' que contenga el texto 'Nacimiento: ' y la fecha de nacimiento del futbolista.", () => {
         useSelectorFn(1);
         expect(
            futbolistaDetail(1).text().includes(futbolistas.nacimiento)
         ).toEqual(true);
         expect(futbolistaDetail(1).find('h3').at(0).text()).toBe(
            'Nacimiento: ' + futbolistas.nacimiento
         );
         expect(useSelectorStub).toHaveBeenCalled();
         expect(useEffect).toHaveBeenCalled();
      });

      it("Debe renderizar una etiqueta 'h5' que contenga el texto 'Pais: ' y el pais del futbolista.", () => {
         useSelectorFn(1);
         expect(futbolistaDetail(1).text().includes(futbolistas.pais)).toEqual(
            true
         );
         expect(futbolistaDetail(1).find('h5').at(0).text()).toBe(
            'Pais: ' + futbolistas.pais
         );
         expect(useSelectorStub).toHaveBeenCalled();
         expect(useEffect).toHaveBeenCalled();
      });

      it("Debe renderizar una etiqueta 'h5' que contenga el texto 'Posición: ' y la posición del futbolista.", () => {
         useSelectorFn(1);
         expect(
            futbolistaDetail(1).text().includes(futbolistas.posición)
         ).toEqual(true);
         expect(futbolistaDetail(1).find('h5').at(1).text()).toBe(
            'Posición: ' + futbolistas.posición
         );
         expect(useSelectorStub).toHaveBeenCalled();
         expect(useEffect).toHaveBeenCalled();
      });

      it("Debe renderizar una etiqueta 'h5' que contenga el texto 'Descripción: ' y la descripción del futbolista.", () => {
         useSelectorFn(1);
         expect(
            futbolistaDetail(1).text().includes(futbolistas.descripción)
         ).toEqual(true);
         expect(futbolistaDetail(1).find('h5').at(2).text()).toBe(
            `Descripción: ${futbolistas.descripción}`
         );
         expect(useSelectorStub).toHaveBeenCalled();
         expect(useEffect).toHaveBeenCalled();
      });

      it("Debe renderizar una etiqueta 'h5' que contenga el texto 'Numero Camiseta: ' y el número de camista del futbolista.", () => {
         useSelectorFn(1);
         expect(
            futbolistaDetail(1).text().includes(futbolistas.numeroCamiseta)
         ).toEqual(true);
         expect(futbolistaDetail(1).find('h5').at(3).text()).toBe(
            `Numero Camiseta: ${futbolistas.numeroCamiseta}`
         );
         expect(useSelectorStub).toHaveBeenCalled();
         expect(useEffect).toHaveBeenCalled();
      });
   });
});
