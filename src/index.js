import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from './javascripts/components/App/App';
import okrReducer from './javascripts/reducers/okr-reducer';
import rootSaga from './javascripts/sagas/root-saga';
import ErrorBoundary from './javascripts/components/ErrorBoundary/ErrorBoundary';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middleWares = applyMiddleware(sagaMiddleware);

const store = createStore(okrReducer, composeEnhancers(middleWares));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <App/>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
);
