////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export const Column = styled.div`
  display: flex;
  height: max-content;
  flex-direction: column;
  margin: 1rem;
  width: 100%;
`

export const CommentContainer = styled.li`
  border: solid var(--box-border-medium) ${ props => props.theme.border };

    width: 50vw;
`

export const CommenterDetail = styled.div`

  line-height: 1em;

  a {
    font-weight: 700;
    text-decoration: none;

    color: var(--tertiary);
  }

  &.date {
    font-size: 0.8rem;
    color: ${ props => props.theme.sub_text };
  }

  &.commentListLength {
    span {
      font-weight: 700;
    }
  }

`
export const CommentChildren = styled.div`
  padding-top: 1em;
  padding-left: 1em;
  

`
export const CommentAddWindow = styled.div`
    width: 100%;
`

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  //width: 100%;
`
export const UserCommenterDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  align-items: baseline;


  margin-bottom: 1em;
  border-bottom: solid var(--box-border-medium) ${ props => props.theme.border };


`

export const DetailRow = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
  padding: 0.25rem 0;
  border-top: solid var(--box-border-medium) ${ props => props.theme.border };
  

  &.listItem {
  margin-top: .25rem;  
  }
  
  &.double{
    align-items: end;
    
  }
  &.no-margin {
    margin-top: 0;
  }

  .light {
    font-weight: 300;
  }
`

export const Divider = styled.hr`
  margin: 1rem 0 1rem 0;
  border: 1px solid ${ props => props.theme.windowBackground };
  border-radius: 5px;

  &.small {
    width: 100%
  }

  &.rounded {
    width: 80vw;

  }
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;

  
`

export const PageHeader = styled.div`
  width: 70vw;
  padding: 1rem;
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

export const BlogsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`


export const BlogContainer = styled.div`
  position: relative;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .2);
  border: solid var(--box-border-medium) ${ props => props.theme.border };
  
  overflow: hidden;

  width: 100%;
  padding: .5em;
  display: inline-block;
  margin: 0 0 1em;
  font-size:1em;
  box-sizing: border-box;
`
export const TaskFirstRow = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
`

export const Row = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
`

export const TaskDescription = styled.div`
  position: relative;

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


/** Created by ownwindows on 15-01-22 **/
