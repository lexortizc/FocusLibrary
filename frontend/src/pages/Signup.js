import React from 'react';
import { Container } from 'react-bootstrap';
import useValidateSession from '../hooks/useValidateSession'
import LoginForm from '../containers/LoginForm';
import SignupForm from '../containers/SignupForm';

const Signup = ({ roles }) => {
    const authorized = useValidateSession(roles);

    return(
        <Container>
            { (authorized) ? <SignupForm /> : <LoginForm /> }
        </Container>
    )
}

export default Signup;