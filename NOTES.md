# MASTERING REACTJS NOTES

En estas notas no habran anotaciones sobre aspectos basicos de React debido a que la finalidad 
de estas son mejorar habilidades y consolidar conceptos relacionadas a temas avanzados de la 
libreria.

## Defs

* React External Library: Is the logic We need for creating React Components.
* ReactDOM External Library: Is about rendering Components to the real DOM.

## Estructura de Proyecto

En este caso, vamos a usar una herramienta muy popular en la comunidad de React llamada
create-react-app, esta es una plantilla de configuración que nos permite crear un proyecto React
facilmente. Para crear el proyecto, solamente tenemos que ejectuar los siguientes comandos:

`sudo npm install create-react-app -g`

y luego ejecutar este otro:

`create-react-app [app-name]`

[Documentación](https://create-react-app.dev/docs/getting-started/)

## Basics

### JSX

Es una forma de crear ReactComponents usando una "Syntatic Sugar" parecida a HTML, pero que en el fondo
es compila a JavaScript. Esta nos permite crear codigo más legible, mantenible y escalable. JSX luce así:

``` html
  <App className="App">
    <h1>Hello World</h1>
  </App>
```

* **NOTA**: Cuando creamos React Components debemos tener en cuenta de que estamos creando JavaScript al final, 
es por eso que debemos usar los nombres que nos entrega React para los atributos de los elementos. En este caso
se ve que en lugar de class (La cual es una palabra reservada en JS) usamos className para no crear conflictos.

Por otro lado, cuando usamos dicha sintaxis, siempre tenemos importar la libreria `react` que es la que se 
encarga de proveernos todo el JavaScript necesario para crear ReactComponents y que después Babel se encargará 
de usar para transformar todo el codigo JSX en JavaScript. Veamos un ejemplo de como se crean los Componentes con JavaScript:

``` javascript
import React, { Component } from 'react';

class App extends Component {
  render () {
    return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Hello World!'))
  };
};

export default App;
```

Al final de cuentas, es mucho mejor usar JSX en lugar de usar JavaScript, especialmente si tenemos muchos elementos anidados.

### Props & State

Props y State son los conceptos principales de React permitiendole saber cuando renderizar o actualizar el DOM de la pagina. Estos dos objetos se majenan de forma separada y dependiendo del componente que creemos. El State puede ser manejado de dos formas: usando Statefull Components o ahora con PureComponents usando Hooks. 

En otro sentido, Props se usa en componentes funcionales y son pasadas desde un componente padre a un componente incrustado.

### Eventos

En React podemos escuchar eventos de nuestros Componentes, pero para continuar con el objetivo de este curso, no vamos a profundizar como funciona, en lugar de eso, vamos a listar la cantidad de eventos que podemos escuchar (Casi la misma cantidad que con JS puro).

  #### Clipboard Events:

    * Eventos: *onCopy, onCut, onPaste*
    * Propiedades: DOMDataTransfer, clipboardData

  #### Composition Events

  * Eventos: *onCompositionEnd onCompositionStart onCompositionUpdate*
  * Propiedades: string data

  #### Keyboard Events

    * Eventos: *onKeyDown onKeyPress onKeyUp*
    * Propiedades: 

        - **boolean** altKey
        - **number** charCode
        - **boolean** ctrlKey
        - **boolean** getModifierState(key)
        - **string** key
        - **number** keyCode
        - **string** locale
        - **number** location
        - **boolean** metaKey
        - **boolean** repeat
        - **boolean** shiftKey
        - **number** which

  #### Focus Events

    * Eventos: *onFocus onBlur*
    * Propiedades: DOMEventTarget relatedTarget

  #### Form Events

    * Eventos: *onChange onInput onInvalid onSubmit*

  #### Mouse Events

    * Eventos: 
        - *onClick* 
        - *onContextMenu*
        - *onDoubleClick*
        - *onDrag* 
        - *onDragEnd*
        - *onDragEnter*
        - *onDragExit*
        - *onDragLeave*
        - *onDragOver*
        - *onDragStart*
        - *onDrop*
        - *onMouseDown*
        - *onMouseEnter*
        - *onMouseLeave*
        - *onMouseMove*
        - *onMouseOut*
        - *onMouseOver*
        - *onMouseUp*
    * Propiedades:
        - **boolean** altKey
        - **number** button
        - **number** buttons
        - **number** clientX
        - **number** clientY
        - **boolean** ctrlKey
        - **boolean** getModifierState(key)
        - **boolean** metaKey
        - **number** pageX
        - **number** pageY
        - **DOMEventTarget** relatedTarget
        - **number** screenX
        - **number** screenY
        - **boolean** shiftKey

  #### Selection Events

    * Eventos: *onSelect*

  #### Touch Events

    * Eventos: *onTouchCancel onTouchEnd onTouchMove onTouchStart*
    * Propiedades:
        - **boolean** altKey
        - **DOMTouchList** changedTouches
        - **boolean** ctrlKey
        - **boolean** getModifierState(key)
        - **boolean** metaKey
        - **boolean** shiftKey
        - **DOMTouchList** targetTouches
        - **DOMTouchList** touches

  #### UI Events

    * Eventos: *onScroll*
    * Propiedades:
      - **number** detail
      - **DOMAbstractView** view

  #### Wheel Events

    * Eventos: *onWheel*
    * Propiedades:
      - **number** deltaMode
      - **number** deltaX
      - **number** deltaY
      - **number** deltaZ

  #### Media Events

    * Eventos:
        - *onAbort*
        - *onCanPlay*
        - *onCanPlayThrough*
        - *onDurationChange*
        - *onEmptied*
        - *onEncrypted*
        - *onEnded*
        - *onError*
        - *onLoadedData*
        - *onLoadedMetadata*
        - *onLoadStart*
        - *onPause*
        - *onPlay*
        - *onPlaying*
        - *onProgress*
        - *onRateChange*
        - *onSeeked*
        - *onSeeking*
        - *onStalled*
        - *onSuspend*
        - *onTimeUpdate*
        - *onVolumeChange*
        - *onWaiting*

  #### Image Events

    * Eventos: *onLoad onError*

  #### Animation Events

    * Eventos: *onAnimationStart onAnimationEnd onAnimationIteration*
    * Propiedades: 
      - **string** animationName
      - **string** pseudoElement
      - **float** elapsedTime

  #### Transition Events

    * Eventos: *onTransitionEnd*
    * Propiedades: 
        - **string** propertyName
        - **string** pseudoElement
        - **float** elapsedTime

  #### Other Events

    * Eventos: *onToggle*

### React Hooks

React Hooks son pequeñas funciones que nos exporta React para realizar, por ejemplo, el manejo del estado de un componente, sin importar si es uno funcional o uno basado en clases. Los Hooks nos permite enfocarnos más en la practica de crear más componentes funcionales en lugar de clases, dando un codigo por ejemplo, más facil de mantener y de leer, porque al final, luce totalmente como JavaScript.

Veamos un ejemplo de como se usaría React Hooks para manejar el estado.

``` javascript
  import React, { useState } from 'react';

  const app = () => {
    // Instanciamos nuestro Hook para manejar el estado de nuestro numero
    const [ number, setNumber ] = useState(1);
    const [ fruit, setFruit ] = useState('Apple');

    const switchValuesHandler = () => {
      // El estado cuando usamos Hooks no hace merge, se reemplaza por el nuevo estado
      setNumber(2);
      setFruit('Coconuts');
    };

    return (
      <div>
        <button onClick={switchValuesHandler}>Switch Values</button>
        <p>You have { number } { fruit }</p>
      </div>
    );
  };

  export default app;
```

### Pasando metodos como referencias

Tenemos dos formas de pasar argumentos a nuestra función manejadora de eventos:

* Usando el metodo **bind(context, [...args])** el cual nos permite evitar que la función se ejecute inmediatamente (Hace más que eso, pero en este caso nos ayuda para lo anterior descrito).

  ``` javascript
    import React, { useState } from 'react';

    const app = () => {
      const [ number, setNumber ] = useState(1);
      const [ fruit, setFruit ] = useState('Apple');

      const switchValuesHandler = (fruitName) => {
        setNumber(2);
        setFruit(fruitName);
      };

      return (
        <div>
          <button onClick={switchValuesHandler.bind(this, 'Banana')}>Switch Values</button>
          <p>You have { number } { fruit }</p>
        </div>
      );
    };

    export default app;
  ```

  o 

  * Usando **Arrow Functions**, la cual no es una forma estandar y recomendada de hacerlo debido a que no es tan eficiente, de igual forma, estos errores de rendimiento se notarán dependiendo de que tan grande sea el desarrollo.

  ``` javascript
    import React, { useState } from 'react';

    const app = () => {
      const [ number, setNumber ] = useState(1);
      const [ fruit, setFruit ] = useState('Apple');

      const switchValuesHandler = (fruitName) => {
        setNumber(2);
        setFruit(fruitName);
      };

      return (
        <div>
          <button onClick={() => switchValuesHandler('Banana')}>Switch Values</button>
          <p>You have { number } { fruit }</p>
        </div>
      );
    };

    export default app;
  ```

### Two Way Binding

Cuando intentamos hacer actualizaciones desde los dos lados, como por ejemplo, un input de un formulario, lo podemos lograr de la siguiente manera:

``` javascript
import React, { Component } from 'react';
import './App.css';

/* COMPONENTS */
import Person from './Person';

class App extends Component {
  changePersonHandler = event => {
    this.setState({
      persons: [
        { name: 'Steven', age: 23 },
        { name: event.target.value, age: 34 },
        { name: 'Carolina', age: 31 },
      ]
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.switchPersonHandler.bind(this, 'Ariel')}>Switch Me</button>
        <Person
          click={this.switchPersonHandler.bind(this, 'Anaya')}
          change={this.changePersonHandler}
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}/>
      </div>
    );
  };
}

export default App;

```

Person.js
``` javascript
  import React from 'react';

  const Person = (props) => {
    return (
      <div>
        <p onClick={props.click}>I'm {props.name} and I'm {props.age} years old!</p>
        <p>{props.children}</p>
        <input type="text" onChange={props.change} value={props.name}/>
      </div>
    );
  };

  export default Person;
```