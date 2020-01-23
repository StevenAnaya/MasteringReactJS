import React, { Fragment, useEffect } from 'react';

/* STYLES */
import { StyledButton } from './styles';

const Cockpit = (props) => {
    useEffect(() => {
    console.log('[Cockpit] first useEffect function');
    setTimeout(() => {
      alert('[Cockpit] timer')
    }, 1000);
    return () => {
    console.log('[Cockpit] second useEffect cleanup function');
    };
  }, []);

  useEffect(() => {
    console.log('[Cockpit] first 2nd useEffect function');
    return () => {
    console.log('[Cockpit] second 2nd useEffect cleanup function');
    };
  });


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
        alts={props.showPersons}>Show Persons</StyledButton>
    </Fragment>
  );
};

export default React.memo(Cockpit);