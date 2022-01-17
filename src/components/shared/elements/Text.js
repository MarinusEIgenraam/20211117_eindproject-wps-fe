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
  ${props => props.theme.text};
`;

export const H2 = styled.h2`
  font-size: 1.5em;
`;

export const SubTitle = styled.small`
  margin-bottom: 30px;
  font-size: 1rem;
  color: ${ props => props.theme.text };
`
export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-items: start;
  align-content: start;
  overflow: hidden;
  

`


export const ErrorMessage = styled.p`
  margin-top: 0.25rem;
  margin-left: 0.25rem;
  font-size: 0.8rem;
  min-height: 18px;
  width: 100%;
  color: ${ props => props.theme.text };

`
/** Created by ownwindows on 15-01-22 **/
