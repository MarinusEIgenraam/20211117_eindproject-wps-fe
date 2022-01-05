////////////////////
//// Build
import React, { useState } from 'react'
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export default function Error({text, ...props}) {

    return (
        <ErrorMessage {...props}>
            {text}
        </ErrorMessage>
    )
}

const ErrorMessage = styled.p`
  margin: ${props => props.margin ? props.margin : 0};
  font-size: 0.875rem;
  color: var(--secondary);
`

/** Created by ownwindows on 04-01-22 **/
