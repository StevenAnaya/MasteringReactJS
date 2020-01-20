import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    showErr: false,
    message: ''
  };

  componentDidCatch = (err, message) => {
    this.setState({ showErr: true, message });
  };
  
  render () {
    if (showErr) {
      return (
        <h1>{this.state.message}</h1>
      );
    }

    return this.props.children;
  };
};

export default ErrorBoundary;