///////////////////////
//// Built-in
import React from 'react';
import styled from 'styled-components'

///////////////////////
//// Internal
import './RectangleButton.scss';
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { AiFillCloseCircle, CgDanger } from "react-icons/all";

///////////////////////
//// External

const STYLES = [
    "btn--primary--solid",
    "btn--warning--solid",
    "btn--danger--solid",
    "btn--succes--solid",
    "btn--special--solid",
    "btn--primary--outline",
    "btn--warning--outline",
    "btn--danger--outline",
    "btn--special--outline",
];

const SIZES = [ "btn--medium", "btn--large", "btn--small" ];


const RectangleButton = ({ children, type, onClick, buttonStyle, buttonSize, disabled }) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <Button
            className={ `btn ${ checkButtonSize } ${ checkButtonStyle }` }
            onClick={ onClick }
            type={ type ? type : "button" }
            disabled={ disabled }
        >

            { disabled
                ?
                <AiFillCloseCircle
                    size={ 15 }
                />
                :
                children
            }
        </Button>
    )

};

export default RectangleButton;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin: 5px;
`

// thanks to: https://www.youtube.com/watch?v=JfNjGLGaxR4&ab_channel=Skillthrive
