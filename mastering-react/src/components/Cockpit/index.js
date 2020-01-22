import React, { Fragment, useEffect } from 'react';

/* STYLES */
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