import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import styles from './AuthMenu.module.css';

const AuthMenu = () => (
  <>
    <nav className={styles.authNav}>
      <NavLink
        exact
        to={routes.registerPage}
        className={styles.navLink}
        activeClassName={styles.activeNavLink}
      >
        Register
      </NavLink>
      <NavLink
        exact
        to={routes.loginPage}
        className={styles.navLink}
        activeClassName={styles.activeNavLink}
      >
        Log In
      </NavLink>
    </nav>
  </>
);

export default AuthMenu;
