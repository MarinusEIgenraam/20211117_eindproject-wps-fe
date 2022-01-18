////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export const PageContainer = styled.div`
  display: flex;
  margin-top: 15vh;
  align-items: center;
  position: relative;
  flex-direction: column;
  flex-wrap: wrap;
  min-height: 100vh;
  width: 100%;

  @media screen and (min-width: 769px) {
    margin-top: 15vh;
  }
`

export const PageHeader = styled.div`
  width: 70vw;
  padding: 1rem;
`

export const Container = styled.div`
  background: ${ props => props.theme.background };
  height: 120vh;
  display: flex;
  flex-gro: 1;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
`
export const Column = styled.div`
  display: flex;
  height: max-content;
  flex-direction: column;
  margin: 1rem;
  width: 100%;
`

export const SubRow = styled.div`
  display: flex;
  flex-direction: row;
`

export const SubRowList = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: column;
`

export const BlogsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`


/** Created by ownwindows on 15-01-22 **/
