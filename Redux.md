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