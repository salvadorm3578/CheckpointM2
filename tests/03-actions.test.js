/* eslint-disable jest/no-conditional-expect */

import * as data from '../db.json';

import {
   CREATE_FUTBOLISTA,
   DELETE_FUTBOLISTA,
   GET_ALL_FUTBOLISTAS,
   GET_FUTBOLISTAS_DETAIL,
   createFutbolista,
   deleteFutbolista,
   getAllFutbolistas,
   getFutbolistasDetails,
} from '../src/redux/actions';

import axios from 'axios';
import configureStore from 'redux-mock-store';
import nock from 'nock';
import nodeFetch from 'node-fetch';
import thunk from 'redux-thunk';

axios.defaults.adapter = require('axios/lib/adapters/http');

describe('Actions', () => {
   const mockStore = configureStore([thunk]);
   const store = mockStore({ futbolistas: [] });
   global.fetch = nodeFetch;
   beforeEach(() => {
      store.clearActions();

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

   afterEach(() => {
      nock.cleanAll();
   });

   describe('getAllFutbolistas', () => {
      it("Debe hacer un dispatch con las propiedades 'type: GET_ALL_FUTBOLISTAS' y, como payload, el resultado de la petición al End-Point provisto", async () => {
         return store
            .dispatch(getAllFutbolistas())
            .then(() => {
               const actions = store.getActions();
               expect(actions[0].payload.length).toBe(5);
               expect(actions[0]).toEqual({
                  type: GET_ALL_FUTBOLISTAS,
                  payload: data.futbolistas,
               });
            })
            .catch((err) => {
               // En caso de que haya un error al mandar la petición al back, el error entrara aquí. Podrás visualizarlo en la consola.
               console.error(err);
               expect(err).toBeUndefined();
            });
      });
   });

   describe('getFutbolistasDetails', () => {
      it("Debe hacer un dispatch con las propiedades 'type: GET_FUTBOLISTAS_DETAIL' y, como payload, el resultado de la petición al End-Point provisto", async () => {
         const payload = data.futbolistas[0];
         return store
            .dispatch(getFutbolistasDetails(payload.id))
            .then(() => {
               const actions = store.getActions();
               expect(actions[0]).toStrictEqual({
                  type: GET_FUTBOLISTAS_DETAIL,
                  payload: { ...payload },
               });
            })
            .catch((err) => {
               // El catch lo utilizamos para "atrapar" cualquier tipo de error a la hora de hacer la petición al Back. Sólo va a entrar si el test no sale como es pedido.
               // Para ver que está pasando debes revisar la consola.
               console.error(err);
               expect(err).toBeUndefined();
            });
      });

      it('Debe traer un futbolista distinto si el ID requerido es otro (evitar hardcodeos)', async () => {
         const payload = data.futbolistas[1];
         return store
            .dispatch(getFutbolistasDetails(payload.id))
            .then(() => {
               const actions = store.getActions();
               expect(actions[0]).toStrictEqual({
                  type: GET_FUTBOLISTAS_DETAIL,
                  payload: { ...payload },
               });
            })
            .catch((err) => {
               // El catch lo utilizamos para "atrapar" cualquier tipo de errores a la hora de hacer la petición al Back. Sólo va a entrar si el test no sale como es pedido.
               // Para ver que está pasando Debes revisar la consola.
               console.error(err);
               expect(err).toBeUndefined();
            });
      });
   });

   describe('createFutbolista', () => {
      it("Debe retornar una action con las propiedades 'type: CREATE_FUTBOLISTA' y, como payload, contener los values recibidos como argumento y un ID incremental", () => {
         // Para que este test pase, deberan declarar una variable ID y que su valor inicialice en 6. Lo hacemos para que no haya conflicto entre los id's mockeados.
         // Si revisas el archivo db.json verán la lista de futbolistas.
         const payload1 = {
            name: 'Lionel Messi',
            pais: 'Argentina',
            posición: 'Delantero',
            descripción:
               'Lionel Andrés Messi, más conocido como Leo Messi, es un futbolista argentino que también posee la nacionalidad española desde el año 2005.',
            numeroCamiseta: 10,
            imagen:
               'https://www.fundacionkonex.org/custom/web/data/imagenes/repositorio/2021/03/12/16575/2021031202544061e0e3f25c3041f849de6b510817fb34.jpg',
            nacimiento: '24-6-1987',
         };
         const payload2 = {
            name: 'Pelé',
            pais: 'Brasil',
            posición: 'Delantero',
            descripción:
               'Nació el 23 de octubre de 1940 en la localidad brasileña de Tres Corazones, en el estado Minas Gerais. Pelé es considerado por muchos como el mejor futbolista del siglo. Comenzó a jugar fútbol como se comienza a jugar fútbol en Brasil: en las calles. Jugaba con sus compañeros de escuela o con sus vecinos.',
            numeroCamiseta: 10,
            imagen:
               'https://images.pagina12.com.ar/styles/focal_content_1200x1050/public/2021-03/146771-pele-3x2.jpg?itok=DRUgKgMo',
            nacimiento: '23-10-1940',
         };

         expect(createFutbolista(payload1)).toEqual({
            type: CREATE_FUTBOLISTA,
            payload: {
               id: 6,
               name: 'Lionel Messi',
               pais: 'Argentina',
               posición: 'Delantero',
               descripción:
                  'Lionel Andrés Messi, más conocido como Leo Messi, es un futbolista argentino que también posee la nacionalidad española desde el año 2005.',
               numeroCamiseta: 10,
               imagen:
                  'https://www.fundacionkonex.org/custom/web/data/imagenes/repositorio/2021/03/12/16575/2021031202544061e0e3f25c3041f849de6b510817fb34.jpg',
               nacimiento: '24-6-1987',
            },
         });

         expect(createFutbolista(payload2)).toEqual({
            type: 'CREATE_FUTBOLISTA',
            payload: {
               id: 7,
               name: 'Pelé',
               pais: 'Brasil',
               posición: 'Delantero',
               descripción:
                  'Nació el 23 de octubre de 1940 en la localidad brasileña de Tres Corazones, en el estado Minas Gerais. Pelé es considerado por muchos como el mejor futbolista del siglo. Comenzó a jugar fútbol como se comienza a jugar fútbol en Brasil: en las calles. Jugaba con sus compañeros de escuela o con sus vecinos.',
               numeroCamiseta: 10,
               imagen:
                  'https://images.pagina12.com.ar/styles/focal_content_1200x1050/public/2021-03/146771-pele-3x2.jpg?itok=DRUgKgMo',
               nacimiento: '23-10-1940',
            },
         });
      });
   });

   describe('deleteFutbolista', () => {
      it("Debe retornar una action con las propiedades 'type: DELETE_FUTBOLIST'A, y como payload, el ID del futbolista a eliminar. Recibe el ID por argumento", () => {
         expect(deleteFutbolista(1)).toEqual({
            type: DELETE_FUTBOLISTA,
            payload: 1,
         });
         expect(deleteFutbolista(2)).toEqual({
            type: DELETE_FUTBOLISTA,
            payload: 2,
         });
      });
   });
});
