////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export const BorderedWindow = styled.div`
  transition: all .5s ease;
  max-width: 70vw;
  margin-bottom: 40px;
  width: 100%;
  z-index: 1;
  padding: 1rem 0;
  background: ${ props => props.theme.createBackground };
  border: solid var(--box-border-medium) ${ props => props.theme.createBorder };
  box-shadow: ${ props => props.theme.createShadow };

`

export const VisualContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
`


/** Created by ownwindows on 17-02-22 **/
