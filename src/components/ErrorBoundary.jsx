import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('[GlamTrack] Uncaught error:', error, info?.componentStack ?? '');
  }

  handleBack = () => {
    this.setState({ error: null });
    window.history.back();
  };

  handleReload = () => {
    this.setState({ error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.error) {
      return (
        <div className="app-shell">
          <div className="error-boundary">
            <span className="error-boundary__icon">✨</span>
            <h2 className="error-boundary__title">Something went wrong</h2>
            <p className="error-boundary__message">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <div className="error-boundary__actions">
              <button className="btn btn-outline" onClick={this.handleBack}>
                Go Back
              </button>
              <button className="btn btn-primary" onClick={this.handleReload}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
