////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;


  @media screen and (min-width: 769px) {
    margin-top: 15vh;
  }
`
export const TaskFirstRow = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
`




export const TaskDescription = styled.div`
  p {
    font-size: 0.8rem;
  }

  > h6 {
    color: ${ props => props.theme.text };

    span {
      max-width: 40%;
      overflow: hidden;
      color: ${ props => props.theme.sub_text };
    }
  }
`

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

export const UserItem = styled.div`
  width: 70vw;
  height: min-content;
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-direction: row;
  transition: all 500ms;
  margin: 25px 25px -180px 25px;
  padding: 1rem;
  background: ${ props => props.theme.background };
  border: solid var(--box-border-medium) ${ props => props.theme.border };
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.45) 0px -20px 20px -20px;


  :hover {
    border: solid var(--box-border-medium) ${ props => props.theme.border };
    box-shadow: ${ props => props.theme.shadow };
    margin: 25px 25px 50px 25px;
    background: ${ props => props.theme.windowBackground };
  }

  @media (min-width: 769px) {

  }

  @media (max-width: 660px) {
    flex-direction: column;
  }

`

export const Divider = styled.hr`
  margin: 1rem 0 1rem 0;
  border: 1px solid ${ props => props.theme.text };
  border-radius: 5px;
  &.small{
    width: 100%
  }
  &.rounded {
    width: 80vw;

  }
`


/** Created by ownwindows on 15-01-22 **/
