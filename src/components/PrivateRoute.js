import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authSelectors } from '../redux/auth';

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  redirectTo,
  token,
  ...routeProps
}) => (
  <Route
    {...routeProps}
    render={props =>
      isAuthenticated || token ? (
        <Component {...props} />
      ) : (
        <Redirect to={redirectTo} />
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.getIsAuthenticated(state),
  token: authSelectors.getToken(state),
});

export default connect(mapStateToProps)(PrivateRoute);
