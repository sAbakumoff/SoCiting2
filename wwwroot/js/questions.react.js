import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {actionCreators as questionsActionCreators} from './actions/questions';
import {actionCreators as refActionCreators} from './actions/references';
import {actionCreators as viewActionCreators} from './actions/views';

const QuestionRow = ({id, title, count, onClick})=>{
  function handleOnClick(ev){
    ev.preventDefault();
    onClick({id, title});
  }
  return (
    <tr>
      <td><a href='#' onClick={handleOnClick}>{title}</a></td>
      <td>{count}</td>
    </tr>
  );
}

class Questions extends Component{
  render(){
    if(this.props.view !== 'questions')
      return false;
    var questions = this.props.questions;
    if(questions && questions.items && questions.items.length){
      return(
        <table className='table table-sm table-hover'>
        <tbody>
          {questions.items.map(
            question=><QuestionRow key={question.id} {...question} onClick={this.props.selectQuestion} />
          )}
        </tbody>
        </table>
      )
    }
    else{
      return false;
    }
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    selectQuestion : function(question){
      dispatch(questionsActionCreators.selectQuestion(question));
      dispatch(viewActionCreators.switchView('references'));
      dispatch(refActionCreators.fetchIfNeeded(question));
    }
  }
}

const mapStateToProps = (state)=>{
  return{
    questions : state.questionsByLanguage[state.language],
    view : state.view
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
