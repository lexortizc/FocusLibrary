import React from 'react';
import { Container } from 'react-bootstrap';
import useValidateSession from '../hooks/useValidateSession'
import LoginForm from '../containers/LoginForm';
import Requests from '../containers/Requests';

const Request = ({ roles }) => {
    const authorized = useValidateSession(roles);

    return(
        <Container>
            { (authorized) ? <Requests /> : <LoginForm /> }
        </Container>
    )
}

export default Request;