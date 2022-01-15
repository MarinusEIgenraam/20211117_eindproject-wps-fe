////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export const H1 = styled.h1`
  font-size: 2em;
  margin-bottom: 0.25em;
`;

export const H2 = styled.h2`
  font-size: 1.5em;
`;

export const SubTitle = styled.small`
  margin-bottom: 30px;
  font-size: 1rem;
  color: ${ props => props.theme.text };
`

export const ErrorMessage = styled.p`
  margin-top: 0.25rem;
  margin-left: 0.25rem;
  font-size: 0.8rem;
  min-height: 18px;
  color: ${ props => props.theme.sub_text };

`
/** Created by ownwindows on 15-01-22 **/
