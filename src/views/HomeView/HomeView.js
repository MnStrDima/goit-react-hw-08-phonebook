import { connect } from 'react-redux';
import styles from './HomeView.module.css';
import { authSelectors } from '../../redux/auth';

const HomeView = ({ userName }) => (
  <div className={styles.container}>
    <h1 className={styles.title}>
      Welcome to homepage, {userName ? userName : 'Guest'}
      <span role="img" aria-label="Иконка приветствия">
        😃
      </span>
    </h1>
  </div>
);

const mapStateToProps = state => ({
  userName: authSelectors.getUserName(state),
});

export default connect(mapStateToProps, null)(HomeView);
