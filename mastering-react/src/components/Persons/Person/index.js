import React, { Component } from 'react';
import styled from 'styled-components';

/* STYLES */
const StyledDiv = styled.div`
  width: 60%;
  margin: 16px auto;
  border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
  padding: 16px;
  text-align: center;

  @media (min-width: 500px) {
    width: 450px;
  }
`;

class Person extends Component {
  render () {
    return (
      <StyledDiv>
        <p onClick={this.props.click}>I'm {this.props.name} and I'm {this.props.age} years old!</p>
        <p>{this.props.children}</p>
        <input type="text" onChange={this.props.change} value={this.props.name}/>
      </StyledDiv>
    );
  };
};

export default Person;