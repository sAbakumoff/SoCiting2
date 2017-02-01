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
          <footer>
            <div className='container'>
            <a className='btn btn-info m-1' 
              role='button'
              href="https://medium.com/@sAbakumoff/catalog-of-references-to-stackoverflow-questions-found-in-github-sources-134415b97ecb#.gi80z6w32"
              target="blank">Blog post</a>
             <a className='btn btn-info m-1' 
              role='button'
              href="https://github.com/sAbakumoff/sociting2"
              target="blank">Github</a>             
            </div>  
          </footer>
        </div>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('app-container'));
