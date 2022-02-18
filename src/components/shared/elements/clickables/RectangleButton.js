///////////////////////
//// Built-in
import React from 'react';
import styled from 'styled-components'

///////////////////////
//// Internal

///////////////////////
//// External

const STYLES = [
    "btn--primary--solid",
    "btn--secondary--solid",
    "btn--tertiary--solid",
    "btn--quaternary--solid",
    "btn--warning--solid",
    "btn--danger--solid",
    "btn--succes--solid",
    "btn--special--solid",
    "btn--primary--outline",
    "btn--secondary--outline",
    "btn--tertiary--outline",
    "btn--quaternary--outline",
    "btn--warning--outline",
    "btn--danger--outline",
    "btn--special--outline",
];

const SIZES = [ "btn--super-small", "btn--medium", "btn--large", "btn--small" ];


const RectangleButton = ({ children, type, onClick, buttonStyle, buttonSize, disabled, disabledText }) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <Button
            className={ `btn ${ checkButtonSize } ${ checkButtonStyle }` }
            onClick={ onClick }
            type={ type ? type : "button" }
            disabled={ disabled }
        >
            { children }
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
    //min-height: 2.5rem;
    border: solid 0.1vh var(--tertiary);
    box-shadow: var(--button-shadow);
    //padding: 0 10px;

    &:hover {
      background: var(--quaternary);
    }

    &:disabled,
    &button[disabled] {
      font-size: 0.8rem;
      font-weight: 300;
      border: 1px solid #999999;
      background-color: #cccccc;
      color: #666666;
    }
  }

  /*Sizes*/

  &.btn--super-small {
    padding: 0.25rem 0.25rem;
    font-size: 18px;
    min-width: 100px;
    height: 25px;
    text-align: center;
    box-shadow: none;
    border: 2px solid var(--danger);
  }

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
    height: 40px;
    padding: 0.5rem 1rem;
    font-size: 1rem;

  }


  /*Colours*/

  &.btn--primary--solid {
    background-color: var(--primary);
    color: var(--white);
    border: none;
  }

  &.btn--secondary--solid {
    background-color: var(--secondary);
    color: var(--white);
    border: none;
  }
  &.btn--tertiary--solid {
    background-color: var(--tertiary);
    color: var(--white);
    border: none;
  }

  &.btn--quaternary--solid {
    background-color: var(--quaternary);
    color: var(--white);
    border: none;
  }
  
  &.btn--warning--solid {
    background-color: var(--warning);
    color: var(--white);
    border: none;
  }

  &.btn--danger--solid {
    background-color: var(--danger);
    color: var(--white);
    border: none;

  }

  &.btn--succes--solid {
    background-color: var(--succes);
    color: var(--white);
    border: none;
  }

  &.btn--special--solid {
    background-color: var(--tertiary);
    font-family: var(--tittle-font);
    color: var(--white);
    border: none;
  }


  &.btn--primary--outline {
    background-color: transparent;
    color: var(--primary);
    border: var(--box-border-medium) solid var(--primary);
  }

  &.btn--secondary--outline {
    background-color: transparent;
    color: var(--secondary);
    border: var(--box-border-medium) solid var(--secondary);
  }

  &.btn--tertiary--outline {
    background-color: transparent;
    color: var(--tertiary);
    border: var(--box-border-medium) solid var(--tertiary);
  }

  &.btn--quaternary--outline {
    background-color: transparent;
    color: var(--quaternary);
    border: var(--box-border-medium) solid var(--quaternary);
  }
  
  &.btn--warning--outline {
    background-color: transparent;
    color: var(--warning);
    border: var(--box-border-thin) solid var(--warning);
  }

  &.btn--danger--outline {
    background-color: transparent;
    color: var(--danger);
    border: 2px solid var(--danger);
  }

  &.btn--succes--outline {
    background-color: transparent;
    color: var(--succes);
    border: 2px solid var(--succes);
  }

  &.btn--special--outline {
    background-color: transparent;
    font-family: var(--tittle-font);
    color: var(--danger);
    border: 2px solid var(--danger);
  }
`

// thanks to: https://www.youtube.com/watch?v=JfNjGLGaxR4&ab_channel=Skillthrive
