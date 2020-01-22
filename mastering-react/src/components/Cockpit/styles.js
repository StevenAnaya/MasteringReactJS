import styled from 'styled-components';

export const StyledButton = styled.button`
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