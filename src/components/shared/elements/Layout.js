////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  //flex: 1 5;
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
  div:nth-child(1) {
    div label p {
      visibility: visible;
    }
  }
`

export const BlogsContainer = styled.div`
    display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`


/** Created by ownwindows on 15-01-22 **/
