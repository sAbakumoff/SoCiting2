import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {actionCreators} from './actions/views';

const References = function({id, title, refs, view, goBack}){
  if(view !== 'references')
    return false;
  if(refs && refs.items && refs.items.length){
    function handleOnClick(ev){
      ev.preventDefault();
      goBack();
    }
    return (
      <div>
      <a href='#' onClick={handleOnClick}>Back</a>
      <h1>{title}</h1>
      <a href={`http://stackoverflow.com/q/${id}`} target='_blank'>source</a>
      <table className="table table-sm">
      <tbody>
        {refs.items.map(function(item){
            var link = `https://github.com/${item.repo}/blob/${item.branch}/${item.path}#L${item.lineNumber}`;
            var text = `${item.repo}/${item.path}`;
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
    view : state.view
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
