import React, { Suspense, lazy, Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Preloader from './components/Preloader/Preloader';
import Modal from './components/Modal/Modal';
import { authOperations, authSelectors } from './redux/auth/';
import routesData from './routes';
import AppBar from './components/AppBar/AppBar';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
class App extends Component {
  componentDidMount() {
    this.props.onGetCurrentUser();
  }
  render() {
    return (
      <>
        <AppBar />
        <Suspense
          fallback={
            <Modal>
              <Preloader />
            </Modal>
          }
        >
          <Switch>
            {routesData.routes.map(route =>
              route.private ? (
                <PrivateRoute key={route.name} {...route} />
              ) : (
                <PublicRoute key={route.name} {...route} />
              ),
            )}
            <Redirect to={routesData.pathes.homePage} />
          </Switch>
        </Suspense>
      </>
    );
  }
}

const mapDispatchToProps = {
  onGetCurrentUser: authOperations.getCurrentUser,
  token: authSelectors.getToken,
};

export default connect(null, mapDispatchToProps)(App);
