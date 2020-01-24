import React, { Component } from 'react';
import styled from 'styled-components';

/* CONTEXT */
import AuthContext from '../../../context/auth-context';

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
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  };

  static contextType = AuthContext;

  componentDidMount() {
    this.inputRef.current.focus();
    console.log(this.inputRef.current, "REFERENCIA")
    console.log(this.context.authenticated);
  };

  render () {
    return (
      <StyledDiv>
        {
          this.context.authenticated ? <p>Authenticated</p> : <p>Please Log in</p>
        }
        <p onClick={this.props.click}>I'm {this.props.name} and I'm {this.props.age} years old!</p>
        <p>{this.props.children}</p>
        <input ref={this.inputRef} type="text" onChange={this.props.change} value={this.props.name}/>
      </StyledDiv>
    );
  };
};

export default Person;