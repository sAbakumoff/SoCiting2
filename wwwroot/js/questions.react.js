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
      <td className='text-right'>{count}</td>
    </tr>
  );
}

class Questions extends Component{
  render(){
    if(!this.props.visible)
      return false;
    function onLoadClick(ev){
      ev.preventDefault();
      this.props.loadMore(this.props.language, this.props.questions.items.length);
    }
    var questions = this.props.questions;
    if(questions && questions.items && questions.items.length){
      return(
        <table className='table table-sm table-hover table-responsive'>
        <thead>
          <tr>
            <th>Question</th>
            <th>#Refs</th>
          </tr>
        </thead>
        <tbody>
          {questions.items.map(
            question=><QuestionRow key={question.id} {...question} onClick={this.props.selectQuestion} />
          )}
          <tr key='load_more_'>
            <td colSpan="2">
              <button type='button' onClick={onLoadClick.bind(this)} className='btn btn-block btn-outline-primary'>Load More...</button>
            </td>
          </tr>
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
    },
    loadMore : function(language, offset){
      dispatch(questionsActionCreators.fetch(language, offset, 10));
    }
  }
}

const mapStateToProps = (state)=>{
  return{
    language : state.language,
    questions : state.questionsByLanguage[state.language],
    visible : state.view === 'questions'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
