import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import AppContext from '../helpers/context';

const NavBar = () => {
    const { session, setSession } = useContext(AppContext);
    return (
        <Navbar bg="dark" variant="dark" className='mb-4'>
            <Toaster position="top-right" reverseOrder={false} />
            <Container>
                <Navbar.Brand as={Link} to="/books">Focus Library</Navbar.Brand>
                <Nav className="me-auto">
                    {(session?.role === 1) ?
                        <>
                            <Nav.Link as={Link} to="/books">Books</Nav.Link>
                            <Nav.Link as={Link} to="/requests">Requests</Nav.Link>
                        </>
                        : null
                    }
                    {(session?.role === 2) ?
                        <>
                            <Nav.Link as={Link} to="/books">Books</Nav.Link>
                            <Nav.Link as={Link} to="/requests">Requests</Nav.Link>
                            <Nav.Link as={Link} to="/addBook">Create book</Nav.Link>
                            <Nav.Link as={Link} to="/signup">Create user</Nav.Link>
                        </>
                        : null
                    }
                </Nav>
                {(session?.token) ? <Button variant="outline-light" onClick={() => {
                    setSession({});
                    toast.success("Bye Bye!");
                }}>Logout</Button> : null }
            </Container>
        </Navbar>
    )
}

export default NavBar;