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

  ### Clipboard Events:

    * Eventos: *onCopy, onCut, onPaste*
    * Propiedades: DOMDataTransfer, clipboardData

  ### Composition Events

  * Eventos: *onCompositionEnd onCompositionStart onCompositionUpdate*
  * Propiedades: string data

  ### Keyboard Events

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

  ### Focus Events

    * Eventos: *onFocus onBlur*
    * Propiedades: DOMEventTarget relatedTarget

  ### Form Events

    * Eventos: *onChange onInput onInvalid onSubmit*

  ### Mouse Events

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

  ### Selection Events

    * Eventos: *onSelect*

  ### Touch Events

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

  ### UI Events

    * Eventos: *onScroll*
    * Propiedades:
      - **number** detail
      - **DOMAbstractView** view

  ### Wheel Events

    * Eventos: *onWheel*
    * Propiedades:
      - **number** deltaMode
      - **number** deltaX
      - **number** deltaY
      - **number** deltaZ

  ### Media Events

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

  ### Image Events

    * Eventos: *onLoad onError*

  ### Animation Events

    * Eventos: *onAnimationStart onAnimationEnd onAnimationIteration*
    * Propiedades: 
      - **string** animationName
      - **string** pseudoElement
      - **float** elapsedTime

  ### Transition Events

    * Eventos: *onTransitionEnd*
    * Propiedades: 
        - **string** propertyName
        - **string** pseudoElement
        - **float** elapsedTime

  ### Other Events

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
### Manejando contenido de forma condicional

Es común encontrarnos con el escenario de mostrar cierto contenido dependiendo del valor de una variable. Para esto, en React podríamos hacerlo usando *Operadores Ternarios* pero a la larga, a medida de que va creaciendo nuestra aplicación, se va haciendo complejo de leer y mantener. 

Una forma elegante y más legible de retornar elementos JSX. Aquí el ejemplo:

``` javascript
  import React, { Component } from 'react';

  class App extends Component {
    state = {
      showPerson: false
    };

    render () {
      // Crea una variable separada para manejar que retornar
      let persons = null;

      // Evalua si se debe mostrar el contenido y de ser así reasigna el valor con el contenido
      if (this.state.showPerson) {
        persons = (
          <Person name="Andres" age={25}/>
        );
      };

      return (
        <div>
          <button onClick={this.switchPersonsHandler}>Show Persons!</button>
          { persons }
        </div>
      );
    }
  };

  export default App;
```
  * De esta forma vemos que conservamos una estructura de codigo mucho más legible y no es tan confusa al no tener tantos anidamientos en las condiciones.


### Actualizar el estado inmutablemente

En cualquier lenguaje de programación lidiamos siempre con un evento simple... Copiar valores de una variable ya existente a otra nueva. Esto de primera mano parece sencillo, ¿pero que pasa en JavaScript? (Especialmente con los Objetos y Arreglos); Al tratar de copiar un Objeto y/o Arreglo manualmente, obtenemos su referencia de memoria más no una variable con puntero independiente, es decir, cualquier cambio que hagamos en, ya sea una copia o el original, se va a ver reflejado en todos los demás que se encuentre  referenciados a ese mismo puntero.

Ahora, sin divagar tanto en el asunto, ¿como podemos modificar el *state* en React sin que creemos funcionamientos no controlados debido a problemas en las referencias? Facil, veamos un ejemplo:

``` javascript
  import React, { Component } from 'react';

  class App extends Component {
    state = {
      persons = [
        "carlos",
        "andrea",
        "Stephanie"
      ]
    };
    
    deletePersonHandler = personIndex => {
      // Crea una copía, no asignes la referencia del estado
      // para crear una copia en JS puedes usar las HOF o usar otra estrategia para crear una copia independiente
      const persons = [...this.state.persons];
      persons.splice(personIndex, 1);
      // Ahora puedes actualizar el estado con la nueva información
      this.setState({ persons });
    };
 
    render () {
      return (
        <div>
          {
            this.state.persons.map((person, index) => {
              return <Person 
                  name={person}
                  click={this.deletePersonHandler.bind(this, index)}
                />
            })
          }
        </div>
      )
    };
  };

  export default App;
```

### No uses el index

