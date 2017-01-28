import reduxCrud from 'redux-crud';
import {actionTypes} from '../actions/references';
const baseReducers =  reduxCrud.reducersFor('references');

function references(state={ isFetching: false, items : [] }, action){
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

export function referencesByQuestion(state={}, action){
  switch(action.type){
    case actionTypes.fetchStart:
    case actionTypes.fetchSuccess:
      var questionId = action.data.questionId;
      return Object.assign({}, state, {
        [questionId] : references(state[questionId], action)
      })
    default:
      return state;
  }
}
