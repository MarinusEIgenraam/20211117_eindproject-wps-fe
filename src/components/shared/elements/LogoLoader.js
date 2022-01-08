////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { UtilityContext } from "../../../context/UtilityProvider";

////////////////////
//// Environmental

////////////////////
//// External

function LogoLoader({navActive}) {
    const { isLoading, setIsLoading } = useContext(UtilityContext);
    const [ isTimedOut, setIsTimedOut ] = useState(false)


    useEffect(() => {
        setIsTimedOut(true)

        const timer = setTimeout(() => {
            setIsTimedOut(false)

        }, 4000);

        return function clearLoader() {
            clearTimeout(timer);
        };

    }, [ isLoading ]);

    return (
        <Logo data-text="willpowered" navActive={navActive} isLoading={ isLoading } isTimedOut={ isTimedOut }>
            willpowered <span>students</span>{(isLoading || isTimedOut) && <span>...&nbsp;</span>}
        </Logo>


    )
}

const typeWriter = keyframes`
  to {
    left: 100%;
  }
`


const animation = props =>
    css`
      ${ typeWriter } 4s steps(24) infinite;
    `


const Logo = styled.h1`
  color: ${ props => props.theme.text };
  position: relative;
  width: max-content;
margin-right: 2rem;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }

  &::before {
    background: ${ ({ isLoading, isTimedOut, navActive, theme }) => {
      if (( isTimedOut || isLoading ) && navActive) {
        return theme.windowBackground
      } else if (( isTimedOut || isLoading ) && !navActive) {
        return theme.background
      } else {
        return `transparent`
      }
    }};
    animation: ${ ({ isLoading, isTimedOut }) => isLoading || isTimedOut ? animation : 0 };
  }
  span {
    font-weight: 300;
  }
`
export default LogoLoader;

/** Created by ownwindows on 03-01-22 **/
