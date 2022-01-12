////////////////////
//// Build
import React, { useState } from 'react'
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export default function FormWindow({children}) {

    return (
        <Window>
            {children}
        </Window>
    )
}

const Window = styled.div`
  background: ${ props => props.theme.background };
  color: ${ props => props.theme.text };
  align-self: center;
align-items: center;
  margin-top: 10vh;
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  border: solid var(--box-border-medium) ${ props => props.theme.border };
  height: max-content;
  width: 80vw;
  
  h1 {
    margin-bottom: 1rem;
    color: ${ props => props.theme.header };
  }
  p {
    
  }
`

/** Created by ownwindows on 10-01-22 **/
