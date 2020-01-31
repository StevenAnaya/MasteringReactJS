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