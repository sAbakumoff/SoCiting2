import reduxCrud from 'redux-crud';
import 'whatwg-fetch';

export const actionTypes = Object.assign({}, reduxCrud.actionTypesFor('questions'), {
  selectQuestion : 'SELECT_QUESTION'
});

export const actionCreators = Object.assign({},  reduxCrud.actionCreatorsFor('questions'), {
  selectQuestion(question){
    return {
      type : actionTypes.selectQuestion,
      data : question
    }
  },
  fetch(lang, offset, limit){
    var fetchUrl = `api/questions/${lang}`;
    return (dispatch)=>{
      var actionData = {
        lang : lang
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
  fetchIfNeeded(lang){
    return (dispatch, getState)=>{
      if(!getState().questionsByLanguage[lang])
        return dispatch(actionCreators.fetch(lang, 0, 10));
    }
  }
});
