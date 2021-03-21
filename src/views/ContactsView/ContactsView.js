import { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import Title from '../../components/Title/Title';
import ContactForm from '../../components/ContactForm/ContactForm';
import Filter from '../../components/Filter/Filter';
import ContactList from '../../components/ContactList/ContactList';
import Modal from '../../components/Modal/Modal';
import Preloader from '../../components/Preloader/Preloader';
import styles from '../../transitionStyles/app.module.css';
import phonebookOperations from '../../redux/phoneBook/phoneBook-operations';
import {
  getAllContacts,
  getLoading,
} from '../../redux/phoneBook/phoneBook-selectors';
import { authSelectors } from '../../redux/auth';

class ContactsView extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    return (
      <>
        {this.props.isLoading ||
          (this.props.isAuthLoading && (
            <Modal>
              <Preloader />
            </Modal>
          ))}
        <Container maxWidth="md">
          <Title title="Phonebook:" />

          <ContactForm />

          {this.props.contacts.length > 0 && (
            <h2 className={styles.title}>Contacts:</h2>
          )}

          <Filter />

          <ContactList />
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  contacts: getAllContacts(state),
  isLoading: getLoading(state),
  isAuthLoading: authSelectors.getIsAuthLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(phonebookOperations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsView);
