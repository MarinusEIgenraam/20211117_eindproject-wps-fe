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


    return (
        <>
            <Tip>
                { children }
                <Text>{ text }</Text>
            </Tip>
        </>
    )
}


const Text = styled.span`
      opacity: 0;
      width: 120px;
  font-size: 0.9rem;
      color: ${props => props.theme.text};
      text-align: center;
      padding: 5px 0;
      border-radius: 6px;
      left: -45px;
      top: 20px;

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



/** Created by ownwindows on 04-01-22 **/
