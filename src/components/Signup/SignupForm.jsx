import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
          'Password must contain at least one number and one special character'
        )
        .required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, setStatus, resetForm }) => {
      setSubmitting(true);

      try {
        const response = await axios.post('http://localhost:5000/signup', values, { withCredentials: true });
        console.log(response)
        setStatus({ success: true });
        localStorage.setItem('isAuthenticated', 'true'); // Store authentication status in local storage
        resetForm(); // Clear form fields
        navigate('/');
      } catch (error) {
        console.error(error);
        setStatus({ error: error.message || 'Error logging in' });
      } finally {
        setSubmitting(false);
      }
    },
  });


  return (
    <form onSubmit={formik.handleSubmit} className="form">
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        type="text"
        {...formik.getFieldProps('firstName')}
        className="sign-input"
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <div className="error">{formik.errors.firstName}</div>
      ) : null}

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        type="text"
        {...formik.getFieldProps('lastName')}
        className="sign-input"
      />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div className="error">{formik.errors.lastName}</div>
      ) : null}

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        type="email"
        {...formik.getFieldProps('email')}
        className="sign-input"
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="error">{formik.errors.email}</div>
      ) : null}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        {...formik.getFieldProps('password')}
        className="sign-input"
      />
      {formik.touched.password && formik.errors.password ? (
        <div className="error">{formik.errors.password}</div>
      ) : null}

      <button type="submit" disabled={formik.isSubmitting}>
        Submit
      </button>
    </form>
  );
};

export default SignupForm;
