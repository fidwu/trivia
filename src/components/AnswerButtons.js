import ToggleButton from 'react-bootstrap/ToggleButton';
import React from 'react';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

const AnswerButton = (props) => {
    return (
        <ToggleButtonGroup type="radio" name="options" value={props.selected} onChange={props.handleChange}  className="answerChoices">
            <ToggleButton variant="answerChoicesBtn" value={props.choiceTxt}>{props.choiceTxt}</ToggleButton>
        </ToggleButtonGroup>
    )
}

export default AnswerButton;
