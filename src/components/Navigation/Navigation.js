import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import routesData from '../../routes';
import { authSelectors } from '../../redux/auth';

import styles from './Navigation.module.css';

const Navigation = ({ isAuthenticated }) => {
  return (
    <>
      <nav className={styles.siteNav}>
        <NavLink
          exact
          to={routesData.pathes.homePage}
          className={styles.navLink}
          activeClassName={styles.activeNavLink}
        >
          Home
        </NavLink>
        {isAuthenticated && (
          <NavLink
            exact
            to={routesData.pathes.contacts}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
          >
            Contacts
          </NavLink>
        )}
      </nav>
    </>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.getIsAuthenticated(state),
});

export default connect(mapStateToProps, null)(Navigation);
