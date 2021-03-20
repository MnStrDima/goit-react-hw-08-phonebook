import { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';
import * as yup from 'yup';
import phonebookOperations from '../../redux/phoneBook/phoneBook-operations';
import styles from './ContactForm.module.css';
import Notification from '../Notification/Notification';
import {
  getAllContacts,
  getErrorMessage,
} from '../../redux/phoneBook/phoneBook-selectors';

const validationSchema = yup.object({
  name: yup.string().required("Enter contact's name"),
  number: yup
    .string()
    .length(10, 'Example: 0930939393')
    .required("Enter contact's phone"),
});

class ContactForm extends Component {
  state = { isContactExists: false };

  handleSubmit = contactObj => {
    if (this.props.contacts.some(({ name }) => name === contactObj.name)) {
      this.setState({ isContactExists: true });
      setTimeout(() => {
        this.setState({ isContactExists: false });
      }, 3000);

      return;
    }
    this.props.addContact(contactObj);

    return this.setState({ isContactExists: false });
  };

  render() {
    const { isContactExists } = this.state;
    return (
      <>
        <Notification
          notificationInit={isContactExists}
          message="This contact already exists in your phonebook."
        />
        <Notification
          notificationInit={Boolean(this.props.errorMessage)}
          message={this.props.errorMessage}
        />
        <Formik
          initialValues={{ name: '', number: '' }}
          validationSchema={validationSchema}
          onSubmit={({ name, number }, { resetForm, setSubmitting }) => {
            this.handleSubmit({ name, number });
            setSubmitting(false);
            resetForm();
          }}
        >
          <Form className={styles.contactForm}>
            <Field
              component={TextField}
              type="text"
              name="name"
              label="Name:"
              variant="outlined"
              margin="dense"
            />

            <Field
              component={TextField}
              type="tel"
              name="number"
              label="Number:"
              variant="outlined"
              margin="dense"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="medium"
            >
              Add new contact
            </Button>
          </Form>
        </Formik>
      </>
    );
  }
}

const mapStateToProps = state => ({
  contacts: getAllContacts(state),
  errorMessage: getErrorMessage(state),
});

const mapDispatchToProps = dispatch => ({
  addContact: contactObj =>
    dispatch(phonebookOperations.addContact(contactObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
