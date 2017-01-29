import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {actionCreators} from './actions/views';

const References = function({language, id, title, refs, view, goBack}){
  if(view !== 'references')
    return false;
  if(refs && refs.items && refs.items.length){
    function handleOnClick(ev){
      ev.preventDefault();
      goBack();
    }
    return (
      <div>
      <a href='#' className='btn btn-outline-success m-1' role='button' onClick={handleOnClick}>&lt;&lt; Back to {language}</a>
      <a href={`http://stackoverflow.com/q/${id}`} target='_blank' role='button' className='m-1 btn btn-outline-info'>Full question &gt;&gt;</a>
      <h2>{title}</h2>
      <table className="table table-sm table-responsive table-hover">
      <tbody>
        {refs.items.map(function(item){
            var link = `https://github.com/${item.repo}/blob/${item.branch}/${item.path}#L${item.lineNumber}`;
            var text = `${item.repo}/${item.path}`;
            if(item.path.lastIndexOf('/')>=0){
              let trail = item.path.substring(item.path.lastIndexOf('/'));
              text = `${item.repo}/...${trail}`;
            }
            return (
              <tr key={item.id}>
                <td><a href={link} target='_blank'>{text}</a></td>
              </tr>
            );
          }
        )}
      </tbody>
      </table>
      </div>
    );
  }
  else{
    return null;
  }
}

const mapStateToProps = (state)=>{
  return {
    title : state.question && state.question.title,
    id : state.question && state.question.id,
    refs : state.referencesByQuestion[state.question && state.question.id],
    view : state.view,
    language : state.language
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    goBack : function(){
      dispatch(actionCreators.switchView('questions'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(References);
