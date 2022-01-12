////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export default function ButtonContainer({ children }) {

    return (
        <Container>
            { children }
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:space-around;
  padding: 1rem 1rem;
  align-self: center;
  align-items:center;
  width: 80vw;
`

/** Created by ownwindows on 05-01-22 **/
