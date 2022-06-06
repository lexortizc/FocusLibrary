import React from 'react';
import { Container } from 'react-bootstrap';
import useValidateSession from '../hooks/useValidateSession'
import LoginForm from '../containers/LoginForm';
import BookForm from '../containers/BookForm';

const Book = ({ roles }) => {
    const authorized = useValidateSession(roles);

    return(
        <Container>
            { (authorized) ? <BookForm /> : <LoginForm /> }
        </Container>
    )
}

export default Book;