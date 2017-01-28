import { combineReducers } from 'redux';
import * as languages from './languages';
import * as questions from './questions';
import * as references from './references';
import * as views from './views';

export default combineReducers(Object.assign({}, languages, questions, references, views));
