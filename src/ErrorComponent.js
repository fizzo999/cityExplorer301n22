import React, { Component } from 'react';

export class ErrorComponent extends Component {
  render() {
    return (
      <>
        {this.props.hasError ? (
          <>
            <h2 className='red'> error status code: {this.props.status}</h2>
            <h2 className='red'> error message: {this.props.errorMessage}</h2>
          </>
        ) : (
          ''
        )}
      </>
    );
  }
}

export default ErrorComponent;
