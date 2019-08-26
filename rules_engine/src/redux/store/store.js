import {
  createStore, applyMiddleware,
} from 'redux';

import promiseMiddleware from "redux-promise";
import logger from 'redux-logger';
import thunk from 'redux-thunk';

//import utilsReducer from '../reducers/utilsReucers';
import reducers from './../reducers/reducers'

/*
const middlewares = [thunk];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const middleware = applyMiddleware(...middlewares);
const enhancers = [middleware];

// const reducers = combineReducers({ utilsReducer });

if (process.env.NODE_ENV === 'development') {
  enhancers.push(window.devToolsExtension ? window.devToolsExtension() : f => f);
}
*/

const middleware = applyMiddleware(promiseMiddleware);


// const store = createStore(reducers,compose(...enhancers));

const store = createStore(reducers,middleware);

export default store;
