import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

import { createStore, combineReducers } from 'redux'
import * as reducers from './reducers'

// import { applyMiddleware, compose } from 'redux'

// const logger = store => next => action => {
//   console.group(action.type)
//   console.info('dispatching', action)
//   let result = next(action)
//   console.log('next state', store.getState())
//   console.groupEnd(action.type)
//   return result
// }

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const Reducers = combineReducers({
  ...reducers,
});

const store = createStore(
  Reducers,
  composeEnhancers(),
  // composeEnhancers(applyMiddleware(logger))
)

ReactDOM.render(
  <BrowserRouter><App store={store}/></BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
