////////////////////
//// Build
import React, { useState } from 'react'
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export default function CreationForm({ children }) {

    return (
        <StyledForm>
            { children }
        </StyledForm>
    )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
  }
`

/** Created by ownwindows on 10-01-22 **/
