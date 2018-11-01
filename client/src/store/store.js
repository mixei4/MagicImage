import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducers, composeEnhacers(applyMiddleware(thunk)));