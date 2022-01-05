////////////////////
//// Build
import React, { useState } from 'react'
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export default function PageContainer({children}) {

    return (
        <Container>
            { children }
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

/** Created by ownwindows on 05-01-22 **/
