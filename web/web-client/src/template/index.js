import React, { Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import _ from 'lodash';
import { createBrowserHistory } from "history";
import publicRoutes from '../template/routers/publicRouters';
import authRouters from '../template/routers/authRouters';
import { ProgressSpinner } from 'primereact/progressspinner';
import { AuthLayout } from '../containers/Login';
import App from '../containers/App';

export default function Template() {
    const history = createBrowserHistory();
    return (
        <div style={{ height: '100%' }}>
            <Router history={history}>
                <Suspense fallback={<ProgressSpinner style={{ position: 'fixed', top: '50%', left: '50%' }} />}>
                    <Switch>
                        {_.map(publicRoutes, (route, key) => {
                            const { component, path } = route;
                            return (
                                <Route
                                    exact
                                    path={path}
                                    key={key}
                                    render={(route) => <App component={component} route={route} />}
                                />
                            )
                        })}
                        {/* <Route path="/" render={props => <App {...props} />} /> */}
                        {_.map(authRouters, (route, key) => {
                            const { component, path } = route;
                            return (
                                <Route
                                    exact
                                    path={path}
                                    key={key}
                                    render={(route) => <AuthLayout component={component} route={route} />}
                                />
                            )
                        })}

                        {/* <Route component={ NotFound } /> */}
                    </Switch>
                </Suspense>
            </Router>
        </div>
    );
}