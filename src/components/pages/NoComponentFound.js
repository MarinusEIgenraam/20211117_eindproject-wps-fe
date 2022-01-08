////////////////////
//// Build
import React, { useState } from 'react'
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export default function NoComponentFound() {

    return (
        <Container>

            <Title>This is not the page you are looking for....</Title>

        </Container>
    )
}

const Container = styled.h1`
  display: flex;
  padding: 2rem;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Title = styled.div`
color: var(--tertiary);
`

/** Created by ownwindows on 04-01-22 **/
