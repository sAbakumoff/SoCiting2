import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {actionCreators as langActionCreators} from './actions/languages';
import {actionCreators as questionsActionCreators} from './actions/questions';

const supportedLanguages = ['golang', 'ruby', 'cpp', 'java', 'js', 'php', 'cs', 'python', 'c', 'html', 'xml']

class Languages extends Component{
  render(){
    if(this.props.view !== 'questions')
      return false;
    var props = this.props;
    function handleInputChange(event) {
      event.preventDefault();
      var lang = event.target.getAttribute('data-lang');
      props.selectLanguage(lang);
    }
    return(
      <div>
      <h2>StackOverflow questions referenced in</h2>
      <div className="row">
        {
          supportedLanguages.map(lang=>{
            var isActive = lang === props.language,
                className = isActive ? "m-1 btn btn-outline-primary" : "m-1 btn btn-outline-secondary";
            return (
              <button type='button'
                className={className}
                key={lang}
                data-lang={lang} 
                onClick={handleInputChange}>
                  {lang}
                </button>
            );
          })
        }
      </div>
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
