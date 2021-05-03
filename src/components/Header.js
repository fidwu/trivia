import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';

const Header = (props) => {

    const history = useHistory();

    const handleRestart = () => {
        history.push("/");
    }

    return (
        <>
            <div className="d-flex justify-content-between w-100 pb-2">
                <p className="points pl-2 mb-0">Points: {props.points}</p>
                <Button variant="outline-danger" className="mr-2 p-0" onClick={handleRestart}>Restart</Button>
            </div>
        </>
    )
}

export default Header;