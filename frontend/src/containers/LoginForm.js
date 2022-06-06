import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AppContext from '../helpers/context';
import api from '../helpers/api'
import { Container } from 'react-bootstrap'
import decodeToken from '../helpers/auth'

const LoginForm = () => {
  const navigate = useNavigate();
  const { setSession } = useContext(AppContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required")
    }),
    onSubmit: async (formData) => {
      try {
        const response = await api.post('/users/login', formData);
        if(response.status !== 200) {
          throw new Error(response)
        }

        setSession(decodeToken(response.data.token))
        toast.success(response.data.message);
        navigate('/books');
      } catch (error) {
        toast.error('Bad credentials');
      }
    }
  });

  return(
    <Container className="w-50">
      <h1 className="text-center">Login</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          label="Email"
          type="text"
          name="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <Form.Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
        <Button type="submit" secondary fluid>Enter</Button>
      </Form>
    </Container>
)}

export default LoginForm;