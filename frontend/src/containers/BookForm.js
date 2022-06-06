import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Select } from 'semantic-ui-react'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Container } from 'react-bootstrap'
import useApi from '../hooks/useApi'
import { genresList } from '../constants'


const BookForm = () => {
  const navigate = useNavigate();
  const api = useApi();

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      published_year: "",
      genre: "",
      copies: "",
      stock: ""
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      author: Yup.string().required("Author is required"),
      published_year: Yup.number("Only numbers").min(0, "Invalid year").max(new Date().getFullYear(), "Invalid year").required("Published year is required"),
      genre: Yup.string().required("Genre is required"),
      copies: Yup.number("Only numbers").min(0, "Invalid number").required("Copies is required")
    }),
    onSubmit: async (formData, { resetForm }) => {
      const book = {
        ...formData,
        stock: formData.copies
      }

      try {
        const response = await api.post('/books', book);
        if(response.status !== 201) {
          throw new Error(response)
        }

        resetForm();
        toast.success("Book added!");
        navigate('/books');
      } catch (error) {
        toast.error("Sorry! Something went wrong");
      }
    }
  });

  return(
    <Container className="w-50">
      <h1 className="text-center">Add book</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          label="Title"
          type="text"
          name="title"
          placeholder="Enter a title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.errors.title}
        />
        <Form.Input
          label="Author"
          type="text"
          name="author"
          placeholder="Enter an author"
          value={formik.values.author}
          onChange={formik.handleChange}
          error={formik.errors.author}
        />
        <Form.Input
          search
          control={Select}
          options={genresList}
          label="Genre"
          placeholder="Select a genre"
          onChange={(e, { searchQuery, value }) => {
            formik.setFieldValue("genre", value);
          }}
          error={formik.errors.genre}
        />
        <Form.Input
          label="Published year"
          type="text"
          name="published_year"
          placeholder="Enter a year"
          value={formik.values.published_year}
          onChange={formik.handleChange}
          error={formik.errors.published_year}
        />
        <Form.Input
          label="Number of copies"
          type="text"
          name="copies"
          placeholder="Enter a number of copies"
          value={formik.values.copies}
          onChange={formik.handleChange}
          error={formik.errors.copies}
        />
        <Button type="submit" secondary fluid>Create book</Button>
      </Form>
    </Container>
)}

export default BookForm;