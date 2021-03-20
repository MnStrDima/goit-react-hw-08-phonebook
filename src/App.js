import React, { Suspense, lazy, Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Preloader from './components/Preloader/Preloader';
import Modal from './components/Modal/Modal';
import { authOperations, authSelectors } from './redux/auth/';
import routes from './routes';
import AppBar from './components/AppBar/AppBar';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

const HomeView = lazy(() =>
  import('./views/HomeView/HomeView.js' /* webpackChunkName: "home-view"*/),
);
const ContactsView = lazy(() =>
  import(
    './views/ContactsView/ContactsView.js' /* webpackChunkName: "contacts-view"*/
  ),
);
const RegisterView = lazy(() =>
  import(
    './views/RegisterView/RegisterView.js' /* webpackChunkName: "register-view"*/
  ),
);
const LogInView = lazy(() =>
  import('./views/LoginView/LoginView.js' /* webpackChunkName: "logIn-view"*/),
);
const ContactUpdateView = lazy(() =>
  import(
    './views/ContactUpdateView/ContactUpdateView.js' /* webpackChunkName: "contact-update-view"*/
  ),
);

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
            <PublicRoute path={routes.homePage} exact component={HomeView} />

            <PrivateRoute
              exact
              path={routes.contacts}
              component={ContactsView}
              redirectTo={routes.loginPage}
            />

            <PrivateRoute
              path={routes.contactUpdate}
              component={ContactUpdateView}
              redirectTo={routes.contacts}
            />
            <PublicRoute
              path={routes.registerPage}
              component={RegisterView}
              restricted
              redirectTo={routes.contacts}
            />
            <PublicRoute
              path={routes.loginPage}
              component={LogInView}
              restricted
              redirectTo={routes.contacts}
            />
            <Redirect to={routes.homePage} />
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
