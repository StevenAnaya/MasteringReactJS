# REDUX

Este documento recolecta toda la información necesaria para entender los aspectos basicos y avanzados sobre el State Manager `Redux`.

En la [documentación](https://redux.js.org/) podemos investigar más a profundidad sobre Redux.

## Redux Concepts - Flow

El concepto de Redux es poder manejar una unica fuente de la verdad, donde se sepa que se modificó, como se hizo y quien lo hizo. Para lograr dichos parametros, Redux implementa el siguiente flujo y los siguientes componentes base:

* **Component**: Este no forma parte integral de Redux, pero se suele usar dentro del flujo para explicar que dicho elemento es el que quiere realizar una actualización en el estado.

* **Action**: Información pre-definida que usualmente tiene como contenido la descripción del evento que ejecutará y posiblemente información que es necesaria para llevar a cabo dicha acción.

* **Reducers**: Funcion(es) que reciben como argumento un *Action*. Este componente actualiza el estado de manera sincrona, por lo tanto, HTTP, codigo asincrono.

* **Central Store**: Objeto global que almacena todo el estado de la aplicación. Este componente actúa como fuente central de la verdad siendo unico portador de estado dentro de la aplicación.

* **Subscriptions**: Eventos que se disparan automaticamente si el *Central Store* modificó algo en su estado. Este componente es el encargado de notificar a todos los modulos que estan atentos por los cambios en alguna(s) propiedad(es) del estado.

## Configuración basica usando VanillaJS

A continuación veremos un ejemplo basico de configuración de Redux usando JavaScript puro. El ejemplo es auto descriptivo y no necesitamos profundizar en detalles.

``` javascript
  const redux = require('redux');

  const createStore = redux.createStore;

  const initialState = {
    counter: 0
  };

  //Reducers
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INC_COUNTER':
        return {...state, counter: state.counter + 1};
      case 'ADD_COUNTER':
        return {...state, counter: state.counter + action.value}
      default:
        return state;
    }
  };

  //Store
  const store = createStore(rootReducer);

  //Subscriptions
  store.subscription(() => {
    console.log('[Subscription]' + store.getState());
  });

  //Dispatching
  store.dispatch({ type: 'INC_COUNTER' });
  store.dispatch({ type: 'ADD_COUNTER', value: 10 });
```

## Conectando Redux con React

Antes de ahondar en las particularidades de la conexión de Redux con React, debemos dejar en claro que ciertos componentes ya mencionados se implementan de igual forma ya sea con JavaScript Puro o con React. Los `Reducers` y el `Store` se implementara de igual forma, en ese caso, tendríamos algo así:

``` javascript
  import ReactDOM from 'react-dom';
  import { createStore } from 'redux';
  import App from '../components/App';
  import rootReducer from '../store/reducer';

  const store = createStore(rootReducer);

  ReactDOM.render(<App />, document.getElementById('root'));
```

reducer.js

``` javascript
  const initialState = {
    counter: 0
  };

  const reducer = (state = initialState, action) => {
    //Reducer Logic goes here...
    return state;
  };

  export default reducer;
```

## Conectando Redux con React - Setup

Para conectar nuestra aplicación con el store que ya hemos creado, debemos usar un paquete desarrollado y mantenido por el equipo de Redux. Para instalar debemos ejecutar los siguientes comandos:

`npm install --save react-redux`

Aquí tenemos la [documentación](https://react-redux.js.org/) del paquete para que le echemos un ojito.

Bien, ahora que hemos instalado el paquete, el primer componente que vamos a usar es `<Provider>`, un HOC que nos permite acceder al Store dentro de componentes que se encuentre en niveles profundos de la jerarquia de componentes de nuestra aplicación. Su implementación es la siguiente:

``` javascript
  import ReactDOM from 'react-dom';
  import { createStore } from 'redux';
  import App from '../components/App';
  import rootReducer from '../store/reducer';
  import { Provider } from 'react-redux';

  const store = createStore(rootReducer);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    <Provider>,
    document.getElementById('root'));
```

Listo, una vez hemos completado el paso anterior, lo siguiente es utilizar o suscribirnos a los cambios del estado dentro de nuestros componentes. Para lograr dicho procedimiento, importamos otro HOC, aunque en realidad, es una función que recibe una función y retorna un HOC. El HOC mencionado es `connect()`.

Aquí tenemos la [documentación](https://react-redux.js.org/api/connect) del metodo `connect()`

``` javascript
  import React, { Component } from 'react';
  import { connect } from 'react-redux';

  class App extends Component {
    render () {
      return (
        <p>The counter value is: {this.props.counter}</p>
      )
    }
  };

  const mapStateToProps = state => {
    //State here is the actual state of Redux Store
    return {
      counter: state.counter
    };
  };
  
  export default connect(mapStateToProps)(App);
```

* El estado del Store se pasa al componente por medio de las props.

## Dispatch Eventos con React Redux

Hemos visto como podemos obtener propiedades del estado usando la función mapStateToProps, pero... ¿Qué hay con el dispatch de eventos?. Veamos como se implementa:

Aquí tenemos la [documentación](https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object) de como configurar nuestros dispatchs. 

``` javascript
  import React, { Component } from 'react';
  import { connect } from 'react-redux';

  class App extends Component {
    render () {
      return (
        <div>
          <p>The counter value is: {this.props.counter}</p>
          <button onClick={this.props.addCounter}>Add</button>
        </div>
      )
    }
  };

  const mapDispatchToProps = dispatch => {
    //dispatch is redux dispatch method
    return {
      addCounter: () => dispatch({ type: 'ADD_COUNTER' })
    };
  };

  const mapStateToProps = state => {
    //State here is the actual state of Redux Store
    return {
      counter: state.counter
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);
```
* El metodo debe recibir principalmente un argumento *dispatch* que en realidad es el metodo que nos provee Redux para realizar el envio de eventos. 
* El metodo `dispatch` no cambia, sigue recibiendo el mismo objeto con el type y con los valores adicionales.

## Actualizar el Estado Inmutablemente

En teoria, Redux nos dice que no debemos crear modificaciones que muten nuestro estado y generen comportamientos innesperados dentro de nuestra aplicación. La preocupación de esto es debido a la naturaleza de los tipos de referencia que existen en JavaScript. Ahora pensando en formas de no mutar el estado indebidamente, podemos usar las practicas más comunes:

``` javascript
  //No Deeping Clone - Works in some cases
  Object.assign({}, values);

  //No Deeping Clone - Works in some cases
  const cloneObj = { ...oldObj, newValues };

  //Deeping Clone - Works in all scenarios
  const newObj = JSON.parse(JSON.stringify(obj));
```
Las soluciones anteriores funcionan perfectamente y no causan efectos de rendimiento, pero si queremos usar una forma más elegante de trabajar con Programación Inmutable, podemos usar la libreria [ImmutableJS](https://immutable-js.github.io/immutable-js/docs/#/)

## Combinando Varios Reducers

Redux nos permite crear una mejora experiencia de desarrollo mediante la separación de Reducers en varios archivos pero la misma libreria se encarga de unificarlos todos en uno solo para pasarlo al Store. El metodo que nos permite combinarlos se llama `combineReducers()`.

Aquí tenemos la [documentación](https://redux.js.org/api/combinereducers) sobre el metodo.

``` javascript
  import { createStore, combineReducers } from 'redux';
  import counterReducer from '../reducer/counter';
  import resultReducer from '../reducer/result';

  const rootReducer = combineReducer({
    ctr: counterReducer,
    res: resultReducer
  });

  const store = createStore(rootReducer);
```

* el metodo combineReducer crea el Store con las claves que le pasamos como nombre y dentro de ellas iran los valores que asignamos como InitialState dentro de nuestro Reducer. Por ejemplo quedaría algo así:

``` javascript
  //Redux Store
  {
    ctr: {
      counter: 0
    },
    res: [0, 20, 30]
  }
```
## Redux Avanzado

### Middlewares

Los Middlewares son un patrón de diseño que nos permite agregar codigo o funciones intermedias que se ejecutan para realizar cierto codigo previo antes que una acción principal se ejecute. Este patrón es muy usado en entornos como ExpressJS por ejemplo, donde se pueden implentar logicas de manejo de rutas, sesiones o redirecciones. Por otro lado, en Redux estos Middlewares están tambien presentes y nos permiten agregar cosas interesantes a nuestro flujo de manejo de estado. 

Aquí podemos ver la [documentación](https://redux.js.org/advanced/middleware) de los Middlewares en Redux.

Poniendo en practica, vamos a crear un simple Middleware para Loggear en pantalla las acciones que se estan enviando:

``` javascript
  import { applyMiddleware } from 'redux';

  const logger = store => {
    return next => {
      return action => {
        console.log('[Middleware] Dispatching' + action);
        const result = next(action);
        console.log('[Middleware] Next state' + store.getState());
        return result;
      };
    };
  };

  const store = createStore(rootReducer, applyMiddleware(logger));
```

* La función es un closure que recibe el store y devuelve una funcion que devuelve otra funcion.
* La función que recibe `next` contiene la función que se ejecutra después del Middleware.
* La función que recibe `action` contiene la información relacionada a la acción que se envía al reducer.
* Redux se encargá de hacer el llamado de esas funciones, no tenemos que preocuparnos por eso, solamante tenemos que pasar como argumento nuestro Middleware dentro de `applyMiddleware`.
* La función que recibe `action` debe ejecutar `next` y pasarle como argumento siempre `action` para que se ejecute el flujo restante y pueda llegar al reducer.
* En este caso una vez ejecutamos `next`, imprimimos en pantalla el estado siguiente usando el parametro Store.


## React DevTools

En la sección anterior aprendimos que son los Middleware y como podemos usarlos. El ejemplo que dimos fue un simple Logger de cada `Action` que se ejecuta cada vez que hacemos el envío, pero a menudo, necesitamos más detalle al inspeccionar nuestras aplicaciones. React DevTools nos permite hacer un seguimiento completo del estado usando una extensión en el navegador y conectando nuestro Store con el Middleware previsto para tal caso.

La instalación de esta herramienta es realmente simple y no necesitamos nada más que la documentación de la misma.

[React DevTools Documentation](https://github.com/zalmoxisus/redux-devtools-extension)

## Actions Creators

Son Funciones que crean y retornan accione, Así de simple son. Estas pueden recibir información adicional.

Aquí tenemos la [documentación](https://redux.js.org/basics/actions/#action-creators)

``` javascript
  const increment = (valueIncrement) => {
    return {
      type: INCREMENT,
      value: valueIncrement
    }
  };
```

Component.js
``` javascript
  import * as actionCreators from '../actions';

  const mapDispatchToProps = dispatch => {
    return {
      increment: () => dispatch(actionCreators.increment())
    };
  };
```

## Acciones Asincronas con Redux Thunk

[Redux Thunk](https://github.com/reduxjs/redux-thunk) es una libreria que nos permite crear Acciones con codigo asincrono sin alterar o generar errores dentro del funcionamiento normal de Redux. Los conceptos básicos de esta libreria son simples:

* Una Acción asincrona siempre debe usar `dispatch` con una acción sincrona.

Para configurar esta libreria debemos, primero, instalarla:

`npm install --save redux-thunk`

Luego, debemos configurar nuestro Store con este nuevo Middleware:

``` javascript
  import { createStore, compose, applyMiddleware } from 'redux';
  import thunk from 'redux-thunk';

  const logger = store => {
    return next => {
      return action => {
        const result = next(action);
        return result;
      };
    };
  };

  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(logger, thunk))
  );
```

Una vez tengamos nuestro Store configurado podemos crear Actions Asincronas:

``` javascript
  import api from '../api';

  export const savePost = (post) => {
    return {
      action: SAVE_RES,
      post: post
    };
  };

  export const showError = (error) => {
    return {
      action: SHOW_ERROR,
      error: error
    };
  };

  export const asyncLoadPost = () => {
    return dispatch => {
      api.post
        .then(res => {
          dispatch(savePost(res));
        })
        .catch(err => {
          dispatch(showError(err));
        });
    };
  };
```

* Redux Thunk se encarga de interceptar nuestros actions y agregarle ese toque asincrono.