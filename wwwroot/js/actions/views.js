export const actionTypes = {
  switchView : 'SWITCH_VIEW'
}

export const actionCreators = {
  switchView : (view)=>{
    return {
      type : actionTypes.switchView,
      data : view
    }
  }
}