Es común que en React utilicemos la propiedad *index* que nos entregan las HOF como propiedad *key* cuando intentamos renderizar listas, pero esto nos lleva a una mala practica y aun problema de rendimiento. React necesita identificadores claves unicos que le permitan hacer las comporacaciones entre el RealDOM y el VirtualDOM de manera eficiente sin tener que comparar toda la lista completa. Simplemente, en muchos casos, podemos usar ID's unicos que nos retornan los servicios o las bases de datos que tengamos a disposición.

### Debbuging React Apps

Una forma de depurar aplicaciones creadas con React, es utilizar la pestaña "Source" de las herramientas de la consola del navegador, poniendo *breakpoints* los cuales harán de pausador del codigo y nos permitira navegar paso por paso, conociendo los valores de las variables y la ejecución del codigo que vamos viendo.

Otra forma de poder ver que estamos codificando, es usar las extensiones que nos provee la comunidad para ver la jerarquia y todo lo relacionado al renderizado de los componentes en el navegador. Dichas extensiones estan disponibles tanto para Chrome como para Firefox. Lo unico que debemos hacer es dirigirnos a la pestaña de "Componentes" de la consola de desarrollo del navegador y ahí encontraremos toda la información relacionada a los componentes.

### Error Boundaries

En React podemos manejar algunos componentes problematicos usando el metodo `componentDidCatch` el cual nos permite capturar las excepciones arrojadas por un componente en el momento de un fallo. En la practica, es usar componentes HOC con los cuales vamos a encerrar nuestros componentes problematicos y en donde vamos manipular el error para mostrar un estado controlado de dicho error.

  * Se recomienda no usar estos *Boundaries* en toda nuestra aplicación, de hecho se recomienda usarlos prudentemente en los componentes que sabemos pueden generar errores.

  * Este tipo de manejo de excepciones solo se puede ver en producción. En modo de desarrollo las excepciones seguirán apreciendo normalmente.

``` javascript
  import React, { Component } from 'react';

  class ErrorBoundary extends Component {
    state = {
      showErr: false,
      message: ''
    };

    componentDidCatch = (err, message) => {
      this.setState({ showErr: true, message });
    };
    
    render () {
      if (showErr) {
        return (
          <h1>{this.state.message}</h1>
        );
      }

      return this.props.children;
    };
  };

  export default ErrorBoundary;
```

En el otro archivo:

``` javascript
  import ErrorBoundary from './ErrorBoundary';

  //...Definición de la clase
  render () => {
    <ErrorBoundary>
      <FailComponent />
    </ErrorBoundary>
  }
```
En la documentación oficial de React, podemos ver más a profundidad este tema, donde aprenderemos los metodos del ciclo de vida disponibles para el manejo de errores, como usarlos, donde usarlos y como diferenciarlos de un simple TryCatch.

