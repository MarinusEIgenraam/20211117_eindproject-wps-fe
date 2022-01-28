////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';

export const ListMetaData = styled.div`
  display: flex;
  flex: 2 0;
  flex-direction: column;
  justify-content: space-between;
`

export const Category = styled.div`
  position: relative;
  top: -5px;
  font-size: 0.9rem;
  font-weight: 300;
  font-style: italic;
`

export const Details = styled.div`
  flex: 2;
  display: flex;
`
export const Collaborators = styled.span`

`

export const ProjectHeader = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  max-height: 200px;

`

export const HeaderContainer = styled.div`
  background: ${ props => props.theme.background };
  color: ${ props => props.theme.text };
  margin-top: 10vh;
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  border: solid var(--box-border-medium) ${ props => props.theme.border };
  height: max-content;
  width: 80%;

  h1 {
    margin-bottom: 1rem;
    color: ${ props => props.theme.header };
  }

  p {

  }
`
/** Created by ownwindows on 15-01-22 **/
