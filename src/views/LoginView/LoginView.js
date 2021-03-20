import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { CSSTransition } from 'react-transition-group';
import { TextField } from 'formik-material-ui';
import { Container, Button } from '@material-ui/core';
import Notification from '../../components/Notification/Notification';
import Title from '../../components/Title/Title';
import { authOperations } from '../../redux/auth';
import styles from './LoginView.module.css';
import { authSelectors } from '../../redux/auth';
import loginAndRegisterViewTransitionStyles from '../../transitionStyles/loginAndRegisterViewTransitionStyles.module.css';

const validationSchema = yup.object({
  email: yup.string().email().required('Please enter email'),
  password: yup.string().required('Please enter password'),
});

const LogInView = ({ handleLogInClick, errorMessage }) => (
  <CSSTransition
    in={true}
    appear
    classNames={loginAndRegisterViewTransitionStyles}
    timeout={300}
    unmountOnExit
  >
    <Container maxWidth="md">
      <Notification
        notificationInit={Boolean(errorMessage)}
        message={errorMessage}
      />
      <Title title="Login form:" />
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={({ email, password }, { resetForm, setSubmitting }) => {
          handleLogInClick({ email, password });
          setSubmitting(false);
          resetForm();
        }}
      >
        <Form className={styles.contactForm}>
          <Field
            component={TextField}
            type="email"
            name="email"
            label="Email:"
            variant="outlined"
            margin="dense"
          />

          <Field
            component={TextField}
            type="text"
            name="password"
            label="Password:"
            variant="outlined"
            margin="dense"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="medium"
          >
            Log In
          </Button>
        </Form>
      </Formik>
    </Container>
  </CSSTransition>
);

const mapStateToProps = state => ({
  errorMessage: authSelectors.getErrorMessage(state),
});

const mapDispatchToProps = {
  handleLogInClick: authOperations.logIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInView);
