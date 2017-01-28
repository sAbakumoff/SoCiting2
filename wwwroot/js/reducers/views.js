import {actionTypes} from '../actions/views';

export function view(state=null, action){
  if(action.type === actionTypes.switchView)
    return action.data;
  return state;
}
