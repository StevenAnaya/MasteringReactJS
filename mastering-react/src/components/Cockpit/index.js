import React, { Fragment, useContext,useEffect, useRef } from 'react';

/* STYLES */
import { StyledButton } from './styles';

/* CONTEXT */
import AuthContext from '../../context/auth-context';

const Cockpit = (props) => {
    const buttonRef = useRef(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
    console.log('[Cockpit] first useEffect function');

    setTimeout(() => {
      alert('[Cockpit] timer')
    }, 1000);
    
    buttonRef.current.click(); //Clickea el button cuando el componente se ha montado
    return () => {
      console.log('[Cockpit] second useEffect cleanup function');
    };
  }, []);

  const classes = [];

  if (props.persons <= 2) {
    classes.push('red');
  };

  if (props.persons <= 1) {
    classes.push('bold');
  };

  return (
    <Fragment>
      <h1>{props.title}</h1>
      <p className={classes.join(' ')}>I display persons information</p>
      <StyledButton
        onClick={props.clicked}
        ref={buttonRef}
        alts={props.showPersons}>Show Persons</StyledButton>
      <button onClick={authContext.login}>Log In</button>
    </Fragment>
  );
};

export default React.memo(Cockpit);