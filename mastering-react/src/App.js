import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';

/* COMPONENTS */
import Person from './Person';

/* STYLES */
const StyledButton = styled.button`
  background-color: ${props => props.alts ? 'red' : 'green'};
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.alts ? 'salmon' : 'lightgreen'};
    color: black;
  }
`;

class App extends Component {
  state = {
    persons: [
      { id: 'awdaw12', name: "Steven", age: 22 },
      { id: 'adw12131', name: "Alejandro", age: 34 },
      { id: 'faw12', name: "Carolina", age: 31 },
    ],
    otherInfo: 'This is other related information',
    showPersons: false
  };

  deletePersonHandler = indexPerson => {
    const persons = this.state.persons;
    persons.splice(indexPerson, 1);
    this.setState({ persons });
  };

  switchVisibilityPersons = () => {
    const doesPerson = this.state.showPersons;
    this.setState({ showPersons: !doesPerson });
  };

  changeNameHandler = (event, index) => {
    const personIndex = this.state.persons.findIndex(p =>
        p.id === index
      );
    
    const person = {
      ...this.state.persons[personIndex]
    };
    
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons });
  };


  render() {
    const classes = [];

    if (this.state.persons.length <= 2) {
      classes.push('red');
    };

    if (this.state.persons.length <= 1) {
      classes.push('bold');
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {
            this.state.persons.map((person, index) => {
              return <Person 
                  name={person.name}
                  age={person.age}
                  click={this.deletePersonHandler.bind(this, index)}
                  change={event => this.changeNameHandler(event, person.id)}
                  key={person.id}
                />
            })
          }
        </div>
      );
    };

    return (
      <div className="App"> 
        <h1>React Application</h1>
        <p className={classes.join(' ')}>I display persons information</p>
        <StyledButton
          onClick={this.switchVisibilityPersons}
          alts={this.state.showPersons}>Show Persons</StyledButton>
          <div>
            {
              persons
            }
          </div>
      </div>
    );
  };
}

export default App;
