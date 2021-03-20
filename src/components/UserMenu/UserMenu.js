import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { authSelectors, authOperations } from '../../redux/auth';
import styles from './UserMenu.module.css';

const UserMenu = ({ email, onLogout }) => (
  <div className={styles.container}>
    <span className={styles.email}>Welcome, {email}</span>

    <Button
      type="submit"
      variant="contained"
      color="primary"
      size="medium"
      onClick={onLogout}
    >
      Logout
    </Button>
  </div>
);
const mapStateToProps = state => ({
  email: authSelectors.getEmail(state),
});

const mapDispatchToProps = {
  onLogout: authOperations.logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
