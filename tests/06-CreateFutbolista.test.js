import * as actions from '../src/redux/actions';
import * as data from '../db.json';

import { configure, mount } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CreateFutbolista from '../src/components/CreateFutbolista/CreateFutbolista';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import isReact from 'is-react';
import thunk from 'redux-thunk';

configure({ adapter: new Adapter() });

jest.mock('../src/redux/actions/index', () => ({
   CREATE_FUTBOLISTA: 'CREATE_FUTBOLISTA',
   createFutbolista: (payload) => ({
      type: 'CREATE_FUTBOLISTA',
      payload: {
         ...payload,
         id: 6,
      },
   }),
}));

describe('<CreateFutbolista/>', () => {
   const state = { futbolistas: data.futbolistas };
   const mockStore = configureStore([thunk]);
   const { CREATE_FUTBOLISTA } = actions;

   beforeAll(() =>
      expect(isReact.classComponent(CreateFutbolista)).toBeFalsy()
   );

   // RECUERDEN USAR FUNCTIONAL COMPONENT EN LUGAR DE CLASS COMPONENT
   describe('Formulario de Creación de Futbolistas', () => {
      let createFutbolista;
      let store = mockStore(state);
      beforeEach(() => {
         createFutbolista = mount(
            <Provider store={store}>
               <MemoryRouter initialEntries={['/futbolistas/create']}>
                  <CreateFutbolista />
               </MemoryRouter>
            </Provider>
         );
      });

      it('Debe renderizar un formulario', () => {
         expect(createFutbolista.find('form').length).toBe(1);
      });

      it('Debe renderizar un label con el texto "Name: "', () => {
         expect(createFutbolista.find('label').at(0).text()).toEqual('Name: ');
      });

      it('Debe renderizar un input de tipo text con el atributo "name" igual a "name"', () => {
         expect(createFutbolista.find('input[name="name"]').length).toBe(1);
      });

      it('Debe renderizar un label con el texto "Pais: "', () => {
         expect(createFutbolista.find('label').at(1).text()).toBe('Pais: ');
      });

      it('Debe renderizar un input de tipo text con el atributo "name" igual a "pais"', () => {
         expect(createFutbolista.find('input[name="pais"]').length).toBe(1);
      });

      it('Debe renderizar un label con el texto "Posición: "', () => {
         expect(createFutbolista.find('label').at(2).text()).toBe('Posición: ');
      });

      it('Debe renderizar un input de tipo text con el atributo "name" igual a "posición"', () => {
         expect(createFutbolista.find('input[name="posición"]').length).toBe(1);
      });

      it('Debe renderizar un label con el texto "Descripción: "', () => {
         expect(createFutbolista.find('label').at(3).text()).toBe(
            'Descripción: '
         );
      });

      it('Debe renderizar un input de tipo textarea con el atributo "name" igual a "descripción"', () => {
         expect(
            createFutbolista.find('textarea[name="descripción"]').length
         ).toBe(1);
      });

      it('Debe renderizar un label con el texto "Numero Camiseta: "', () => {
         expect(createFutbolista.find('label').at(4).text()).toBe(
            'Numero Camiseta: '
         );
      });

      it('Debe renderizar un input de tipo number con el atributo "name" igual a "numeroCamiseta"', () => {
         expect(
            createFutbolista.find('input[name="numeroCamiseta"]').length
         ).toBe(1);
         expect(createFutbolista.find('input[type="number"]').length).toBe(1);
      });

      it('Debe renderizar un label con el texto "Imagen: "', () => {
         expect(createFutbolista.find('label').at(5).text()).toBe('Imagen: ');
      });
      it('Debe renderizar un input de tipo text con el atributo name igual a "imagen"', () => {
         expect(createFutbolista.find('input[name="imagen"]').length).toBe(1);
      });

      it('Debe renderizar un label con el texto "Nacimiento: "', () => {
         expect(createFutbolista.find('label').at(6).text()).toEqual(
            'Nacimiento: '
         );
      });
      it('Debe renderizar un input de tipo text con el atributo "name" igual a "nacimiento"', () => {
         expect(createFutbolista.find('input[name="nacimiento"]').length).toBe(
            1
         );
      });

      it('Debe renderizar un button de tipo submit con el texto "Crear Jugador"', () => {
         expect(createFutbolista.find('button[type="submit"]').length).toBe(1);
         expect(createFutbolista.find('button[type="submit"]').text()).toBe(
            'Crear Jugador'
         );
      });
   });

   describe('Manejo de estados locales', () => {
      let useState, useStateSpy, createFutbolista;
      let store = mockStore(state);
      beforeEach(() => {
         useState = jest.fn();
         useStateSpy = jest.spyOn(React, 'useState');
         useStateSpy.mockImplementation((initialState) => [
            initialState,
            useState,
         ]);

         createFutbolista = mount(
            <Provider store={store}>
               <CreateFutbolista />
            </Provider>
         );
      });

      // Revisen bien que tipo de dato utilizamos en cada propiedad.
      it('Debe inicializar el estado local con las propiedades: "name", "pais", "posición", "descripción", "numeroCamiseta", "imagen" y "nacimiento"', () => {
         expect(useStateSpy).toHaveBeenCalledWith({
            name: '',
            pais: '',
            posición: '',
            descripción: '',
            numeroCamiseta: 0,
            imagen: '',
            nacimiento: '',
         });
      });

      describe('Debe reconocer cuando hay un cambio de valor en los distintos inputs', () => {
         it('input "name"', () => {
            createFutbolista.find('input[name="name"]').simulate('change', {
               target: { name: 'name', value: 'Di Maria' },
            });
            expect(useState).toHaveBeenCalledWith({
               name: 'Di Maria',
               pais: '',
               posición: '',
               descripción: '',
               numeroCamiseta: 0,
               imagen: '',
               nacimiento: '',
            });

            createFutbolista.find('input[name="name"]').simulate('change', {
               target: { name: 'name', value: 'Ochoa' },
            });
            expect(useState).toHaveBeenCalledWith({
               name: 'Ochoa',
               pais: '',
               posición: '',
               descripción: '',
               numeroCamiseta: 0,
               imagen: '',
               nacimiento: '',
            });
         });

         it('input "pais"', () => {
            createFutbolista.find('input[name="pais"]').simulate('change', {
               target: { name: 'pais', value: 'Colombia' },
            });
            expect(useState).toHaveBeenCalledWith({
               name: '',
               pais: 'Colombia',
               posición: '',
               descripción: '',
               numeroCamiseta: 0,
               imagen: '',
               nacimiento: '',
            });

            createFutbolista.find('input[name="pais"]').simulate('change', {
               target: { name: 'pais', value: 'Venezuela' },
            });
            expect(useState).toHaveBeenCalledWith({
               name: '',
               pais: 'Venezuela',
               posición: '',
               descripción: '',
               numeroCamiseta: 0,
               imagen: '',
               nacimiento: '',
            });
         });

         it('input "posición"', () => {
            createFutbolista.find('input[name="posición"]').simulate('change', {
               target: { name: 'posición', value: 'Defensor' },
            });
            expect(useState).toHaveBeenCalledWith({
               name: '',
               pais: '',
               posición: 'Defensor',
               descripción: '',
               numeroCamiseta: 0,
               imagen: '',
               nacimiento: '',
            });
         });

         it('input "descripción"', () => {
            createFutbolista
               .find('textarea[name="descripción"]')
               .simulate('change', {
                  target: { name: 'descripción', value: 'Mundial qatar 2022' },
               });
            expect(useState).toHaveBeenCalledWith({
               name: '',
               pais: '',
               posición: '',
               descripción: 'Mundial qatar 2022',
               numeroCamiseta: 0,
               imagen: '',
               nacimiento: '',
            });

            createFutbolista
               .find('textarea[name="descripción"]')
               .simulate('change', {
                  target: {
                     name: 'descripción',
                     value: 'Eliminatoria de 32 equipos',
                  },
               });
            expect(useState).toHaveBeenCalledWith({
               name: '',
               pais: '',
               posición: '',
               descripción: 'Eliminatoria de 32 equipos',
               numeroCamiseta: 0,
               imagen: '',
               nacimiento: '',
            });
         });

         it('input "numeroCamiseta"', () => {
            createFutbolista
               .find('input[name="numeroCamiseta"]')
               .simulate('change', {
                  target: { name: 'numeroCamiseta', value: 21 },
               });
            expect(useState).toHaveBeenCalledWith({
               name: '',
               pais: '',
               posición: '',
               descripción: '',
               numeroCamiseta: 21,
               imagen: '',
               nacimiento: '',
            });

            createFutbolista
               .find('input[name="numeroCamiseta"]')
               .simulate('change', {
                  target: { name: 'numeroCamiseta', value: 3 },
               });
            expect(useState).toHaveBeenCalledWith({
               name: '',
               pais: '',
               posición: '',
               descripción: '',
               numeroCamiseta: 3,
               imagen: '',
               nacimiento: '',
            });
         });

         it('input "imagen"', () => {
            createFutbolista.find('input[name="imagen"]').simulate('change', {
               target: { name: 'imagen', value: 'imagen1' },
            });
            expect(useState).toHaveBeenCalledWith({
               name: '',
               pais: '',
               posición: '',
               descripción: '',
               numeroCamiseta: 0,
               imagen: 'imagen1',
               nacimiento: '',
            });
         });

         it('input "nacimiento"', () => {
            createFutbolista
               .find('input[name="nacimiento"]')
               .simulate('change', {
                  target: { name: 'nacimiento', value: 'Peru' },
               });
            expect(useState).toHaveBeenCalledWith({
               name: '',
               pais: '',
               posición: '',
               descripción: '',
               numeroCamiseta: 0,
               imagen: '',
               nacimiento: 'Peru',
            });
         });
      });
   });

   describe('Dispatch al store', () => {
      // 🚨IMPORTANTE TRABAJAMOS CON LA REFERENCIA DE LAS ACTIONS LA IMPORTACION DE LAS ACTIONS DEBE SER DE LA SIGUIENTE MANERA🚨
      // import * as actions from "./../../redux/actions/index";

      let createFutbolista, useState, useStateSpy;
      let store = mockStore(state);

      beforeEach(() => {
         useState = jest.fn();
         useStateSpy = jest.spyOn(React, 'useState');
         useStateSpy.mockImplementation((initialState) => [
            initialState,
            useState,
         ]);
         store = mockStore(state, actions.createFutbolista);
         store.clearActions();
         createFutbolista = mount(
            <Provider store={store}>
               <MemoryRouter initialEntries={['/futbolistas/create']}>
                  <CreateFutbolista />
               </MemoryRouter>
            </Provider>
         );
      });

      afterEach(() => jest.restoreAllMocks());

      it('Debe despachar la action "CreateFutbolista" con los datos del estado local cuando se haga submit del form.', () => {
         const createFutbolistaFn = jest.spyOn(actions, 'createFutbolista');
         createFutbolista.find('form').simulate('submit');
         expect(store.getActions()).toEqual([
            {
               type: CREATE_FUTBOLISTA,
               payload: {
                  name: '',
                  pais: '',
                  posición: '',
                  descripción: '',
                  numeroCamiseta: 0,
                  imagen: '',
                  nacimiento: '',
                  id: 6,
               },
            },
         ]);
         expect(CreateFutbolista.toString().includes('useDispatch')).toBe(true);
         expect(createFutbolistaFn).toHaveBeenCalled();
      });

      it('Debe evitar que se refresque la página luego de hacer submit con el uso del evento "preventDefault"', () => {
         const event = { preventDefault: () => {} };
         jest.spyOn(event, 'preventDefault');
         createFutbolista.find('form').simulate('submit', event);
         expect(event.preventDefault).toBeCalled();
      });
   });

   describe('Manejo de errores', () => {
      let createFutbolista;
      let store = mockStore(state);
      beforeEach(() => {
         createFutbolista = mount(
            <Provider store={store}>
               <MemoryRouter initialEntries={['/futbolistas/create']}>
                  <CreateFutbolista />
               </MemoryRouter>
            </Provider>
         );
      });

      it("Al ingresar un 'name' o un 'pais' con una longitud mayor a 30 caracteres, debe renderizar un <p> indicando el error", () => {
         // Pueden implementar la lógica de validación de errores de la forma que mejor prefieran!
         // Los test verifican principalmente que muestres lo errores en la interfaz CORRECTAMENTE.
         jest.restoreAllMocks();
         expect(createFutbolista.find('p').length).toEqual(0);
         createFutbolista.find('input[name="name"]').simulate('change', {
            target: {
               name: 'name',
               value: 'Lionel andres messi jugador rosarino',
            },
         });
         expect(createFutbolista.find('p').at(0).text()).toEqual(
            'Nombre u Pais demasiado largo'
         );
         // Al insertar un valor correcto en el input, el "p" deberia desaparecer
         createFutbolista.find('input[name="name"]').simulate('change', {
            target: { name: 'name', value: 'Radamel Falcao' },
         });
         expect(createFutbolista.find('p').length).toEqual(0);
         createFutbolista.find('input[name="pais"]').simulate('change', {
            target: {
               name: 'pais',
               value: 'Algún recoveco perdido en el mundo',
            },
         });
         expect(createFutbolista.find('p').at(0).text()).toEqual(
            'Nombre u Pais demasiado largo'
         );
         createFutbolista.find('input[name="pais"]').simulate('change', {
            target: { name: 'pais', value: 'Mexico' },
         });
         expect(createFutbolista.find('p').length).toEqual(0);
      });

      it('Al ingresar un numero de camiseta menores a 0, debe renderizar un <p> indicando el error', () => {
         jest.restoreAllMocks();
         createFutbolista
            .find('input[name="numeroCamiseta"]')
            .simulate('change', {
               target: { name: 'numeroCamiseta', value: -123 },
            });
         expect(createFutbolista.find('p').text()).toEqual(
            'El numero de camiseta tiene que ser mayor a 0'
         );
         // Al insertar un valor correcto en el input, el "p" deberia desaparecer
         createFutbolista
            .find('input[name="numeroCamiseta"]')
            .simulate('change', {
               target: { name: 'numeroCamiseta', value: 500 },
            });
         expect(createFutbolista.find('p').length).toEqual(0);
      });
      it('Si hay errores, no deberia despachar la action', () => {
         const dispatchSpy = jest.spyOn(actions, 'createFutbolista');
         // Corrobora varias veces de que si hay algun error, no se despache la action
         createFutbolista.find('input[name="pais"]').simulate('change', {
            target: {
               name: 'pais',
               value: 'Algún recoveco perdido en el mundo',
            },
         });
         createFutbolista.find('button').simulate('submit');
         expect(dispatchSpy).not.toHaveBeenCalled();
         createFutbolista.find('input[name="name"]').simulate('change', {
            target: {
               name: 'name',
               value: 'Lionel andres messi jugador rosarino',
            },
         });
         expect(dispatchSpy).not.toHaveBeenCalled();
         createFutbolista.find('button').simulate('submit');
         createFutbolista
            .find('input[name="numeroCamiseta"]')
            .simulate('change', {
               target: { name: 'numeroCamiseta', value: -32 },
            });
         createFutbolista.find('button').simulate('submit');
         expect(dispatchSpy).not.toHaveBeenCalled();
      });
   });
});
