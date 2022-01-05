////////////////////
//// Build
import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { ThemeContext } from "../../../context/ThemeProvider";

////////////////////
//// Environmental

////////////////////
//// External

export default function Tooltip({ children, text }) {
    const { theme } = useContext(ThemeContext);

    const Text = styled.span`
      opacity: 0;
      width: 120px;
      color: ${theme.text};
      text-align: center;
      padding: 5px 0;
      border-radius: 6px;
      left: -45px;
      top: 15px;

      position: absolute;
      z-index: 2;
    `

    const Tip = styled.div`
      position: relative;

      display: inline-block;


      &:hover ${ Text } {
        opacity: 1;
      }

    `

    return (
        <>
            <Tip>
                { children }
                <Text>{ text }</Text>
            </Tip>
        </>
    )
}


/** Created by ownwindows on 04-01-22 **/
