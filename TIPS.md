# React TIPS

El objetivo de este escrito es recolectar la mayor cantidad de TIPS relacionados a buenas practicas, implementaciones como animaciones, integraciones con libreria de terceros, etc.

Aquí se describirá el TIP de forma breve y se explicará mayormente con ejemplos en codigo.

## Image imports

En React podemos importar imagenes dentro de nuestro proyecto, siempre y cuando Webpack o la herramientas de bundling que tengamos este configurado para reconocer que debe hacer cuando importamos un archivo de tal tipo. 

En el caso de CRA (Create React App), WebPack sabe que cuando agregas una imagen dentro de la carpeta `src` el debe exportarlo en el build que haga. Ahora, por otro lado la forma de importar y usar en codigo las imagenes es la siguiente:

``` javascript
  import React from 'react';

  // Relative Route of Image
  import logoImage from '../assets/images/logo.png';

  const Logo = props => {
    return (
      <div>
        <img src={logoImage} alt="MyLogo"/>
      </div>
    );
  };

  export default Logo;
```

* En resumidas cuentas, React no importa ni fusiona la imagen con nuestro codigo JavaScript, en lugar de eso, realiza un copia de la imagén y la almacena (en desarrollo, almenos) para que su acceso sea mas optimo. Ahora, cuando accedemos a dichas variable de importación, basicamente estamos obteniendo un String con la ruta relativa en donde se encuentra almecenada la imagén.

## Image Size

Cuando de imagenes se trata, podemos manejar sin ningun problema los tamaños directamente como propiedades o como estilos de nuestro archivo CSS. Esta implementación dependen totalmente de nosotros. 

``` javascript
  import React from 'react';
  import logoImage from '../assets/images/logo.png';

  const Logo = props => {
    return (
      <div>
        <img src={logoImage} alt="MyLogo" height={props.height} width={props.width}/>
      </div>
    );
  };

  export default Logo;
 ```

 o 

``` javascript
  import React from 'react';
  import logoImage from '../assets/images/logo.png';

  const Logo = props => {
    return (
      <div>
        <img src={logoImage} alt="MyLogo" />
      </div>
    );
  };

  export default Logo;
 ```

 ``` css
  img {
    width: 100px;
    height: 78px;
  }
 ```

## Error Handling

Es común que nos encontremos con el escenario de manejo de errores dentro de nuestras aplicaciones. En el caso de que necesitemos darle feedback a nuestro usuario de que algo salio mal, podemos crear un HOC que maneje esto por nosotros de forma sencilla, limpia y facil de implementar. 

``` javascript
  import React, { Component } from 'react';

  import Modal from '../../components/UI/Modal/Modal';
  import Aux from '../Aux/Aux';

  const withErrorHandler = ( WrappedComponent, axios ) => {
      return class extends Component {
          state = {
              error: null
          }

          componentWillMount () {
              axios.interceptors.request.use(req => {
                  this.setState({error: null});
                  return req;
              });
              axios.interceptors.response.use(res => res, error => {
                  this.setState({error: error});
              });
          }

          errorConfirmedHandler = () => {
              this.setState({error: null});
          }

          render () {
              return (
                  <Aux>
                      <Modal 
                          show={this.state.error}
                          modalClosed={this.errorConfirmedHandler}>
                          {this.state.error ? this.state.error.message : null}
                      </Modal>
                      <WrappedComponent {...this.props} />
                  </Aux>
              );
          }
      }
  }

  export default withErrorHandler;
```

* En este ejemplo, usamos axios con interceptors para agregarle funcionalidad extra a las peticiones que realizamos.

* Por otro lado, nuestro HOC recibe el componente que envuelve, el objeto de axios y devuelve **siempre** el componente envuelto junto al componente que usemos para mostrar el error. Es evidente, que tenemos que pasar las propiedades del componente y ademas hacer el errorHandling que necesitemos.

