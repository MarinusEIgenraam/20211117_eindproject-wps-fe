////////////////////
//// Build
import React, { useState } from 'react'
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export default function ListContainer({ children }) {

    return (
        <Container>
            <List>
                { children }
            </List>
        </Container>

    )
}

const Container = styled.div`
  background: var(--white);
  align-self: center;
  padding: 1rem 3rem;
  display: flex;
  flex-direction: column;
  border: solid var(--box-border-medium) var(--secondary-quarter);
  height: max-content;
  width: 80vw;
`

const List = styled.ul`

`

/** Created by ownwindows on 05-01-22 **/
