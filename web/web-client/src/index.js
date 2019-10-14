import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';
import DashboardLayoutRoute from './containers/App';
import Login from './containers/Login';
import { createBrowserHistory } from "history";
import apiMiddleware from './redux/middlewares/apiMiddleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import User from './modules/User';

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
        <DashboardLayoutRoute path="/" component={User} />
        <DashboardLayoutRoute path="/users" component={User} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));

