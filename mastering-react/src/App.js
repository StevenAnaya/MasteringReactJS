import React, { Component } from 'react';
import './App.css';

/* COMPONENTS */
import Person from './Person';

class App extends Component {
  state = {
    persons: [
      { name: "Steven", age: 22 },
      { name: "Alejandro", age: 34 },
      { name: "Carolina", age: 31 },
    ],
    otherInfo: 'This is other related information'
  };

  switchPersonHandler = (name) => {
    this.setState({
      persons: [
        { name: name, age: 23 },
        { name: 'Alejandro', age: 34 },
        { name: 'Carolina', age: 31 },
      ]
    });
  };

  changePersonHandler = event => {
    this.setState({
      persons: [
        { name: 'Steven', age: 23 },
        { name: event.target.value, age: 34 },
        { name: 'Carolina', age: 31 },
      ]
    });
  };

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    return (
      <div className="App"> 
        <button
          style={style}
          onClick={this.switchPersonHandler.bind(this, 'Ariel')}>Switch Me</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}>I love: Graphic Design!</Person>
        <Person
          click={this.switchPersonHandler.bind(this, 'Anaya')}
          change={this.changePersonHandler}
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}/>
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age}/>
      </div>
    );
  };
}

export default App;
