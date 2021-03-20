import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './ContactList.module.css';
import contactListTransition from '../../transitionStyles/contactListTransition.module.css';
import ContactListItem from '../ContactListItem/ContactListItem';
import { getVisibleContacts } from '../../redux/phoneBook/phoneBook-selectors';

function ContactList({ contacts }) {
  return (
    <>
      <CSSTransition
        in={contacts.length > 0}
        appear={true}
        classNames={contactListTransition}
        timeout={500}
        unmountOnExit
      >
        <TransitionGroup component="ul" className={styles.contactsList}>
          {contacts.map((contact, idx) => (
            <CSSTransition
              key={contact.id}
              classNames={contactListTransition}
              timeout={250}
            >
              <ContactListItem idx={idx} contact={contact} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </CSSTransition>
    </>
  );
}

const mapStateToProps = state => ({ contacts: getVisibleContacts(state) });

export default connect(mapStateToProps, null)(ContactList);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
};
