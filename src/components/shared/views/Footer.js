////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export default function Footer() {

    return (
        <Wrapper>

        </Wrapper>
    )
}

const Wrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 3em 0;
  border: solid var(--box-border-medium) ${ props => props.theme.border };
`;


/** Created by ownwindows on 15-01-22 **/
