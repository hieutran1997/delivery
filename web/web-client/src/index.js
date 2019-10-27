import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';
import apiMiddleware from './redux/middlewares/apiMiddleware';
import { composeWithDevTools } from 'redux-devtools-extension';

import Template from './template';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(apiMiddleware, ...middleware))
)

const routing = (
  <Provider store={store}>
      <Template />
  </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));

