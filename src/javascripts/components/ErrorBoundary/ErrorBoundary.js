import React from 'react';
import './ErrorBoundary.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    //can be used to log the error into our audit tables or integration systems like graylog or airbrake
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='error-boundary'>
          <h1>500</h1>
          <p>Oops! Something is wrong.</p>
          <p>Please try again after some time.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
