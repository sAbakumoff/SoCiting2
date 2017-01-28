import reduxCrud from 'redux-crud';
import {actionTypes} from '../actions/questions';
const baseReducers =  reduxCrud.reducersFor('questions');

function questions(state={ isFetching: false, items : [] }, action){
  switch(action.type){
    case actionTypes.fetchStart :
      return Object.assign({}, state, {
        isFetching : true
      })
    case actionTypes.fetchSuccess :
      return Object.assign({}, state, {
        isFetching: false,
        items : baseReducers(state.items, action)
      })
    case actionTypes.fetchError :
      return Object.assign({}, state, {
        isFetching : false
      })
    default :
        return state;
  }
}

export function questionsByLanguage(state={}, action){
  switch(action.type){
    case actionTypes.fetchStart:
    case actionTypes.fetchSuccess:
      var lang = action.data.lang;
      return Object.assign({}, state, {
        [lang] : questions(state[lang], action)
      })
    default:
      return state;
  }
}

export function question(state=null, action){
  if(action.type === actionTypes.selectQuestion)
    return action.data;
  return state;
}
