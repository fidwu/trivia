import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';

import { useHistory, useLocation } from "react-router-dom";

const Results = () => {

    const history = useHistory();
    const location = useLocation();

    const [numQuestions, setNumQuestions] = useState(0);
    const [numCorrect, setNumCorrect] = useState(0);


    useEffect(() => {
        if (!location.state) {
            history.push("/");
        }
        else {
            const numQuestions = location.state.numQuestions;
            const numCorrect = location.state.numCorrect;
            setNumQuestions(numQuestions);
            setNumCorrect(numCorrect);
        }

    }, [history, location.state])

    return (
        <div className="containerBox">
            <h2 className="mb-4">Results</h2>
            <h4 className="text-center">You got {numCorrect} of {numQuestions} questions correct!</h4>
            <Button onClick={() => history.push('/')} className="mt-4 mb-3" variant={"action"}>Back to Home</Button>
        </div>
    )
}

export default Results;
