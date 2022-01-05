////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import { HiMoon } from "react-icons/hi";
import { CgSun } from "react-icons/cg";
import styled from 'styled-components';

////////////////////
//// Environmental
import { UtilityContext } from "../../../../context/UtilityProvider";

////////////////////
//// External

export default function ThemeSwitch() {
    const { toggleTheme, theme } = useContext(UtilityContext);
    const icon = theme ===  "dark" ? <HiMoon size={30} /> : <CgSun size={30} />;



    return (
        <SwitchWrapper>
            <Switch onClick={toggleTheme}>
                {icon}
            </Switch>

        </SwitchWrapper>
    )
}

const SwitchWrapper = styled.span`
  position: relative;
`
const Switch = styled.button`
  cursor: pointer;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  &:focus {
    outline: none;
  }
  transition: all .5s ease;
`

/** Created by ownwindows on 05-01-22 **/
