import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {actionCreators as langActionCreators} from './actions/languages';
import {actionCreators as questionsActionCreators} from './actions/questions';

const supportedLanguages = ['golang', 'ruby']

class Languages extends Component{
  render(){
    if(this.props.view !== 'questions')
      return false;
    var props = this.props;
    function handleInputChange(event) {
      var lang = event.target.getAttribute('id');
      props.selectLanguage(lang);
    }
    return(
      <div className="btn-group" data-toggle="buttons">
        {
          supportedLanguages.map(lang=>{
            var id=lang,
                isActive = lang === props.language,
                className = isActive ? "btn btn-primary active" : "btn btn-primary";
            return (
              <label className={className} key={lang}>
                <input type="radio" name="languages" id={id}  checked={isActive} onChange={handleInputChange} />
                {lang}
              </label>
            )
          })
        }
      </div>
    )
  }
  componentDidMount(){
    this.props.selectLanguage(supportedLanguages[0]);
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    selectLanguage : function(language){
      dispatch(langActionCreators.selectLanguage(language));
      dispatch(questionsActionCreators.fetchIfNeeded(language));
    }
  }
}

const mapStateToProps = (state)=>{
  return{
    language : state.language,
    view : state.view
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Languages);
