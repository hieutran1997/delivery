import React from 'react';
import { connect } from 'react-redux';
import publicRoutes from '../template/routers/publicRouters';
import { Route, Switch } from 'react-router-dom';
import _ from 'lodash';
function AdminLayout(props) {

    console.log('test dom', props);

    return (
        <>
            <Switch>
                {_.map(publicRoutes, (route, key) => {
                    console.log('path', route.component);
                    return (
                        <Route
                            exact 
                            path={route.path}
                            component={route.component}
                            key={key}
                        />
                    )
                })}
            </Switch>
        </>
    );
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(AdminLayout)