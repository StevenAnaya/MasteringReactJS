import React, { Component } from 'react';

import Person from './Person';

class Persons extends Component {
  render () {
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

export default Persons;