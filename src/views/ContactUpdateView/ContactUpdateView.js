import { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { TextField } from 'formik-material-ui';
import { Container, Button, Box } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import styles from './ContactUpdateView.module.css';
import routes from '../../routes';
import phonebookOperations from '../../redux/phoneBook/phoneBook-operations';
import Notification from '../../components/Notification/Notification';
import Title from '../../components/Title/Title';
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

class ContactUpdateView extends Component {
  state = { isContactExists: false };

  handleSubmit = async contactObj => {
    if (this.props.contacts.some(({ name }) => name === contactObj.name)) {
      this.setState({ isContactExists: true });
      setTimeout(() => {
        this.setState({ isContactExists: false });
      }, 3000);

      return;
    }
    await this.props.onUpdateBtnClick(contactObj);

    this.setState({ isContactExists: false });
    this.onCancelBtnClick();
  };

  onCancelBtnClick = async () => {
    const { location, history } = this.props;
    await history.push(location?.state?.from || routes.contacts);
  };

  render() {
    const { contactObj: contactToUpdate } = this.props.location.state;
    const { isContactExists } = this.state;
    return (
      <Container maxWidth="md">
        <Title title="Edit choosen contact:" />
        <Notification
          notificationInit={isContactExists}
          message="This contact already exists in your phonebook."
        />
        <Notification
          notificationInit={Boolean(this.props.errorMessage)}
          message={this.props.errorMessage}
        />
        <Formik
          initialValues={{
            name: contactToUpdate.name,
            number: contactToUpdate.number,
          }}
          validationSchema={validationSchema}
          onSubmit={(
            { name, number, id = contactToUpdate.id },
            { resetForm, setSubmitting },
          ) => {
            this.handleSubmit({ id, name, number });
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

            {/* <label className={styles.nameLabel}>
              Name:
              <Field
                type="text"
                name="name"
                className={styles.contactFormInput}
              />
              <span className={styles.errorMessage}>
                <ErrorMessage name="name" />
              </span>
            </label>

            <label className={styles.numberLabel}>
              Number:
              <Field
                type="tel"
                name="number"
                className={styles.contactFormInput}
              />
              <span className={styles.errorMessage}>
                <ErrorMessage name="number" />
              </span>
            </label> */}
            <Box className={styles.btnWrapper}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                style={{ marginRight: '10px' }}
                onClick={this.onCancelBtnClick}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </Box>
          </Form>
        </Formik>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  contacts: getAllContacts(state),
  errorMessage: getErrorMessage(state),
});

const mapDispatchToProps = {
  onUpdateBtnClick: phonebookOperations.updateContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUpdateView);
