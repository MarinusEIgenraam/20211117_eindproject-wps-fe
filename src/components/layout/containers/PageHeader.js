////////////////////
//// Build
import React, { useState } from 'react'
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export default function PageHeader({ children }) {

    return (
        <HeaderContainer>
            { children }
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
  background: var(--white);
  align-self: center;
  margin-top: 10vh;
  padding: 1rem 3rem;
  display: flex;
  flex-direction: column;
  border: solid var(--box-border-medium) var(--secondary-quarter);
  height: max-content;
  width: 80vw;
`

/** Created by ownwindows on 05-01-22 **/
