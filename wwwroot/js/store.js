
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './reducers';
const logger = createLogger();
export default (initialState)=>createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
