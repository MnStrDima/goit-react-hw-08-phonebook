import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { changeFilter } from '../../redux/phoneBook/phoneBook-actions';
import styles from './Filter.module.css';
import filterTransitionStyles from '../../transitionStyles/filterTransition.module.css';
import {
  getFilter,
  getContactsLength,
} from '../../redux/phoneBook/phoneBook-selectors';

function Filter({ initialValue, contactsLength, onFilterChange }) {
  return (
    <CSSTransition
      in={contactsLength > 1}
      classNames={filterTransitionStyles}
      timeout={250}
      unmountOnExit
    >
      <div className={styles.inputWrapper}>
        <label className={styles.filterLabel}>
          Find contacts by name:
          <input
            className={styles.filterInput}
            type="text"
            name="name"
            value={initialValue}
            onChange={e => onFilterChange(e.target.value)}
          />
        </label>
      </div>
    </CSSTransition>
  );
}

const mapStateToProps = state => ({
  initialValue: getFilter(state),
  contactsLength: getContactsLength(state),
});

const mapDispatchToProps = {
  onFilterChange: changeFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

Filter.defaultProps = {
  initialValue: '',
};
Filter.propTypes = PropTypes.shape({
  initialValue: PropTypes.string,
  contactsLength: PropTypes.number.isRequired,
  onFilterChange: PropTypes.func.isRequired,
}).isRequired;
