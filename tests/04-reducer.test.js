import * as data from '../db.json';

import {
   GET_ALL_FUTBOLISTAS,
   GET_FUTBOLISTAS_DETAIL,
   createFutbolista,
   deleteFutbolista,
} from '../src/redux/actions';

import rootReducer from '../src/redux/reducer';

// Acá se mockean las actions para que el test pueda funcionar correctamente, sin importar si hay un bug en ese archivo
jest.mock('../src/redux/actions', () => ({
   __esmodules: true,
   GET_ALL_FUTBOLISTAS: 'GET_ALL_FUTBOLISTAS',
   DELETE_FUTBOLISTA: 'DELETE_FUTBOLISTA',
   GET_FUTBOLISTAS_DETAIL: 'GET_FUTBOLISTAS_DETAIL',
   CREATE_FUTBOLISTA: 'CREATE_FUTBOLISTA',
   createFutbolista: (payload) => ({
      type: 'CREATE_FUTBOLISTA',
      payload,
   }),
   deleteFutbolista: (payload) => ({
      type: 'DELETE_FUTBOLISTA',
      payload,
   }),
   getFutbolistasDetails: (payload) => ({
      type: 'GET_FUTBOLISTAS_DETAIL',
      payload,
   }),
}));

describe('Reducer', () => {
   const state = {
      futbolistas: [],
      futbolistaDetail: {},
   };

   it('Si no hay un action-type válido, debe retornar el estado inicial', () => {
      expect(rootReducer(undefined, [])).toEqual({
         futbolistas: [],
         futbolistaDetail: {},
      });
   });

   it('Cuando la action-type es "GET_ALL_FUTBOLISTAS" debe guardar, en estado "futbolistas", los futbolistas obtenidos en nuestro llamado al Back-End', () => {
      const result = rootReducer(state, {
         type: GET_ALL_FUTBOLISTAS,
         payload: data.futbolistas,
      });
      // Acuerdense que el state inicial no tiene que mutar!
      expect(result).not.toEqual(state);
      expect(result).toEqual({
         futbolistas: data.futbolistas, // Cuando ejecutes los tests, vas a ver bien lo que espera que le llegue a nuestro estado!
         futbolistaDetail: {},
      });
   });

   it('Cuando la action-type es "GET_FUTBOLISTAS_DETAIL" debe guardar, en el estado "futbolistaDetail", el futbolista obtenido en nuestro llamado al Back-End', () => {
      const result = rootReducer(state, {
         type: GET_FUTBOLISTAS_DETAIL,
         payload: data.futbolistas[0],
      });
      // Acuerdense que el state inicial no tiene que mutar!
      expect(result).not.toEqual(state);
      expect(result).toEqual({
         futbolistas: [],
         futbolistaDetail: data.futbolistas[0],
      });
   });

   it('Cuando la action-type es "CREATE_FUTBOLISTA" debe agregar un nuevo futbolista al estado "futbolistas"', () => {
      const state = {
         futbolistas: data.futbolistas,
         futbolistaDetail: {},
      };

      const payload1 = {
         id: 6,
         name: 'Lionel Messi',
         Pais: 'Argentina',
         Posición: 'Delantero',
         descripción:
            'Lionel Andrés Messi, más conocido como Leo Messi, es un futbolista argentino que también posee la nacionalidad española desde el año 2005.',
         numeroCamiseta: 10,
         image: 'https://www.fundacionkonex.org/custom/web/data/imagenes/repositorio/2021/03/12/16575/2021031202544061e0e3f25c3041f849de6b510817fb34.jpg',
         nacimiento: '24-6-1987',
      };

      const payload2 = {
         id: 7,
         name: 'Pelé',
         Pais: 'Brasil',
         Posición: 'Delantero',
         descripción:
            'Nació el 23 de octubre de 1940 en la localidad brasileña de Tres Corazones, en el estado Minas Gerais. Pelé es considerado por muchos como el mejor futbolista del siglo. Comenzó a jugar fútbol como se comienza a jugar fútbol en Brasil: en las calles. Jugaba con sus compañeros de escuela o con sus vecinos.',
         numeroCamiseta: 10,
         image: 'https://images.pagina12.com.ar/styles/focal_content_1200x1050/public/2021-03/146771-pele-3x2.jpg?itok=DRUgKgMo',
         nacimiento: '23-10-1940',
      };

      const allFutbolistasType1 = [
         ...data.futbolistas,
         {
            id: 6,
            name: 'Lionel Messi',
            Pais: 'Argentina',
            Posición: 'Delantero',
            descripción:
               'Lionel Andrés Messi, más conocido como Leo Messi, es un futbolista argentino que también posee la nacionalidad española desde el año 2005.',
            numeroCamiseta: 10,
            image: 'https://www.fundacionkonex.org/custom/web/data/imagenes/repositorio/2021/03/12/16575/2021031202544061e0e3f25c3041f849de6b510817fb34.jpg',
            nacimiento: '24-6-1987',
         },
      ];
      const allFutbolistasType2 = [
         ...allFutbolistasType1,
         {
            id: 7,
            name: 'Pelé',
            Pais: 'Brasil',
            Posición: 'Delantero',
            descripción:
               'Nació el 23 de octubre de 1940 en la localidad brasileña de Tres Corazones, en el estado Minas Gerais. Pelé es considerado por muchos como el mejor futbolista del siglo. Comenzó a jugar fútbol como se comienza a jugar fútbol en Brasil: en las calles. Jugaba con sus compañeros de escuela o con sus vecinos.',
            numeroCamiseta: 10,
            image: 'https://images.pagina12.com.ar/styles/focal_content_1200x1050/public/2021-03/146771-pele-3x2.jpg?itok=DRUgKgMo',
            nacimiento: '23-10-1940',
         },
      ];
      const primerFutbolista = rootReducer(state, createFutbolista(payload1));
      const segundoFutbolista = rootReducer(
         { ...state, futbolistas: allFutbolistasType1 },
         createFutbolista(payload2)
      );

      // Acuerdense que el state inicial no tiene que mutar!
      expect(primerFutbolista).not.toEqual(state);
      expect(segundoFutbolista).not.toEqual(state);

      expect(primerFutbolista).toEqual({
         futbolistaDetail: {},
         futbolistas: allFutbolistasType1,
      });
      expect(segundoFutbolista).toEqual({
         futbolistaDetail: {},
         futbolistas: allFutbolistasType2,
      });
   });

   it('Cuando la action-type es "DELETE_FUTBOLISTA" debe eliminar el futbolista que posee el ID recibido del estado "futbolistas"', () => {
      // Caso 1
      const payload = 1;
      const state = {
         futbolistas: [
            {
               id: 1,
               name: 'Lionel Messi',
               Pais: 'Argentina',
               Posición: 'Delantero',
               descripción:
                  'Lionel Andrés Messi, más conocido como Leo Messi, es un futbolista argentino que también posee la nacionalidad española desde el año 2005.',
               numeroCamiseta: 10,
               image: 'https://www.fundacionkonex.org/custom/web/data/imagenes/repositorio/2021/03/12/16575/2021031202544061e0e3f25c3041f849de6b510817fb34.jpg',
               nacimiento: '24-6-1987',
            },
         ],
         futbolistaDetail: {},
      };

      expect(rootReducer(state, deleteFutbolista(payload))).toEqual({
         futbolistas: [],
         futbolistaDetail: {},
      });

      //Caso 2
      const payload2 = 6;
      const state2 = {
         futbolistas: [
            {
               id: 6,
               name: 'Lionel Messi',
               Pais: 'Argentina',
               Posición: 'Delantero',
               descripción:
                  'Lionel Andrés Messi, más conocido como Leo Messi, es un futbolista argentino que también posee la nacionalidad española desde el año 2005.',
               numeroCamiseta: 10,
               image: 'https://www.fundacionkonex.org/custom/web/data/imagenes/repositorio/2021/03/12/16575/2021031202544061e0e3f25c3041f849de6b510817fb34.jpg',
               nacimiento: '24-6-1987',
            },
            {
               id: 7,
               name: 'Pelé',
               Pais: 'Brasil',
               Posición: 'Delantero',
               descripción:
                  'Nació el 23 de octubre de 1940 en la localidad brasileña de Tres Corazones, en el estado Minas Gerais. Pelé es considerado por muchos como el mejor futbolista del siglo. Comenzó a jugar fútbol como se comienza a jugar fútbol en Brasil: en las calles. Jugaba con sus compañeros de escuela o con sus vecinos.',
               numeroCamiseta: 10,
               image: 'https://images.pagina12.com.ar/styles/focal_content_1200x1050/public/2021-03/146771-pele-3x2.jpg?itok=DRUgKgMo',
               nacimiento: '23-10-1940',
            },
         ],
         futbolistaDetail: {},
      };

      expect(rootReducer(state2, deleteFutbolista(payload2))).toEqual({
         futbolistas: [
            {
               id: 7,
               name: 'Pelé',
               Pais: 'Brasil',
               Posición: 'Delantero',
               descripción:
                  'Nació el 23 de octubre de 1940 en la localidad brasileña de Tres Corazones, en el estado Minas Gerais. Pelé es considerado por muchos como el mejor futbolista del siglo. Comenzó a jugar fútbol como se comienza a jugar fútbol en Brasil: en las calles. Jugaba con sus compañeros de escuela o con sus vecinos.',
               numeroCamiseta: 10,
               image: 'https://images.pagina12.com.ar/styles/focal_content_1200x1050/public/2021-03/146771-pele-3x2.jpg?itok=DRUgKgMo',
               nacimiento: '23-10-1940',
            },
         ],
         futbolistaDetail: {},
      });
   });
});
