import React, { Component } from 'react';
import './App.css';

/* COMPONENTS */
import Persons from '../components/Persons';
import Cockpit from '../components/Cockpit';

/* CONTEXT */
import AuthContext from '../context/auth-context';

class App extends Component {
  constructor(props) {
    super(props);
  };

  // Esta sintaxis es moderna y nos permite ahorranos el tener que inicializar el constructor y el estado
  state = {
    persons: [
      { id: 'awdaw12', name: "Steven", age: 22 },
      { id: 'adw12131', name: "Paco", age: 34 },
      { id: 'faw12', name: "Mario", age: 31 },
    ],
    otherInfo: 'This is other related information',
    showPersons: false,
    showCockpit: true,
    counter: 0,
    authenticated: false
  };

  static getDerivedStateFromProps = (props, state) => {
    console.log('[App.js] getDerivedStateFromProps')
    return state;
  };

  componentDidMount = () => {
    console.log('[App.js] ComponentDidMount')
  };

  deletePersonHandler = indexPerson => {
    let persons = [...this.state.persons];
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

    this.setState((prevState, props) => {
      return {
        persons,
        counter: prevState.counter + 1
      }
    });
  };

  loginHandler = () => {
    this.setState({ authenticated: true });
  }

  render() {
    console.log('[App.js] render')
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
          persons={this.state.persons}
          click={this.deletePersonHandler}
          change={this.changeNameHandler}
        />
    };

    return (
      <div className="App"> 
        <button onClick={() => { this.setState({ showCockpit: false }) }}>Off Cockpit</button>
        <AuthContext.Provider value={{ authenticated: this.state.authenticated, login: this.loginHandler }}>
          {
            this.state.showCockpit ? 
              <Cockpit
                title={this.props.title}
                showPersons={this.state.showPersons}
                persons={this.state.persons.length}
                clicked={this.switchVisibilityPersons}
              />
            : null
          }
          <div>
            {
              persons
            }
          </div>
        </AuthContext.Provider>
      </div>
    );
  };
}

export default App;
