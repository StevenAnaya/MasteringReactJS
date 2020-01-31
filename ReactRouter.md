# React Router

El objetivo de esta pequeña documentación es esclarecer las dudas y evidenciar buenas practicas al momento de implementar Routing en una SPA hecha con React y ReactRouter.

## Paquetes

React Router provee dos paquetes escenciales para configurar un proyecto de Routing: `react-router` contiene toda la logica relacionada al Routing y `react-router-dom` el cual nos permite renderizar componentes relacionados al Routing en el DOM.

* Es valido aclarar que estos paquetes no son creados por Facebook, son librerias creadas por terceros y mantenidos por la comunidad.

## Instalación

Para instalar los paquetes se debe ejecutar el siguiente comando de npm

```
  npm install --save react-router react-router-dom
```

* Tecnicamente, para desarrollo web no es necesario instalar el paquete `react-router` debido a que `react-router-dom` lo trae como dependencia en si mismo. Depende de cada quien si se quiere instalar el paquete o no.

## Agregando Router

Para agregar un Router en nuestra aplicación React, debemos importar un Componente de la libreria `react-router-dom` y envolver toda o las partes en las cuales queremos tener Routing dentro de nuestra aplicación.

[Aquí](https://reacttraining.com/react-router/web/api/BrowserRouter) podemos investigar más acerca de este componente.

``` javascript
  import React from 'react';
  import { BrowserRouter } from 'react-router-dom';

  const App = props => {
    return (
      <BrowserRouter>
        <MyContent />
      </BrowserRouter>
    );
  };

  export default App;
```

*  Este Componente nos permitirá utilizar todas las propiedas y metodos que nos entrega ReactRouter en los componentes que se encuentren más abajo en el arbol de jerarquia.

## Renderizando una Ruta

Para renderizar una ruta, aunque el siguiente componente no renderizada nada realmente por si solo, debemos importar el Componente `Route` de `react-router-dom`:


``` javascript
  import React from 'react';
  import { Route } from 'react-router-dom';
  import MyRouteComponent from './components';

  const Blog = props => {
    return (
      <div>
        <OutRoutingContent />
        <Route path="/" render={() => <p>Hola mundo</p>}/>
        <Route path="/" exact render={() => <MyRouteComponent />}/>
      </div>
    );
  };

  export default App;
```

[Aquí](https://reacttraining.com/react-router/web/api/Route) podemos consultar más sobre este componente.

* Este componente recibe como propiedad `path` la ruta sobre la cual se rendererizará el componente indicado en la propiedad `render` o en otros cosas tambien en la propiedad `component`.

* Cuando una ruta es marcada con el flag `exact` quiere decir que sí la ruta completa de navegación es exactamente igual a la indicada se renderizará el componente. De otra forma, si no le pasamos dicho flag el se renderizará cada vez que encuentre una ruta con dicho caracter "/".

* React Router nos permite renderizar más de una ruta al mismo tiempo como se puede ver en el caso de arriba.

## Utilizando Links

El Componente `Link` provisto por `react-router-dom` nos permite crear una etiqueta de enlace que redireccionara hacia la ruta indicada. Tambien, el componente evita que se realicen recargas del navegador, en pocas palabras nos permite evitar el comportamiento por defecto de las etiquetas `<a>` de HTML.

[Aquí](https://reacttraining.com/react-router/web/api/Link) podemos investigar sobre este componente.

``` javascript
  import React from 'react';
  import { Link } from 'react-router-dom';

  const Blog = props => {
    return (
      <div>
        <Link
          to="/"
        >Home</Link>
        <Link
          to={{
            pathname: '/blog',
            hash: '#section',
            query: '?with-author=true'
          }}
        >Home</Link>
      </div>
    );
  };

  export default App;
```

* El componente nos recibe como propiedad principal `to` que puede ser un simple String con la ruta o un objeto JavaScript con algunas configuraciones un poco más avanzadas.

## Propiedades de Router

Cada componente `Router` nos entrega como props en los componentes que renderiza, lo siguiente:

  * **location**: Contiene la información relacionada a la ubicación actual, donde podemos encontrar la ruta actual, los parametros de busqueda, hash, etc.
  * **history**: Contiene información relacionada a la API History de HTML que nos permite obtener y manipular el Stack de navegación entre otras cosas.
  * **match**: Contiene toda la información relacionada a la ruta emparejada. Podemos ver si tiene la propiedad `exact`, `pathname`, `params`, etc.

## Pasando propiedades Routing a componentes en niveles bajos

Las propiedades de navegación son compartidas directamente con los hijos que son rederizados por algun componente `Router`, es decir, aquellos que se encuentran en nivel más profundo del arbol de jerarquia, no tendrán acceso a dichas propiedades. Por lo tanto, React Router nos permiter usar un HOC llamado `withRouter` que nos permite obtener todas las propiedades de Routing relacionadas a la ruta más cercana que ha sido renderizada.

[Aquí](https://reacttraining.com/react-router/web/api/withRouter) podremos saber más acerca de este HOC

``` javascript
  import React from 'react';
  import { withRouter } from 'react-router-dom';

  const DownComponent = props => {
    console.log(props); // match, location, history, ...props

    return (
      <div>
        <OtherComponent
          currentLocation={props.location.pathname}
        />
      </div>
    );
  };

  export default withRouter(DownComponent);
```

## Rutas absoluta o Rutas relativas

Las rutas absolutas siempre se renderizan sobre el mismo dominio agregando la nueva ruta especificada:

  ```
    example.com + /post = example.com/post

    then navigate:

    /new-post = example.com/new-post 
  ```

  * Las rutas creadas como absolutas no encadenan las rutas que estan después del /, las reemplazan borrando la anterior.

Las rutas relativas sí tienen en cuenta la ruta después de / y agrega la nueva despues de ella.

```
  example.com/post + /new-post = example.com/post/new-post
```

En React la implementación sería así:

``` javascript
  //Relative
  <Link
    to={{
      pathname: this.props.match.url + '/new-post'
    }}
  />

  //Absolute
  <Link 
    to={{
      pathname: '/new-post'
    }}
  />
```

## NavLink

El component `NavLink` es una alternativa a `Link` pero adicionalmente, nos permite agregar estilos cuando la ruta a emparejar esta activa.

[Aquí](https://reacttraining.com/react-router/web/api/NavLink) podemos ver más acerca de este componente

``` xml
  <NavLink
    to="/"
    activeClassName="active"
    activeStyle={{
      color: "red"
    }}
  >HOME</NavLink>
```

## Recibir parametros URL

Para recibir parametros en nuestra URL de navegación, simplemente debemos agregar una ruta con la siguiente estructura:

``` javascript
  <Route to="/new-post" render={() => <p></p>}/>
  <Route to="/:id" render={() => <p></p>}/>
```

* Dicha ruta recibe como propiedad el id que se esta suministrando.

* Importante, recordar poner en ultimos lugar las rutas con contenido dinamico debido a que puede hacer match primero y causar resultados innesperados.

Ahora para utilizar dicho parametro en nuestros componentes, la podemos encontrar en la propiedad `this.props.match.params.id`.

## Parsing Query Parameters & the Fragment

You learned how to extract route parameters (=> :id  etc). 

But how do you extract search (also referred to as "query") parameters (=> ?something=somevalue  at the end of the URL)? How do you extract the fragment (=> #something  at the end of the URL)?
Query Params:

You can pass them easily like this:

``` xml
  <Link to="/my-path?start=5">Go to Start</Link>
``` 

or
``` xml
    <Link 
        to={‌{
            pathname: '/my-path',
            search: '?start=5'
        }}
        >Go to Start</Link>
```

React router makes it easy to get access to the search string: props.location.search .

But that will only give you something like ?start=5 

You probably want to get the key-value pair, without the ?  and the = . Here's a snippet which allows you to easily extract that information:

``` javascript
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            console.log(param); // yields ['start', '5']
        }
    }
```

URLSearchParams  is a built-in object, shipping with vanilla JavaScript. It returns an object, which exposes the entries()  method. entries()  returns an Iterator - basically a construct which can be used in a for...of...  loop (as shown above).

When looping through query.entries() , you get arrays where the first element is the key name (e.g. start ) and the second element is the assigned value (e.g. 5 ).
Fragment:

You can pass it easily like this:

``` xml
<Link to="/my-path#start-position">Go to Start</Link> 
```

or

``` xml
    <Link 
        to={‌{
            pathname: '/my-path',
            hash: 'start-position'
        }}
        >Go to Start</Link>
```

React router makes it easy to extract the fragment. You can simply access props.location.hash .

## Rendering one route

Existen escenarios en los cuales queremos que solamente se renderice una sola ruta que se ajuste al emparejamiento. ¿Como hacemos eso? Con el Componente `Switch` podemos renderizar la primer ruta que cumpla con las condiciones de emparejamiento, por lo tanto, el orden en el que definimos nuestras rutas importa.

[Aquí](https://reacttraining.com/react-router/web/api/Switch) podemos ver más sobre este componente.

``` xml
  <Switch>
    <Route to="/" exact/>
    <Route to="/detail" exact/>
    <Route to="/:id" exact/>
  </Switch>
```

## Navegando Programaticamente

Un alternativa a la navegación con Componentes como `Link` o `NavLink` es usar codigo para movernos o redireccionar páginas nuevas. Para hacerlo, tenemos que usar la propiedad `this.props.history` la cual nos provee toda la API de navegación del navegador, por lo tanto, podemos acceder a todo el Stack de navegación, metodo de modificación del Stack, como `push()` o `pop()` para agregar y eliminar páginas respectivamente. 

[History ReactRouter Documentation](https://reacttraining.com/react-router/web/api/history) Aquí podemos verificar más acerca de este objeto.

``` javascript
  componentDidMount() => {
    //Push a new page with given id
    this.props.history.push('/'+ this.state.id, ...state);
    //Length of Browser stack navigation
    console.log(this.props.history.length);
  };
```

 ## Anidamientos de Rutas

 Podemos crear rutas anidadas dentro de otras rutas. Es demasiado simple, tan solo con usar el componente `Route` dentro del componente renderizado y listo. La unica consideración a tener en cuenta es que el path que estamos pasando no sea absoluto si pensamos encadenar la ruta anterior. Para esto debemos usar las rutas relativas para no generar conflicto.

 ``` xml
  <Switch>
    <Route path="/" component={Home}>
    <Route path="/post" component={Post}>
  </Switch>
 ```

 Post.js

``` javascript
  const Post = props => {
    <div>
      <Content />
      <Route path={{ this.props.match.url + props.id}} component={DetailMatch}>
    </div>
  };
```

## Redireccionando Peticiones

Las redirecciones con React Router se pueden lograr usando el componente `Redirect` donde, principalmente, indicamos desde cual ruta `from` y hacia cual `to` vamos a generar el redireccionamiento.

[Documentación de Redirect](https://reacttraining.com/react-router/web/api/Redirect) Aquí podemos ver la documentación completa de Redirect. 

```xml
  <Switch>
    <Route path="/" component={Home}>
    <Route path="/post" component={Post}>
    <Redirect from="/" to="/post"/>
  </Switch>
```

* Las redirecciones navegaran a una nueva ruta, sobreescribiendo la ruta actual con la ruta de redireccion en el Stack de navegación del navegador.

Otra forma de realizar redirecciones es usar código mediante el objeto `history` usando los metodos para la navegación.

``` javascript
  componentDidMount () => {
    fetch('/')
      .then(data => {
        //Push a new page on Stack History
        this.props.history.push('/new');
        //Overwrite the current page and paste the new one
        this.props.history.replace('/new');
      })
      .catch(err => {});
  };
```

## Renderizando 404 y Guard

Los estados 404 dentro de nuestras aplicaciones son realmente utiles y necesarios. Con React Router podemos manipular estos de una forma sencilla y rapida:

``` xml
  <Switch>
    <Route path="/" component={Home}>
    <Route path="/post" component={Post}>
    <Route component={NotFound}/>
  </Switch>
```

* Una anotación importante es que los 404 y los `Redirect` que redirigen desde '/' no puede ser usados juntos debido a siempre se va a renderizar uno solo, dependiendo del orde de su declaración.

Ahora, tocando otro terreno comunmente usado, necesitamos agregar autenticación a nuestras rutas, es decir, queremos restringir cierto contenido dependiendo si nuestro usuario ha iniciado sesión dentro de nuestra aplicación. Para este escenario, React Router no nos provee una solución estandar, pero lo podemos arreglar y ajustar según la lógica de autenticación que necesitemos, debido a tanto React como ReactRouter, son extremadamente flexibles.

un ejemplo dummy podría ser el siguiente, pero reitero, esta totalmente ligado a la lógica que necesitemos, por ejemplo, podriamos usar HOC, validaciones con DidMount, etc.

``` javascript
  componentDidMount () => {
    if (!this.user.auth) this.props.history.push('/login');

    //Rest code here... 
  };
```

## Cargando Rutas Lazy

Esta práctica es conocida generalmente como [Code Splitting](https://es.reactjs.org/docs/code-splitting.html) o React Lazy, debido a que usamos una implementación que le indica a nuestra herramienta de bundling, por ejemplo Webpack, que cargué nuestro código, componentes, etc, dinamicamente cuando este sea requerido y no que lo haga instantaneamente en un solo bundle.

Por ejemplo, en nuestro caso de Routing queremos que solamente se cargue la Ruta que vamos a utilizar y no todas las rutas asi no sean usadas. Para esto, podemos crear un HOC de la siguiente forma:

``` javascript
  import React, { Component } from 'react';

  const asyncComponent = (importComponent) => {
    return class extends Componnet {
      state = {
        component: null
      };
      
      componentDidMount () {
        importComponent()
          .then(cmp => {
            this.setState({ component: cmp.default });
          });
      };

      render () {
        const C = this.state.component;

        return C ? <C {...this.props}/> : null;
      };
    };
  };

  export default asyncComponent;
```

Import file

``` javascript
import React from 'react';
//import LazyComp from '../components/LazyComp';
import asyncComponent from './hoc/asyncComponent';

const AsyncLazyComp = asyncComponent(() => {
  return import('../components/LazyComp');
});

const App = () => {
  return (
    <Switch>
      <Route path="/" component={Home}>
      <Route path="/lazy" component={AsyncLazyComp}>
      <Route component={NotFound}/>
    </Switch>
  );
};

export default App;
```

* Nuestro HOC recibe un función que luego vamos a ejecutar para obtener el componente que se quiere importar y luego retornarlo. 

* dicha sintaxis de importación se llama **Importación Dinamica** y es una nueva funcionalidad de JavaScript pero necesita babel para funcionar. 

* Esta importación lo que hace es evitar que todo nuestro código sea montado en el objeto global y en lugar de eso lo que hace es generar pequeño archivos separados que serán llamados o requeridos cuando sea necesario.

## React.lazy()

Desde la versión `v16.6.0` de React, se crearón formas de realizar importaciones dinamicas de nuestro codigo, no solo en Routing, tambien en cualquier tipo de componente. Para cargar nuestro código asincronamente tenemos que usar el metodo `React.lazy()` y el componente `<Suspense />` que nos brinda la libreria core de React. Veamos en código como es dicha implementación.

``` javascript
  import React, { lazy, Suspense } from 'react';
  import { Switch } from 'react-router-dom';
  import SyncComp from '../components/SyncComp';

  const Home = lazy(() => import('../components/Home'));

  const App = props => {
    return (
      <Switch>
        <Suspense fallback={<div>Loading...</div>}>
          <Route path="/" component={SyncComp}/>
          <Route path="/home" component={Home}/>
        <Suspense>
      </Switch>
    );
  };

  export default App;
```
* Actualmente `React.lazy` soporta unicamente `default exports` y no `named exports`.

* En resumen, usamos `lazy()` para importar dinamicamente, `<Suspense>` para decirle que codigo debe esperar y que poner mientras el componente se está cargando.

Esta práctica nos trae un montón de beneficios en cuanto a rendimiento a medida de que nuestros pequeños modulos van creciendo y se van haciendo más complejos.