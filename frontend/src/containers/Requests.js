import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Button, Card } from 'semantic-ui-react'
import toast from 'react-hot-toast';
import useApi from '../hooks/useApi'
import AppContext from '../helpers/context';
import formatDate from '../helpers/date';

const Requests = () => {
    const api = useApi();
    const [requests, setRequests] = useState([]);
    const { session } = useContext(AppContext);

    const getRequest = async () => {
        try {
            let response;
            if(session.role === 1) {
                response = await api.get(`/requests/${session.id}`);
            } else {
                response = await api.get('/requests');
            }
            if(response.status !== 200) {
                throw new Error(response)
            }
            setRequests(response.data);
        } catch (error) {
            toast.error("Sorry! Something went wrong");
        }
    }

    const returnBook = async (requestID) => {
        try {
            const response = await api.post(`/returns/${requestID}`);
            if(response.status !== 200) {
                throw new Error(response)
            }

            toast.success("Book returned!");
            getRequest();
        } catch (error) {
            toast.error("Sorry! Something went wrong");
        }
    }

    useEffect(() => {
        getRequest();
    }, [])

    return(
        (requests?.length === 0) ?
        <Container className="text-center">
            <h2>No results found</h2>
        </Container>
        :
        <Container>
            <h1 className="text-center">Request list</h1>
            <Card.Group itemsPerRow={3}>
            { requests?.map((request) => (
                <Card key={request?.id} className="mb-4">
                    <Card.Content>
                        <Card.Header className="mb-3">{request?.title}</Card.Header>
                        <Card.Meta>{request?.first_name} {request?.last_name} ({formatDate(request?.request_date)})</Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <Button fluid color='black' hidden={(session?.role !== 2)} onClick={() => {
                            returnBook(request?.id);
                        }}>Return book</Button>
                    </Card.Content>
                </Card>
            ))}
            </Card.Group>
        </Container>
    )
}

export default Requests;