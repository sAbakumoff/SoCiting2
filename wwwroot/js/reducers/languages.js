import {actionTypes} from '../actions/languages';

export function language(state=null, action){
  if(action.type === actionTypes.selectLanguage)
    return action.data;
  return state;
}
