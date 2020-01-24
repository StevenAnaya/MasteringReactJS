import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Person from './Person';

class Persons extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    console.log('[Persons.js] shouldComponentUpdate');
    if (nextProps.persons !== this.props.persons) {
      return true;
    } else {
      return false;
    };
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[Persons.js] componentDidUpdate');
  };

  render () {
    console.log('[Persons.js] render...');
    return this.props.persons.map((person, index) => {
      return <Person
        name={person.name}
        age={person.age}
        click={this.props.click.bind(this, index)}
        change={event => this.props.change(event, person.id)}
        key={person.id}
      />
    });
  }
};

Persons.propTypes = {
  persons: PropTypes.array,
  click: PropTypes.func,
  change: PropTypes.func
};

export default Persons;