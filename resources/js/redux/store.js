import {createStore, applyMiddleware, compose} from 'redux';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

import { createLogger } from 'redux-logger';
// const loggerMiddleware = createLogger(); //USED AS A DEBUGGER REMOVE AFTER PRODUCTION

import rootReducer from './reducers';

export const store = createStore(
    rootReducer
    // ,composeEnhancers ( applyMiddleware( createLogger() ) )
);