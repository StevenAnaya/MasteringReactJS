import React from 'react';

const FunctionalHoc = props => {
  return <div newProp={props.newProp}>{props.children}</div>
};

export default FunctionalHoc;