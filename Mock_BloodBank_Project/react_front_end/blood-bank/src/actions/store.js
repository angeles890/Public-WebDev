import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from '../reducers';//By default if no file name is passed, index.js is searched

export const store = createStore(
    //Reducers go here
    reducers, 
    compose(
        applyMiddleware(thunk)
    )
)