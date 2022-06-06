import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Form, Button, Select, Card, Label, Modal, Image, Header, Icon, Message } from 'semantic-ui-react'
import toast from 'react-hot-toast';
import { useFormik } from 'formik'
import useApi from '../hooks/useApi'
import AppContext from '../helpers/context';
import { filtersList } from '../constants'

const Books = () => {
    const api = useApi();
    const [open, setOpen] = React.useState(false);
    const [book, setBook] = React.useState({});
    const [books, setBooks] = useState([]);
    const [filters, setFilters] = useState({ filter: "title", word: "" });
    const { session } = useContext(AppContext);

    const formik = useFormik({
        initialValues: { ...filters },
        onSubmit: (formData) => {
            setFilters(formData);
        }
    });

    const getBooks = async (filters) => {
        try {
            const response = await api.get('/books', { params: filters });
            if(response.status !== 200) {
                throw new Error(response)
            }
            setBooks(response.data);
        } catch (error) {
            toast.error("Sorry! Something went wrong");
        }
    }

    const requestBook = async (bookID) => {
        try {
            const response = await api.post(`/requests/${bookID}`, { userID: session.id });
            if(response.status !== 201) {
                throw new Error(response)
            }

            toast.success("Book requested!");
            getBooks(filters);
        } catch (error) {
            toast.error("Sorry! Something went wrong");
        }
    }

    useEffect(() => {
        getBooks(filters);
    }, [filters])

    return(
        (books?.length === 0) ?
        <Container className="text-center">
            <h2>No results found</h2>
        </Container>
        :
        <Container>
            <Modal closeIcon dimmer="blurring" onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}>
                <Modal.Header>Book details</Modal.Header>
                <Modal.Content image>
                    <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
                    <Modal.Description>
                        <Header>{book?.title}</Header>
                        <p><span className='text-muted'>Author: </span>{book?.author}</p>
                        <p><span className='text-muted'>Published year: </span>{book?.published_year}</p>
                        <p><span className='text-muted'>Genre: </span>{book?.genre}</p>
                        <p><span className='text-muted'>Number of copies: </span>{book?.copies}</p>
                        <Label color={(book?.stock > 0) ? 'green' : 'red'}>
                            <Icon name='book'  /> {book?.stock}
                            <Label.Detail>copies availables</Label.Detail>
                        </Label>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                    content="Request book"
                    labelPosition='right'
                    icon='checkmark'
                    disabled={(book?.stock < 1 || session?.role !== 1)}
                    onClick={() => {
                        requestBook(book.id);
                        setOpen(false)
                    }}
                    positive
                    />
                </Modal.Actions>
            </Modal>
            <Form className="d-flex flex-row-reverse" onSubmit={formik.handleSubmit}>
                <Form.Group widths='equal' inline>
                    <Form.Input
                        search
                        control={Select}
                        options={filtersList}
                        placeholder="Filter by"
                        onChange={(e, { searchQuery, value }) => {
                            formik.setFieldValue("filter", value);
                        }}
                    />
                    <Form.Input
                        type="text"
                        name="word"
                        placeholder={(formik.values.filter === "published_year")? "Enter a year" : "Enter a word"}
                        value={formik.values.word}
                        onChange={formik.handleChange}
                        error={formik.errors.word}
                    />
                    <Button type="submit" secondary fluid>Search</Button>
                </Form.Group>
            </Form>

            <h1 className="text-center">Book list</h1>
            <Card.Group itemsPerRow={3}>
            { books?.map((book) => (
                <Card key={book?.id} className="mb-4">
                    <Card.Content>
                        <Card.Header className="mb-3">{book?.title} ({book?.published_year})</Card.Header>
                        <Card.Meta><Label basic >{book?.author}</Label> | <Label basic >{book?.genre}</Label></Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <Button fluid color='black' onClick={() => {
                            setBook(book);
                            setOpen(true);
                        }}>Show details</Button>
                    </Card.Content>
                </Card>
            ))}
            </Card.Group>
        </Container>
    )
}

export default Books;