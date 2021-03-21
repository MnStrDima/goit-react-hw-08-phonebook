import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { TextField } from 'formik-material-ui';
import { Container, Button, Box } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import styles from './EditContactView.module.css';
import routesData from '../../routes';
import phonebookOperations from '../../redux/phoneBook/phoneBook-operations';
import Notification from '../../components/Notification/Notification';
import Title from '../../components/Title/Title';
import Modal from '../../components/Modal/Modal';
import Preloader from '../../components/Preloader/Preloader';
import {
  getAllContacts,
  getErrorMessage,
  getLoading,
} from '../../redux/phoneBook/phoneBook-selectors';
import { authSelectors } from '../../redux/auth';

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
    this.returnHandler();
  };

  returnHandler = async () => {
    const { location, history } = this.props;
    await history.push(location?.state?.from || routesData.pathes.contacts);
  };

  render() {
    const { contactObj: contactToUpdate } = this.props.location.state;
    const { isContactExists } = this.state;
    return (
      <>
        {this.props.isLoading ||
          (this.props.isAuthLoading && (
            <Modal>
              <Preloader />
            </Modal>
          ))}
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
              <Box className={styles.btnWrapper}>
                <Link to={routesData.pathes.contacts}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    style={{ marginRight: '10px' }}
                  >
                    Cancel
                  </Button>
                </Link>

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
      </>
    );
  }
}

const mapStateToProps = state => ({
  contacts: getAllContacts(state),
  errorMessage: getErrorMessage(state),
  isLoading: getLoading(state),
  isAuthLoading: authSelectors.getIsAuthLoading(state),
});

const mapDispatchToProps = {
  onUpdateBtnClick: phonebookOperations.updateContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUpdateView);