[Error Boundary React](https://es.reactjs.org/docs/error-boundaries.html)

### Profundizando conceptos internos de los Componentes y React

### Ciclo de vida de los Componentes - Desde React 16.3

En la actualidad, con React podemos manejar el ciclo de vida de nuestros componentes de dos formas, usando componentes basados en clases o usando React Hooks con componentes funcionales. Debido al enfoque de este curso, veremos como se maneja con componentes de clase y su equivalente en componentes con React Hooks.

Los componentes pasan por distintos estados en el momento en que son renderizados en el DOM, veamos cuales son y que fases del ciclo de vida componen cada estado:

### Ciclo de vida - Creación

Cuando un componente (Componente de clases en este caso) se va crear sigue el siguiente orden de ejecución:

  * `constructor(props)`: Esta fase esta más relacionada a como funcionan las clases de JavaScript. Este nos sirve para inicializar estados iniciales de nuestro componente. A nivel tecnico siempre que vayamos a usar este metodo, se recomienda usar el metodo `super(props)` para enlazar las propiedades al Scope this de la clase.

    * DO: Configurar el estado inicial.
    * DON'T: Usar codigo que pueda causar efectos colaterales en el componente, como lo son las peticiones HTTP.

    ``` javascript
      constructor(props) {
        super(props);

        this.state = {
          showTitle: this.props.showTitle
        };
      };
    ```

  * `getDerivedStateFromProps(props, state)`: Este Hook nos permite actualizar el estado interno de nuestro componente cuando las propiedades (props) hayan cambiado, es decir, se ejecutará cada vez que un cambio en las propieades se registre. Este Hook es poco común al momento de usar React, pero es bueno tenerlo siempre en mente.

  Ten en cuenta que este método se activa en cada renderizado, independientemente de la causa y justamente antes del render y siempre que haya algun cambio de estado posterior.

    * DO: Sincronizar el estado.
    * DON'T: Usar codigo que pueda causar efectos colaterales en el componente, como lo son las peticiones HTTP.

  ``` javascript
      static getDerivedStateFromProps(props, state) {
        // State sync
        return state;
      };
  ```
  
  * `render()`: Se encarga de preparar y estructurar todo el codigo JSX que hemos definido. Es importante saber que nada puede estar bloqueando este metodo, porque puede causar problemas de rendimiento.

    * DO: declarar el codigo JSX.
    * DON'T: Usar codigo que pueda causar efectos colaterales en el componente, como lo son las peticiones HTTP.

    ``` javascript
      render() {
        return (
          <MyApp />
        );
      };
    ```

  * `Render Child Components`: Una vez que el metodo render se ha ejecutado, el empezará a renderizar todos los componentes hijos que contenga, si es que es el caso. render esperará hasta que todos los hijos hayan ejucutado todos los Hook del ciclo de vida también.

  * `componentDidMount()`: Cuando el metodo render finalizado la creación, se ejecuta componentDidMount y es aquí donde podemos causar efectos colaterales como llamados HTTP y demás peticiones que usen la web. Es imperativo decir que en este metodo es muy mala practica actualizar el estado sincronamente, es decir, solo debemos actualizarlo si estamos haciendo petiones que usan promesas o codigo asincrono, todo esto, para evitar problemas de re-renderizados innecesarios que afectan directamente el rendimiento de nuestro codigo.

    * DO: Usar codigo que pueda causar efectos colaterales como peticiones HTTP, llamados a localStorage, etc.
    * DON'T: Actualizar el estado sincronamente dentro del metodo. 

    ``` javascript
      componentDidMount() {
        // SideEffect stuffs
      };
    ```

### Ciclo de vida - Actualización

Esta fase inicia con el metodo `getDerivedStateFromProps` y se encarga de todo el proceso relacionado al renderizado cuando el estado o las props cambian. Veamos que metodos componen esta fase y como se deben usar correctamente:

  * `getDerivedStateFromProps(props, state)`: Sabemos como funciona este metodo, pero cabe resaltar que este es punto inicial de la fase de actualización.

    * DO: Sincronizar el estado con las props.
    * DON'T: Usar codigo que pueda causar efectos colaterales en el componente, como lo son las peticiones HTTP.
  
  * `shouldComponentUpdate(nextProps, nextState)`: Se encarga de decidir si debe re-evaluar y re-renderizar el componente. Este metodo nos permite crear mejoras en el rendimiento, evitando re-renderizados innecesarios. *Debemos tener en cuenta que este metodo puede cancelar el proceso de actualización y por ende generar comportamientos no controlados.* Para este metodo debes retornar `true` o `false`, no podemos crear expresiones que no retornan nada, debido a que de esa manera React sabe si debe o no continuar con el proceso.

    * DO: Decidir SI continuar con la actualización del componente o NO.
    * DON'T: Usar codigo que pueda causar efectos colaterales en el componente, como lo son las peticiones HTTP.

    ``` javascript
      shouldComponentUpdate(nextProps, nextState) {
        if (this.state.number == nextState.number) {
          return false;
        };

        return true;
      };
    ```

  * `render()`: funciona exactamente igual que el render de la fase de Creación.

  * `Update Child Component Props`: Actualiza todos los nodos hijos en los cuales ha cambiado sus propiedades.

  * `getSnapshotBeforeUpdate(prevProps, prevState)`: Permite recuperar las propiedades y el estado anterior justamente antes de que la actualización en el DOM ocurra. Este metodo no nos permite realizar actualizaciones en el DOM, sino crear objetos con los estados y propiedades que queremos conservar para luego consumirlo o manipularlo como deseemos. No es común su uso, pero una practica que puede funcionar con este, es conservar la posición del scroll del usuario cuando estamos renderizando nuevos componentes.

    * DO: Operaciones de ultimo minuto que tengas que hacer antes de renderizar el DOM.
    * DON'T: Usar codigo que pueda causar efectos colaterales en el componente, como lo son las peticiones HTTP.

    ``` javascript
      getSnapshotBeforeUpdate(prevProps, prevState) {
        // Tenemos que retornar un objeto cualquiera con los datos que queremos capturar o guardar en el siguiente metodo
        return {
          scrollX: prevState.scrollX,
          message: 'Render perfomed on component' + {prevState.numberComponent}
        }
      };
    ```

  * `componentDidUpdate(prevProps, prevState, snapshot)`: Este se ejecuta cuando el renderizado se realiza exitosamente. Podemos realizar en este peticiones HTTP o operaciones con efectos colaterales, debemos estar precabidos de no generar ciclos infinitos de rerenderizados innecesarios.

    * DO: Realizar operaciones de efectos colaterales.
    * DON'T: Actualizar el estado sincronamente o generar disparadores de rerenderizado.

  ``` javascript
    componentDidUpdate(prevProps, prevState, snapshot) {
      this.setState({ scrollX: snapshot.scrollX }); // No es ideal, solo un ejemplo
      //Otras cosas asincronas...
    };
  ```

### Ciclo de vida - Hooks

Los `React Hooks` son funciones que nos entrega React para acceder al ciclo de vida (no completamente, pero podemos usar los metodos mas utiles) y al estado de un componente enteramente funcional. Estos se ejecutan cada vez que ocurre un cambio en el componente en el caso del useEffect() (Podemos prevenir ese comportamiento agregandole ciertas implementaciones), es decir, cada vez que se crear el componente se ejecuta, cada vez que se actualiza también.

La sintaxis basica de los dos Hooks que más vamos a usar es la siguiente:

  * useState: `const [state, setNewState] = useState(initialState)`
  * useEffect: `useEffect(() => {//SideEffect code...}, [])`

  #### Controlando el comportamiento de useEffect()

  Cuando usamos `useEffect()` es común enfretarnos al problema del renderizado involuntario. Claro, si nosotros no le especificamos a React cuando debe y cuando no actualizarse, el lo hará siempre por defecto. Veamos entonces como podemos decirle a React cuando y bajo que condiciones debe ejecutarse el metodo `useEffect`. Antes debemos saber que esto se da usando el segundo argumento de useEffect, que puede ser un arreglo con las propiedades que se encargara de vigilar.

  1) Cuando debe ejecutarse dependiendo de la actualización de una propiedad.
  
    ``` javascript
      import React, { Fragment, useEffect } from 'react';

      import { StyledButton } from './styles';

      const Cockpit = (props) => {
        useEffect(() => {
          setTimeout(() => {
            alert('Saved Data to the Cloud!');
          }, 1000);
        }, [props.persons]);

        const classes = [];

        if (props.persons.length <= 2) {
          classes.push('red');
        };

        if (props.persons.length <= 1) {
          classes.push('bold');
        };

        return (
          <Fragment>
            <h1>{props.title}</h1>
            <p className={classes.join(' ')}>I display persons information</p>
            <StyledButton
              onClick={props.clicked}
              alts={props.showPersons}>Show Persons</StyledButton>
          </Fragment>
        );
      };

      export default Cockpit;
    ```

    * Esta implementación se ejecutará unicamente cuando la propiedad persons cambie de estado, es decir, si cambia cualquier otra propiedad que no sea la especificada, esta no se ejecutará. NOTA: siempre se ejecutara 1 vez inicial.

  2) Cuando debe solo ejecutarse una vez inicial, es decir imitar el comportamiento de componentDidMount.
  
    ``` javascript
      import React, { Fragment, useEffect } from 'react';

      import { StyledButton } from './styles';

      const Cockpit = (props) => {
        useEffect(() => {
          setTimeout(() => {
            alert('Saved Data to the Cloud!');
          }, 1000);
        }, [); // Pass an empty Array

        const classes = [];

        if (props.persons.length <= 2) {
          classes.push('red');
        };

        if (props.persons.length <= 1) {
          classes.push('bold');
        };

        return (
          <Fragment>
            <h1>{props.title}</h1>
            <p className={classes.join(' ')}>I display persons information</p>
            <StyledButton
              onClick={props.clicked}
              alts={props.showPersons}>Show Persons</StyledButton>
          </Fragment>
        );
      };

      export default Cockpit;
    ```
    * Cuando pasamos un arreglo vacio, React entiende que no tenemos dependencias enlazadas a nuestro componente y por ende solo ejecutará el Hook una vez. Esa ejecución se da al momento de montar el componente, más exactamente cuando se ha montado.

  #### Realizando operaciones de limpieza en los metodos del ciclo de vida y useEffect

  Es comun encontrarnos con el escenario de tener que remover una conexión a un servicio al momento de eliminar ciertos componentes, claro, esto significa una buena practica y una mejora en el rendimiento de nuestra aplicación, ¿Pero como podemos lograr ese proceso de limpieza con React?... Sencillo, usamos los siguientes metodos y las siguientes implementaciones con useEffect.

    * `componenteWillUnmount`: Este metodo siempre se ejecuta justo antes de que el componente sea desmontado del DOM. Es perfecto para realizar tareas de limpieza de datos, storages, conexiones o EventListeners.

      ``` javascript
          componentWillUnmount() {
            //Remove logic code here...
          };
      ```
    
  En el caso de los React Hooks, su implementación se hace cuanto menos sencilla y su ejecución depende igualmente de las dependencias que tengamos como "disparadoras". Veamos ejemplos:

    * Sin importar las dependencias que pongamos, este efecto de limpieza o de desmontado no se ejecutará en el primer ciclo de renderizado, es decir, en el ciclo de creación del componente.

    * **Ejecución despues de cada actualización**: Al igual que cuando usamos useEffect sin dependencias este se ejecutara en cada ciclo de actualización y el orden de ejecucion será 1) función 2 del return 2) función 1 del cuerpo de useEffect.

      ``` javascript
        useEffect(() => {
          /* -----------Funcion 1 del cuerpo------------ */
          setTimeout(() => {
            console.log('Ejecución normal del useEffect');
          }, 1000);
          /* -----------Funcion 1 del cuerpo------------ */

          /* -----------Funcion 2 del return------------ */
          return () => { 
            console.log('Cleanup in useEffect')
          };
          /* -----------Funcion 2 del return------------ */
        }); //Whitout second argument
      ```
      * Este metodo se ejecutara cada vez que exista un re-render, puede ser util para cuando tenenmos que hacer algun efecto de limpiar datos y demás.
    
    * **Unicamente cuando el componente se desmonte**: Se ejecutará unicamente cuando el componente en el que fue usado el Hook se vaya a desmontar. Ningun otro efecto de actualizado en la jerarquia del arbol disparará este metodo de limpieza a no ser de que el mismo componente se vaya a desmontar.

      ``` javascript
        useEffect(() => {
          /* -----------Funcion 1 del cuerpo------------ */
          setTimeout(() => {
            console.log('Ejecución normal del useEffect');
          }, 1000);
          /* -----------Funcion 1 del cuerpo------------ */

          /* -----------Funcion 2 del return------------ */
          return () => { 
            console.log('Cleanup in useEffect')
          };
          /* -----------Funcion 2 del return------------ */
        }, []); //Passing empty array or an array with dependencies
      ```
        * Este metodo se ejecuta una sola vez cuando el componente se va a desmontar. Si pasamos dependencias, el resultado no varia a excepción de las condiciones que tomará en cuenta para poder ejecutar la función.

  #### Usando ShouldComponentUpdate para mejorar el rendimiento

  Para entrar en contextp, React actualiza el DOM comparando el VirtualDOM con el RealDOM, es decir, si existen cambios React se encargará de actualizar lo que se ve en pantalla. Claro, esto en un principio resulta estupendo para nosotros pero podemos mejorar este comportamiento, ¿Como podemos lograrlo?... Sencillo, tengamos en mente que cuando un componente que tiene 2 componentes hijos, quiere actualizar solo 1, el ejecutará el metodo render y realizará todas las operaciones de Renderizado en todos sus hijos, en pocas palabras, el hará la comparación de cada componente en el VirtualDOM con los existentes en el RealDOM, pero si uno no cambió y queremos por temas de rendimiento, evitar que React haga la comparación, podemos usar el metodo ShouldComponenteUpdate que le dirá a React bajo que condiciones realizar la comparación. Veamos un ejemplo de esto en codigo:

    ``` javascript
      shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.ourDependencie !== this.props.ourDependecie) {
          return true;
        } else {
          return false;
        };
      };
    ```

      * A grandes rasgos, lo que hacemos es decirle a React, que si la propiedad(es) que le indicamos cambia, ejecute la comparación y por ende haga la actualización, de otra forma, no deberia hacer nada ni dentro del VirtualDOM ni del RealDOM.

      * **NOTA**: es imperativo decir, que React o JavaScript si intentamos hacer comparaciones con *Reference Types* estamos comparando los punteros y si no manejamos los cambios de estados en nuestros componentes de forma inmutable, vamos a tener problemas de comparación y nuestros componentes no se comportarán como esperamos.


  #### Mejora de rendimiento en Componentes Funcionales con React.memo

  Vimos una ventaja poderosa de los componentes basados en clases que nos permite mejorar el rendimiento atraves del metodo ShouldComponentUpdate, pero al analizar los nuevos enfoques de React, ¿Como podemos ganar esa mejora de rendimiento con componentes Funcionales?... Facil, usamos la función de React llama `memo` que utiliza Memoización para realizar una pequeña captura del estado o de las propiedades del componente, almacenarla dicha captura, y comparar si las propieades actuales y las siguientes son diferentes para realizar una actualización pertinente. Veamos el ejemplo:

    ``` javascript
      import React from 'react';

      const MemoComp = (props) => {
        //Component code here...
      };

      export default React.memo(MemoComp);
    ```

  #### PureComponent en lugar de ShouldComponentUpdate

  Pensemos lo siguiente, ¿Qué tendriamos que hacer si necesitamos verificar todas las propiedades que nos llegan en un componente dentro del ShouldComponentUpdate?... Tendriamos que agregar validaciones que puede que sean demasiado largas y dificiles de mantener y reusar. Ante dicho problema, React nos permite extender de una clase llamada `PureComponent` que se encarga de realizar todas estas validaciones de renderizada segun el cambio de sus propiedades. Veamos el codigo:

    ``` javascript
      import React, { PureComponent } from 'react';

      class Component extends PureComponent {
        render() {
          return (
            <OtherComponent />
          );
        };
      };

      export default Component;
    ```

    * No hay necesidad siquiera de escribir el metodo ShouldComponentUpdate. La clase `PureComponent` se encarga de realizar las validaciones de render con todas las propiedades que tiene o le son pasadas al componente.


