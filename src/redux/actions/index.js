/* 3️⃣ ***ACTIONS*** 3️⃣ */

//📢 Puedes utilizar axios si lo deseas, sólo debes importarlo 📢

export const GET_ALL_FUTBOLISTAS = 'GET_ALL_FUTBOLISTAS';
export const GET_FUTBOLISTAS_DETAIL = 'GET_FUTBOLISTAS_DETAIL';
export const CREATE_FUTBOLISTA = 'CREATE_FUTBOLISTA';
export const DELETE_FUTBOLISTA = 'DELETE_FUTBOLISTA';

// 🟢 getAllFutbolistas:
// Esta función debe realizar una petición al Back-End. Luego despachar una action con la data recibida.
// End-Point: 'http://localhost:3001/futbolistas'.
export const getAllFutbolistas = () => async (dispatch) => {
    const response = await fetch('http://localhost:3001/futbolistas');
    const data = await response.json();
  
    dispatch({
      type: GET_ALL_FUTBOLISTAS,
      payload: data,
    });

};

// 🟢 getFutbolistasDetails:
// Esta función debe hacer una petición al Back-End. Ten en cuenta que tiene que recibir la variable "id" por
// parámetro. Luego despachar una action con la data recibida.
// End-Point: 'http://localhost:3001/futbolistas/:id'.
export const getFutbolistasDetails = (id)=> async (dispatch)  => {

    const response = await fetch(`http://localhost:3001/futbolistas/${id}`);
    const data = await response.json();
  
    dispatch({
      type: GET_FUTBOLISTAS_DETAIL ,
      payload: data,
    });


};

// 🟢 createFutbolista:
// Esta función debe recibir una variable "futbolistas" por parámetro.
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

// 🟢 deleteFutbolista:
// Esta función debe retornar una action. En su propiedad "payload" guardarás el ID recibido por parámetro.
export const deleteFutbolista = (id) => {
    return {
        type: DELETE_FUTBOLISTA,
        payload: id,
      };
};
