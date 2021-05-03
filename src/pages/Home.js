import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';

import { useHistory } from "react-router-dom";

const Home = () => {

    const history = useHistory();

    const [numQuestions, setNumQuestions] = useState(10);

    const handleNumQuestions = (e) => {
        setNumQuestions(e.target.value);
    }

    const handleStart = () => {
        history.push('/question', {
            numQuestions: numQuestions
        });
    }

    return (
        <div className="containerBox">
            <h2>Trivia!</h2>
            <Form className="p-3 text-center w-100">
                <Form.Group controlId="gameName">
                    <Form.Row>
                        <Form.Label column xs={6}>
                            # of Questions
                        </Form.Label>
                        <Col xs={6}>
                        <Form.Control as="select" defaultValue="10" onChange={handleNumQuestions}>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                        </Form.Control>
                        </Col>
                    </Form.Row>
                </Form.Group>

                <Button onClick={handleStart} variant={"action"}>Start game</Button>

            </Form>
        </div>
    )
}

export default Home;
