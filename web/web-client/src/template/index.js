import React, { Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { ProgressSpinner } from 'primereact/progressspinner';
import WrappedNormalLoginForm from '../containers/Login';
import AdminLayout from '../containers/AdminLayout';
import ViewProduct from '../containers/ViewProduct';

export default function Template() {
    const history = createBrowserHistory();

    const redirectPath = () => {
        if(history.location.pathname === '/'){
            history.push("/admin/home");
        }
    }

    return (
        <div style={{ height: '100%' }}>
            <Router history={history}>
                <Suspense fallback={<ProgressSpinner style={{ position: 'fixed', top: '50%', left: '50%' }} />}>
                    <Switch>
                        {/* {_.map(publicRoutes, (route, key) => {
                            const { component, path } = route;
                            return (
                                <Route
                                    exact
                                    path={path}
                                    key={key}
                                    render={(route) => <App component={component} route={route} />}
                                />
                            )
                        })} */}
                        
                        <Route path="/view" render={props => <ViewProduct {...props} />} />
                        <Route path="/admin" render={props => <AdminLayout {...props} />} />
                        <Route path='/login' component={WrappedNormalLoginForm} />
                        <Route path="/">
                            {redirectPath}
                        </Route>
                        {/* <Route component={ NotFound } /> */}
                    </Switch>
                </Suspense>
            </Router>
        </div>
    );
}