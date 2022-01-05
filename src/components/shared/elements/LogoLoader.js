////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { UtilityContext } from "../../../context/UtilityProvider";

////////////////////
//// Environmental

////////////////////
//// External

function LogoLoader() {
    const { isLoading, setIsLoading } = useContext(UtilityContext);


    useEffect(() => {

        const timer = setTimeout(() => {
            console.log('This will run after 1 second!')
            setIsLoading(false);
            }, 2000);

        return function clearLoader() {
            clearTimeout(timer);
        };

    }, [ isLoading ]);

    return (
        <Logo data-text="willpowered" isLoading={ isLoading }>
            willpowered <span>students</span>
        </Logo>


    )
}

const type = keyframes`
  from {
    width: 0;
  }
`

const animation = props =>
    css`
    ${type} 2s steps(20, end ) infinite;
  `


const Logo = styled.div`
  padding: 1rem 1rem;
  color: ${props => props.theme.text};
  text-decoration: none;
  font-weight: 700;
  font-size: 1.9rem;
  font-family: var(--tittle-font);
  overflow: hidden;
  white-space: nowrap;
  width: 25rem;
   animation: ${ ({ isLoading, isTimedOut }) => isLoading ? animation : 0};
  
  span {
    font-weight: 300;
  }
`
export default LogoLoader;
/** Created by ownwindows on 03-01-22 **/