### ¿Como React actualiza el DOM?

React utilza un metodo para sugerir que se debe renderizar (`render`) pero el usarlo no significa que realmente lo que pongamos en dicho metodo es lo que se va a ver o actualizar en el DOM, ¿Porqué?. React crea 2 copias del DOM, mas exactamente 2 VirtualDOM.

  1) **Old VirtualDOM**: contiene todo el estado del DOM anterior.
  2) **Re-rendered VirtualDOM**: contiene todos los componentes que se envian a un re-renderizado debido a actualización en sus propiedades.

Dichas copias funcionan mucho más rapido que el DOM del navegador y es por eso que React previene que sea hagan demasiadas actualizaciones en él, con eso en mente, es por eso que existen metodos como `ShouldComponentUpdate` que nos ayudan a prevenir dichos renderizados innecesarios. Por otro lado, la forma en la que React actualiza el estado es la siguiente: 

  1) ejecución del metodo render()
  2) comparación entre `Old VirtualDOM` y `Re-rendered VirtualDOM`.
  3) Sí existen diferencias entre ellos, se actualiza el DOM unicamente las partes que cambiaron, de otro modo, no se actualizará nada en el RealDOM.

  [React Update DOM Image](https://firebasestorage.googleapis.com/v0/b/token-sport.appspot.com/o/IllustrationNew%2FScreenshot_2020-01-23%20React%2016%20The%20Complete%20Course%20(incl%20React%20Router%204%20Redux).png?alt=media&token=8ba260f6-e38e-4c41-95d4-c17eec5aa068)

### Renderizando Elementos JSX Adyacentes

Seguro ya nos hemos topado con el error que nos indica que no podemos renderizar más de un elemento sin que esten envueltos en un componente padre. Es cuanto menos frustrante a veces y nos preguntamos porque no podemos renderizar elementos de esa forma?... La respuesta no envia a como funciona JavaScript. En JavaScript no podemos retornar mas de 1 expresión al tiempo. Ahora todo tiene sentido, debido a que React es enteramente JavaScript. Pero bueno, ahora que sabemos el porqué, veamos unas posibles soluciones improvisadas a esto:

  * Retornar un arreglo con nuestros elementos JSX dentro. Esto funciona completamente, pero para poder renderizarlos tenemos que especificarles la propiedad `key` y resultaría engorroso agregarle una clave unica a cada elemento.
    ``` javascript
      const App = props => {
        return [
          <p key="u1">Hola</p>,
          <p key="u2">Mundo</p>,
          <p key="u3">En JSX</p>
        ];
      }
    ```
  
  * Otra alternativa es crear un HOC (High Order Component) y retornar en el la propiedad `children` que recibimos. Luego, en nuestro componente con elementos adyacentes, importamos y envolvemos nuestros elementos con nuestro nuevo HOC.

    ``` javascript
      const hoc = props => props.children;

      export default hoc;
    ```
    //Componente Adyacente
    ``` javascript
      import hoc from './hoc';

      const App = props => {
        return <Hoc>
          <p>Hola</p>,
          <p>Mundo</p>,
          <p>En JSX</p>
        </Hoc>;
      }
    ```

  
  **NOTA**: Ninguna de las dos alternativas anteriores renderizará algun elemento HTML en el RealDOM.

  * Como punto final, desde la versión 16.2 de React, podemos usar un componente auxiliar para lidiar con este problema. El componente Fragment nos permite envolver elementos JSX Adyacentes sin tener que crear nuevos estilos o elementos HTML.

    ``` javascript
      import React, { Fragment } from 'react';

      const App = props => {
        return <Fragment>
          <p>Hola</p>,
          <p>Mundo</p>,
          <p>En JSX</p>
        </Fragment>;
      }
    ```
  ### High Order Components - Introducción

  Los High Order Components son componentes que envuelven otros componentes y les agregan nuevas caracteristicas, por ejemplo, nuevos elemenots JSX, nuevos estilos, nueva logica, etc. Podemos crear nuestros propios HOC's con la implementación que necesitemos sin requerir algun elemento extra, nada más la libreria core de React.

  Tomando como referencia la definición de React sobre los HOCS, tenemos que: *Un componente de orden superior (HOC por las siglas en inglés de higher-order component) es una técnica avanzada en React para el reuso de la lógica de componentes. Los HOCs no son parte de la API de React. Son un patrón que surge de la naturaleza composicional de React.*

  La [documentación](https://es.reactjs.org/docs/higher-order-components.html) de React nos entrega una guia estupenda acerca de que son, como funcionan y como crear nuestros propios HOC's.

  Veamos dos formas sencillas de como crear HOC's:

    * *Usando estructura de componentes funcionales*
    
      ``` javascript
        import React from 'react';

        const withClasses = (props) => {
          return <div className={props.classes}>{props.children}</div>
        };

        export default withClasses;

        const App = (props) => {
          return <WithClasses>
            /* ...JSX Code here */
          </WithClasses>
        }

        export default App;
      ```

    * *Usando JavaScript puro*

      ``` javascript
        import React from 'react';

        const withClasses = (WrappedComponent, className) => {
          return props => <div className={className}>
            <WrappedComponent 
              data={...HOCData}
              {...options}
            />
          </div>
        };

        export default withClasses;

        const App = (props) => {
          return <div>
            /* ...JSX Code here */
          </div>
        }

        export default withClasses(App, myClasses);
      ```
  
  Debemos saber cuando usar cada enfoque de HOC, por ejemplo, si necesitamos manipular algo de JSX y estilos, lo adecuado sería que usamos Wrapped HOC's, pero si el caso es distinto y necesitamos agregar algo más de logica, como conectarnos a un Storage, crear subcripciones a fuentes de datos, lo correcto sería usar los JavaScript-Based HOC's.

