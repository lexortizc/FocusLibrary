import React from 'react';
import { Container } from 'react-bootstrap';
import useValidateSession from '../hooks/useValidateSession'
import LoginForm from '../containers/LoginForm';
import Books from '../containers/Books';

const Home = ({ roles }) => {
  const authorized = useValidateSession(roles);

  return(
    <Container>
      { (authorized) ? <Books /> : <LoginForm /> }
    </Container>
  )
}

export default Home;