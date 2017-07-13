";use strict";
import React from 'react';
import { render } from 'react-dom';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import { applyMiddleware, createStore } from 'redux';

// IMPORT COMPONENTS
import Main from './main';
import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BookForm from './components/pages/booksForm';

// IMPORT ACTIONs
import { addToCart } from './actions/cartActions';
import { postBooks, deleteBook, updateBook } from './actions/booksActions';

// IMPORT COMBINED REDUCERS
import reducers from './reducers/index';

const middleware = applyMiddleware(logger);

// STEP 1 create the store
const store = createStore(reducers, middleware);

const Routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={BooksList}></IndexRoute>
        <Route path="/admin" component={BookForm}></Route>
        <Route path="/cart" component={Cart}></Route>
      </Route>
    </Router>    
  </Provider>
);

render(
  Routes,document.getElementById("app")
);
