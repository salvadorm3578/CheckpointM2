import * as actions from '../src/redux/actions';
import * as data from '../db.json';

import HomeConnected, {
   Home,
   mapDispatchToProps,
   mapStateToProps,
} from '../src/components/Home/Home';
import { configure, mount, shallow } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import FutbolistaCard from '../src/components/FutbolistaCard/FutbolistaCard';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import isReact from 'is-react';
import mainImage from '../src/img-cp2/main-image-cp2.jpg';
import nock from 'nock';
import nodeFetch from 'node-fetch';
import thunk from 'redux-thunk';

axios.defaults.adapter = require('axios/lib/adapters/http');

configure({ adapter: new Adapter() });

// Acá se mockea la action para que el test pueda funcionar correctamente, sin importar si hay un bug en ese archivo
jest.mock('../src/redux/actions/index.js', () => ({
   getAllFutbolistas: () => ({
      type: 'GET_ALL_FUTBOLISTAS',
   }),
}));

jest.mock('../src/components/FutbolistaCard/FutbolistaCard', () => () => <></>);

describe('<Home />', () => {
   let home, store, state, getAllFutbolistasSpy, componentDidMountSpy;
   global.fetch = nodeFetch;
   const mockStore = configureStore([thunk]);
   beforeEach(() => {
      // Se Mockea las request a las api
      const apiMock = nock('http://localhost:3001').persist();

      // "/futbolistas" => Retorna la propiedad futbolistas del archivo data.json
      apiMock.get('/futbolistas').reply(200, data.futbolistas);

      // "/futbolistas/:id" => Retorna un futbolista matcheado por su id
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
      state = {
         futbolistas: [],
         futbolistaDetail: {},
      };
      store = mockStore(state);
      home = mount(<HomeConnected store={store} />);
      // Si o si vas a tener que usar class component! No van a pasar ninguno de los tests si no lo haces.
      expect(isReact.classComponent(Home)).toBeTruthy();

      store.clearActions();
   });

   afterEach(() => {
      nock.cleanAll();
   });

   it('Debe rederizar un "h1" con el texto "Mundial Qatar"', () => {
      expect(home.find('h1').at(0).text()).toEqual('Mundial Qatar');
   });

   it('Debe renderizar un tag "img" con la imagen provista en la carpeta "img-cp2"', () => {
      // Tendrías que importar la img a tu archivo "Home.jsx" y luego usarla como source de img.
      // Podés ver como lo hacemos en este mismo archivo en la linea 16!
      expect(home.find('img').at(0).prop('src')).toEqual(mainImage);
   });

   it('La imagen debe tener un atributo "alt" con el texto "mundial-logo"', () => {
      expect(home.find('img').at(0).prop('alt')).toEqual('mundial-logo');
   });

   it('Debe rederizar un "h3" con el texto "Futbolistas:"', () => {
      expect(home.find('h3').at(0).text()).toEqual('Futbolistas:');
   });

   it('Debe rederizar un "h4" con el texto "Checkpoint M2"', () => {
      expect(home.find('h4').at(0).text()).toEqual('Checkpoint M2');
   });

   describe('connect Redux', () => {
      // 🚨IMPORTANTE TRABAJAMOS CON LA REFERENCIA DE LAS ACTIONS TE DEJAMOS COMENTARIOS PARA CADA USO LEER BIEN!!🚨
      it('Debe traer del estado global de Redux todos los futbolistas utilizando mapStateToProps', () => {
         // El estado Debe tener un nombre "futbolistas".
         expect(mapStateToProps(state)).toEqual({
            futbolistas: state.futbolistas,
         });
      });

      if (typeof mapDispatchToProps === 'function') {
         // ESTE TEST ES POR SI HACES EL MAPDISPATCHTOPROPS COMO UNA FUNCIÓN.
         // IMPORTANTE! SI LO HACES DE ESTA FORMA LA IMPORTACION DE LAS ACTIONS DEBE SER DE LA SIGUIENTE MANERA
         // import * as actions from "./../../redux/actions/index";
         it("Debe traer por props la action-creator 'getAllFutbolistas' de Redux utilizando mapDispatchToProps", () => {
            // Acá testeamos que hagas todo el proceso. Utilizas la funcion "mapDispatchToProps",
            // y con ella despachas la accion "getAllFutbolistas".
            const getAllFutbolistas = jest.spyOn(actions, 'getAllFutbolistas');
            const dispatch = jest.fn();
            const props = mapDispatchToProps(dispatch);
            props.getAllFutbolistas();
            expect(dispatch).toHaveBeenCalled();
            expect(getAllFutbolistas).toHaveBeenCalled();
         });
      } else {
         // ESTE TEST ES POR SI HACES EL MAPDISPATCHTOPROPS COMO UN OBJETO.
         // IMPORTANTE! SI LO HACES DE ESTA FORMA mapDispatchToProps TIENE QUE SER EL OBJETO
         it("Debe traer por props la action-creator 'getAllFutbolistas' de Redux utilizando mapDispatchToProps", () => {
            // Acá testeamos que hagas todo el proceso. Utilizas connect y el objeto "mapDispatchToProps",
            // traes la acción "getAllFutbolistas". Con esto podrás usarla luego en el componente.
            const getAllFutbolistas = jest.spyOn(actions, 'getAllFutbolistas');
            getAllFutbolistas();
            expect(
               mapDispatchToProps.hasOwnProperty('getAllFutbolistas')
            ).toBeTruthy();
            expect(getAllFutbolistas).toHaveBeenCalled();
         });
      }
   });

   describe('React LifeCycles', () => {
      getAllFutbolistasSpy = jest.fn();
      let instance;
      beforeEach(async () => {
         state = {
            futbolistas: data.futbolistas,
            futbolistaDetail: {},
         };
         store = mockStore(state);
         home = mount(
            <Provider store={store}>
               <MemoryRouter initialEntries={['/home']}>
                  <HomeConnected />
               </MemoryRouter>
            </Provider>
         );
      });

      beforeAll(() => {
         // Ojo acá. Antes que corran los demás tests, chequeamos que estés utilizando el lifeCycle correspondiente ( componentDidMount )
         // y que en él ejecutas la action creator "getAllFutbolistas" para traerte toda esa data.
         // Si no pasan estos tests, no pasan los demás!
         componentDidMountSpy = jest.spyOn(Home.prototype, 'componentDidMount');
         instance = shallow(
            <Home getAllFutbolistas={getAllFutbolistasSpy} />
         ).instance();

         instance.componentDidMount();
         expect(componentDidMountSpy).toHaveBeenCalled();
         expect(getAllFutbolistasSpy).toHaveBeenCalled();
      });

      it('Debe mappear todos los futbolistas que hay en el estado global, y renderizar una <FutbolistaCard /> por cada una', () => {
         // Cuidado acá. Como realizamos una petición al back (código asincrónico), el componente se va a
         // renderizar más rápido. Hay un problema con esto, se va a intentar renderizar algunos datos que
         // no existen todavía, lo que es igual a un fatal error. Debes asegurarte que existen
         // jugadores y luego renderizarlos!
         // Pista: Usa un renderizado condicional.
         // IMPORTANTE: revisar el código arriba de este test, el beforeAll.
         // Ahí se está testeando el uso del lifecycle componentDidMount y que en él
         // traigas la data a renderizar.
         expect(home.find(FutbolistaCard)).toHaveLength(5);
      });

      it('Debe pasar a cada componente <FutbolistaCard /> las propiedades: "id", "name", "pais" e "imagen" de cada jugador', () => {
         // No olviden pasar la props KEY en el mappeo para mantener buenas prácticas.
         expect(home.find(FutbolistaCard).at(0).props().id).toEqual(1);
         expect(home.find(FutbolistaCard).at(0).props().name).toEqual(
            'Lionel Messi'
         );
         expect(home.find(FutbolistaCard).at(0).props().imagen).toEqual(
            'https://www.fundacionkonex.org/custom/web/data/imagenes/repositorio/2021/03/12/16575/2021031202544061e0e3f25c3041f849de6b510817fb34.jpg'
         );
         expect(home.find(FutbolistaCard).at(0).props().pais).toEqual(
            'Argentina'
         );

         expect(home.find(FutbolistaCard).at(1).props().id).toEqual(2);
         expect(home.find(FutbolistaCard).at(1).props().name).toEqual('Pelé');
         expect(home.find(FutbolistaCard).at(1).props().imagen).toEqual(
            'https://images.pagina12.com.ar/styles/focal_content_1200x1050/public/2021-03/146771-pele-3x2.jpg?itok=DRUgKgMo'
         );
         expect(home.find(FutbolistaCard).at(1).props().pais).toEqual('Brasil');

         expect(home.find(FutbolistaCard).at(3).props().id).toEqual(4);
         expect(home.find(FutbolistaCard).at(3).props().name).toEqual(
            'Carlos Valderrama'
         );
         expect(home.find(FutbolistaCard).at(3).props().imagen).toEqual(
            'https://caracoltv.brightspotcdn.com/dims4/default/1317439/2147483647/strip/true/crop/640x425+0+0/resize/640x425!/quality/90/?url=http%3A%2F%2Fcaracol-brightspot.s3.amazonaws.com%2Fa6%2F54%2Fd50532d346e890b623dd5772d9ec%2Fcarlosvalderrama-03072020-afp-e.jpg'
         );
         expect(home.find(FutbolistaCard).at(3).props().pais).toEqual(
            'Colombia'
         );
      });
   });
});
