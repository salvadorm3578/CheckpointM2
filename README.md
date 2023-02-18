# M2 - Checkpoint | Mundial

## **⛔️ Aclaraciones IMPORTANTES**

En este checkpoint vamos a utilizar un Back-End que fue creado con _json-server_. Es **IMPORTANTE** que cumplas con estas aclaraciones. Caso contrario, ¡puede haber problemas con los tests!

-  En este CheckPoint te indicaremos cuándo tengas que utilizar un componente **funcional** y cuándo **de clase**. Presta atención a las indicaciones.

-  En caso de que utilices hooks de react, deberás escribirlos de la siguiente forma:

```javascript
React.useState | React.useEffect;
```

-  Es importante que leas todos los comentarios para saber dónde puedes usar hooks y donde no.

</br>

---

## **📌 Objetivos de la app**

Construirás una página con información de futbolistas. La app dispondrá de una página principal donde podremos ver a los jugadores, mostrando su imágen, nombre y país. También habrá un botón para eliminar un futbolista.

Al hacer click en el futbolista, deberá llevarnos a su detalle ("FutbolistaDetail"). Aquí tendremos que ver toda la información del jugador, incluyendo su nombre, descripción, imagen, nacimiento, país, posición y número de camiseta. Como bien mencionamos en las aclaraciones, dispondrás de un Back-End ya creado con _json-server_.

Esta librería nos permite crear una _API REST_ con tan sólo un archivo JSON. De esta forma tendrás que realizar una conexión Back-Front utilizando "**_fetch_**" o "**_axios_**" (ya vienen instalados).

El objetivo de este CheckPoint es prepararte para la instancia del Proyecto Individual (PI). Así, podrás "volver" a este CheckPoint y utilizarlo como referencia. Recuerda que puedes revisar las homeworks y el contenido teórico que se dió durante todo el módulo.

La app va a contar con tres rutas:

-  **'/'** : nuestra "Home". Aquí veremos a todos los jugadores.
-  **'/futbolistas/:id'** : el detalle del futbolista.
-  **'/futbolistas/create'** : el formulario de creación de un futbolista.

</br>

---

## **🔎 Para comenzar**

Para instalar todas las dependencias necesarias para realizar este proyecto:

```bash
       npm install
```

Para correr los test y validar tus soluciones:

```bash
       npm test
```

Si quieres validar el test de un ejercicio individualmente, al comando anterior puedes pasarle el número del ejercicio:

```bash
       npm test 01
```

Si queres levantar la app y ver cómo va la página escribe los comandos:

```bash
       npm start      ---> para levantar el Front
       npm run server ---> para levantar el servidor
```

> Recuerda que para aprobar sólo tienen que pasar los tests.

</br>

---

## **📖 Instrucciones**

Vas a trabajar en los siguientes archivos (cada uno tiene su test correspondiente). Para el desarrollo de esta aplicación, te recomendamos seguir este camino:

1. App.js
2. components/Nav/Nav.jsx
3. redux/actions/index.js
4. redux/reducer/index.js
5. components/Home/Home.jsx
6. components/CreateFutbolista/CreateFutbolista.jsx
7. components/FutbolistaCard/FutbolistaCard.jsx
8. components/FutbolistadDetail/FutbolistaDetail.jsx

Tendrás que leer **cada uno de los archivos test** y sus descripciónes para avanzar con la resolución del ChckPoint.

⚠️ Dispones de un total de **nueve horas** a partir del envío de este examen para resolverlo y subir tus respuestas a GitHub de la forma correcta.

</br>

---

## ✅ **Condiciones de aprobación**

Para aprobar debes completar al menos **_6_** de los **_8_** testSuite que se encuentran en el CheckPoint.

> Lee bien los tests y lo que piden. Sobre todo los detalles.

> **[NOTA]:** Esta aplicacion esta pensada para que pasen los tests y que tenga la funcionalidad que buscamos. Los estilos son muy simples. Por favor, enfócate primero en pasar los test y luego te invitamos a que le des los estilos que te gusten!

![Qatar](https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/408fd07f-2369-407d-a6db-724beb218ddc/df2um59-e6f4f2d6-de9b-425e-9c7b-9623f3e4d438.jpg/v1/fill/w_1024,h_709,q_75,strp/fifa_world_cup_qatar_2022_by_jafarjeef_df2um59-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzA5IiwicGF0aCI6IlwvZlwvNDA4ZmQwN2YtMjM2OS00MDdkLWE2ZGItNzI0YmViMjE4ZGRjXC9kZjJ1bTU5LWU2ZjRmMmQ2LWRlOWItNDI1ZS05YzdiLTk2MjNmM2U0ZDQzOC5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.DsCrEmxPdNAcsmXdnl_BTm51c3HJpMrjLrzZv_TGl_k)
