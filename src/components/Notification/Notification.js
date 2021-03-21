import PropTypes from 'prop-types';
import { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import notificationTransitionStyles from '../../transitionStyles/notificationTransition.module.css';
import styles from './Notification.module.css';
class Notification extends Component {
  state = { isVisible: false };

  componentDidUpdate(prevProps) {
    if (
      this.props?.notificationInit !== prevProps.notificationInit &&
      this.props?.notificationInit
    ) {
      this.setState({ isVisible: true });
      setTimeout(() => this.setState({ isVisible: false }), 3000);
      return;
    }
  }

  async componentWillUnmount() {
    await this.setState({ isVisible: false });
  }

  render() {
    return (
      <CSSTransition
        in={this.state.isVisible}
        timeout={250}
        classNames={notificationTransitionStyles}
        unmountOnExit
      >
        <div className={styles.wrapper}>
          <p className={styles.message}>{this.props.message}</p>
        </div>
      </CSSTransition>
    );
  }
}

export default Notification;

Notification.propTypes = PropTypes.shape({
  message: PropTypes.string.isRequired,
  isContactExists: PropTypes.bool.isRequired,
}).isRequired;
