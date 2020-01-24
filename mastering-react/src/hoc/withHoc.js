import React from 'react';

const withHoc = (WrappedComponent, newProp) => {
  //HOC logic here...
  return props => <div newProp={newProp}>
    <WrappedComponent {...props}/>
  </div>
};

export default withHoc;