* Por otro lado, es correcto decir que si necesitamos eliminar estos interceptores que creamos, tenemos que usar los LifeCycle Hooks que estan disponibles para el desmontado de los componentes, como el `componenteWillUnmount` o la funcion que retornamos en el ReactHook `useEffect`.

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


## Children API

El API Children de React nos permite interactuar con todos aquellos elementos pasados como hijos directos dentro de un elementos JSX. La forma común de interactuar con esta API es usando simplemente la propiedad `props.children` donde estará contenido cualquier elemento(s), string u objeto que sea pasado al componente. Sin duda, existe una API que nos permite usar ciertos metodos utiles al momento de tratar con `children` en nuestro componentes React.

[React Children Documentation](https://reactjs.org/docs/react-api.html#reactchildren)

``` javascript
import React, { Component, Children } from 'react';

class ChildrenComponent extends Component {
  render = () => {
    return(
      <div>
      {
        Children.only(this.props.children)
      }
      </div>
    );
  };
};

export default ChildrenComponent;
```

* Este metodo se asegurá de unicamente recibir un solo elemento dentro de la propiedad Children. De recibir más de uno, arrojará error.

``` javascript
  import React, { Component, Children } from 'react';

  class ChildrenComponent extends Component {
    render = () => {
      const buttons = Children.map(this.props.children, child => (
        <button>
          <h1>Total Children: {Children.count(this.props.children)}</h1>
          {child}
        </button>
      ));

      return(
        <div>
        {
          buttons
        }
        </div>
      );
    };
  };

  export default ChildrenComponent;
```

* El metodo `Children.map()` nos permite, al igual que map en un array, iterar sobre cada uno de los elementos pasados como argumento, en este caso, la propiedad `props.children` para luego recibir una función que se ejecutará por cada uno de los elementos.

* El metodo `Children.count()` realiza un conteo de los hijos pasados dentro del componente, es decir, nos devuelve la cantidad exacta de hijos pasados a nuestro componente.


``` javascript
 class SlideShow extends Component {
  state = {
    total: 0,
    current: 0,
  }

  componentDidMount() {
    const { children } = this.props;
    this.setState({ total: Children.count(children) });
    this.interval = setInterval(this.showNext, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  showNext = () => {
    const { total, current } = this.state;
    this.setState({
      current: current + 1 === total? 0 : current + 1
    });
  };

  render() {
    const { children } = this.props;
    const bullets = Array(this.state.total).fill("○");
    bullets[this.state.current] = "●";
    return (
      <div className="slideshow">
        <div>{bullets}</div>
          {Children.toArray(children)[this.state.current]}
      </div>
    )
  }
}
```

* El metodo `Children.toArray()` nos permite crear un arreglo con los hijos que nos lleguen y en este caso, por ejemplo, mostrar unicamente el que se encuentre como actual dentro del estado.

## Copiar un Objeto completamente

Es común utilizar una caracteristica de ES8 como el Spread operator para copiar objetos sin solo copiar la referencia en memoria. Este enfoque es valido solamente hasta ciertos niveles de anidamiento de objetos. Cuando intentamos modificar objetos anidados en niveles muy internos, se va a ver afectado el objeto del cual hemos realiado la copia debido a dentro de dichos niveles no se haya una copia aislada sino una referencia al objeto original.

Para solucionar dicho incoveniente, podemos utilizar esta solución popular:

``` javascript
  const deepCloneObj = JSON.parse(JSON.stringify(obj));
```

* Este codigo nos asegura tener toda una copia independiente sin importar los niveles de anidamiento que tenga.

## Libreria para Formularios

[Formik](https://jaredpalmer.com/formik) es una libreria liviana, simple y eficiente para controlar los estados basicos de los formulario y no morir en el intento.

Por otro lado, existe un paquete realmente simple para controlar inputs que necesitan algun tipo de mascara para mostrar la información al usuario con un formato determinado. [react-input-mask](http://sanniassin.github.io/react-input-mask/demo)