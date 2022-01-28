///////////////////////
//// Built-in
import React from 'react';
import styled from 'styled-components'

///////////////////////
//// Internal
import { AiFillCloseCircle } from "react-icons/all";

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

  &.btn {
    font-family: var(--normal-font);
    font-weight: 700;
    cursor: pointer;
    width: max-content;
    align-self: center;
    align-self: center;
    min-height: 2.5rem;
    border: solid 0.1vh var(--tertiary);
    box-shadow: var(--button-shadow);


    &:hover {
      background: var(--quaternary);
    }

    &disabled,
    button[disabled] {
      border: 1px solid #999999;
      background-color: #cccccc;
      color: #666666;
    }
  }

  /*Sizes*/

  &.btn--small {
    min-width: 70px;
    padding: 0.25rem 0.25rem;
    font-size: 18px;
    box-shadow: none;
    border: 2px solid var(--danger);
  }

  &.btn--medium {
    min-width: 60px;
    //padding: 0.25rem 0.25rem;
    font-size: 14px;
  }

  &.btn--large {
    min-width: 100px;
    padding: 0.5rem 1rem;
    font-size: 1rem;

  }


  /*Colours*/

  &.btn--primary--solid {
    background-color: var(--primary);
    color: var(--white);
    border: none;
  }

  &.btn--warning--solid {
    background-color: var(--warning);
    color: var(--white);
    border: none;
  }

  &.btn--succes--solid {
    background-color: var(--succes);
    color: var(--white);
    border: none;
  }

  &.btn--danger--solid {
    background-color: var(--danger);
    color: var(--white);
    border: none;
  }

  &.btn--special--solid {
    background-color: var(--primary);
    font-family: var(--tittle-font);
    color: var(--white);
    border: none;
  }


  &.btn--primary--outline {
    background-color: transparent;
    color: var(--primary);
    border: var(--box-border-medium) solid var(--primary);
  }

  &.btn--warning--outline {
    background-color: transparent;
    color: var(--warning);
    border: var(--box-border-thin) solid var(--warning);
  }

  &.btn--succes--outline {
    background-color: transparent;
    color: var(--succes);
    border: 2px solid var(--succes);
  }

  &.btn--danger--outline {
    background-color: transparent;
    color: var(--danger);
    border: 2px solid var(--danger);
  }

  &.btn--special--outline {
    background-color: transparent;
    font-family: var(--tittle-font);
    color: var(--danger);
    border: 2px solid var(--danger);
  }
`

// thanks to: https://www.youtube.com/watch?v=JfNjGLGaxR4&ab_channel=Skillthrive
