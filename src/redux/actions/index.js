/* 3锔忊儯 ***ACTIONS*** 3锔忊儯 */

//馃摙 Puedes utilizar axios si lo deseas, s贸lo debes importarlo 馃摙

export const GET_ALL_FUTBOLISTAS = 'GET_ALL_FUTBOLISTAS';
export const GET_FUTBOLISTAS_DETAIL = 'GET_FUTBOLISTAS_DETAIL';
export const CREATE_FUTBOLISTA = 'CREATE_FUTBOLISTA';
export const DELETE_FUTBOLISTA = 'DELETE_FUTBOLISTA';

// 馃煝 getAllFutbolistas:
// Esta funci贸n debe realizar una petici贸n al Back-End. Luego despachar una action con la data recibida.
// End-Point: 'http://localhost:3001/futbolistas'.
export const getAllFutbolistas = () => async (dispatch) => {
    const response = await fetch('http://localhost:3001/futbolistas');
    const data = await response.json();
  
    dispatch({
      type: GET_ALL_FUTBOLISTAS,
      payload: data,
    });

};

// 馃煝 getFutbolistasDetails:
// Esta funci贸n debe hacer una petici贸n al Back-End. Ten en cuenta que tiene que recibir la variable "id" por
// par谩metro. Luego despachar una action con la data recibida.
// End-Point: 'http://localhost:3001/futbolistas/:id'.
export const getFutbolistasDetails = (id)=> async (dispatch)  => {

    const response = await fetch(`http://localhost:3001/futbolistas/${id}`);
    const data = await response.json();
  
    dispatch({
      type: GET_FUTBOLISTAS_DETAIL ,
      payload: data,
    });


};

// 馃煝 createFutbolista:
// Esta funci贸n debe recibir una variable "futbolistas" por par谩metro.
// Luego retornar una action que, en su propiedad payload:
//    - haga un spread operator de la variable futbolistas, para copiar todo su contenido.
//    - tenga una nueva propiedad "id" igual a la variable de abajo, pero con un incremento +1.
// Descomenta esta variable cuando la necesites.
let id = 6;
export const createFutbolista = (payload) => {
    
    const newTeam = { id: id, ...payload };
    id++;
    return {
      type: CREATE_FUTBOLISTA,
      payload: newTeam,
    };


};

// 馃煝 deleteFutbolista:
// Esta funci贸n debe retornar una action. En su propiedad "payload" guardar谩s el ID recibido por par谩metro.
export const deleteFutbolista = (id) => {
    return {
        type: DELETE_FUTBOLISTA,
        payload: id,
      };
};
