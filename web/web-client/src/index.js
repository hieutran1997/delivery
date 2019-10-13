import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';
import App from './containers/App';
import Login from './containers/Login';
import { createBrowserHistory } from "history";
import apiMiddleware from './redux/middlewares/apiMiddleware';
import { composeWithDevTools } from 'redux-devtools-extension';

const history = createBrowserHistory();

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
    <Router history={history}>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
