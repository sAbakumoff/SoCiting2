export const actionTypes = {
  selectLanguage : 'SELECT_LANG'
}

export const actionCreators = {
  selectLanguage : (language)=>{
    return {
      type : actionTypes.selectLanguage,
      data : language
    }
  }
}
