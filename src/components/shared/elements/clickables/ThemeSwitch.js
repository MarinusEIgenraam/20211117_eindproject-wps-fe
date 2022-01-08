////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';

////////////////////
//// Environmental
import { BsFillSunFill } from "react-icons/bs";
import { RiMoonClearFill } from "react-icons/ri";
import { UtilityContext } from "../../../../context/UtilityProvider";

////////////////////
//// External

export default function ThemeSwitch() {
    const { toggleTheme, theme } = useContext(UtilityContext);



    return (
        <SwitchWrapper>
            {theme==="dark" ?
                <BsFillSunFill onClick={toggleTheme} size={ 30 }/>
:
                <RiMoonClearFill onClick={toggleTheme} size={ 30 }/>

            }
        </SwitchWrapper>
    )
}

const SwitchWrapper = styled.span`
  cursor: pointer;
  border: none;
  padding: 0 1rem;
  color: ${props => props.theme.text};
  &:focus {
    outline: none;
  }
  transition: all .5s ease;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`


/** Created by ownwindows on 05-01-22 **/
