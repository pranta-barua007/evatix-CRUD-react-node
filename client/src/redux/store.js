import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import  logger  from 'redux-logger';

import rootReducer from './root-reducer';

const middleWares = [thunk];

if(process.env.NODE_ENV !== 'production'){
    middleWares.push(logger);  
} 

const store = createStore(rootReducer, applyMiddleware(...middleWares));

export default store;