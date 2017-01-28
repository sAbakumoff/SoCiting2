import React, {Component} from 'react';
import {render} from 'react-dom';
import Questions from './questions.react';
import Languages from './languages.react';
import References from './references.react';
import { Provider } from 'react-redux';
import Store from './store';

let initialState = {
  view : 'questions'
}

class App extends Component{
  render(){
    return  (
      <Provider store={Store(initialState)}>
        <div className='container'>
          <Languages />
          <Questions />
          <References />
        </div>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('app-container'));
