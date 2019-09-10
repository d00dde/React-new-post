import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/app';
import ErrorBoundry from './components/error-boundry';
import NewPostService from './services/new-post-service';
import TestNewPostService from './services/test-new-post-service';
import { NewPostServiceProvider } from './components/new-post-service-context';
import store from './store';

const newPostService = new NewPostService ();

ReactDOM.render (
    <Provider store={store}>
      <ErrorBoundry>
        <NewPostServiceProvider value={newPostService}>
          <Router>
            <App />
          </Router>
        </NewPostServiceProvider>
      </ErrorBoundry>
    </Provider>
    , document.getElementById('root'));