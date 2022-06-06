import React from 'react'
import { Form, Button, Select } from 'semantic-ui-react'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Container } from 'react-bootstrap'
import useApi from '../hooks/useApi'
import { rolesList } from '../constants'


const SignupForm = () => {
  const api = useApi();

  const formik = useFormik({
    initialValues: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        repeatPassword: "",
        role_id: ""
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required").oneOf([Yup.ref("repeatPassword")], "Passwords must match"),
      repeatPassword: Yup.string().required("Password is required").oneOf([Yup.ref("password")], "Passwords must match"),
      role_id: Yup.string().required("Role is required"),
    }),
    onSubmit: async (formData, { resetForm }) => {
      try {
        const response = await api.post('/users/signup', formData);
        if(response.status !== 201) {
          throw new Error(response)
        }

        resetForm();
        toast.success("User added!");
      } catch (error) {
        toast.error("Sorry! Something went wrong");
      }
    }
  });

  return(
    <Container className="w-50">
      <h1 className="text-center">Add user</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          label="First name"
          type="text"
          name="first_name"
          placeholder="Enter first name"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          error={formik.errors.first_name}
        />
        <Form.Input
          label="Last name"
          type="text"
          name="last_name"
          placeholder="Enter last name"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          error={formik.errors.last_name}
        />
        <Form.Input
          label="Email"
          type="text"
          name="email"
          placeholder="Enter email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <Form.Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
        <Form.Input
          label="Confirm password"
          type="password"
          name="repeatPassword"
          placeholder="Reenter password"
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          error={formik.errors.repeatPassword}
        />
        <Form.Input
          search
          control={Select}
          options={rolesList}
          label="Role"
          placeholder="Select a role"
          onChange={(e, { searchQuery, value }) => {
            formik.setFieldValue("role_id", value);
          }}
          error={formik.errors.role_id}
        />
        <Button type="submit" secondary fluid>Create user</Button>
      </Form>
    </Container>
)}

export default SignupForm;