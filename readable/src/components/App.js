import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import reducers from '../reducers'

import Home from './Home';
import PostDetail from './PostDetail';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/posts/:id" component={PostDetail} />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
