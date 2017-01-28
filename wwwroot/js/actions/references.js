import reduxCrud from 'redux-crud';
import 'whatwg-fetch';

export const actionTypes = Object.assign({}, reduxCrud.actionTypesFor('references'), {});

export const actionCreators = Object.assign({},  reduxCrud.actionCreatorsFor('references'), {
  fetch(question){
    return (dispatch, getState)=>{
      var fetchUrl = `api/references/${getState().language}/${question.id}`;
      var actionData = {
        questionId : question.id
      };
      dispatch(actionCreators.fetchStart(actionData));
      fetch(fetchUrl).then(response=>{
         return response.json();
       }).then(json=>{
        return dispatch(actionCreators.fetchSuccess(json, actionData));
      }, error=>{
        dispatch(actionCreators.fetchError(error));
      });
    }
  },
  fetchIfNeeded(questionId){
    return (dispatch, getState)=>{
      if(!getState().questionsByLanguage[questionId])
        return dispatch(actionCreators.fetch(questionId));
    }
  }
});
