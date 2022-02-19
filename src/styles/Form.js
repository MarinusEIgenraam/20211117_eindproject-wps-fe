////////////////////
//// Build
import React from 'react'
import styled, { css } from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export const Form = styled.form`
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
`

export const FormWindow = styled.div`
  width: 70vw;
  height: max-content;
  position: relative;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 1rem;
  margin: 3rem 0 3rem 0;

  background: ${ props => props.theme.createBackground };
  border: solid var(--box-border-medium) ${ props => props.theme.createBorder };
  box-shadow: ${ props => props.theme.createShadow };
  
  &.project-details-tasks {
    margin-top: -1rem;
  }
  &.blog-window {
    width: 40vw;
  }
  
  &.portalWindow {
    flex-direction: column;
  }

`

export const ButtonBox = styled.section`
  ${ ({ area }) =>
          area &&
          css`
            grid-area: ${ area };
          ` }
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  
  &.liked {
    padding: 0;
    margin: 0;
    position: absolute;
    bottom: -32px;
  }
`

export const ButtonWindow = styled(ButtonBox)`
margin: 1rem 0;
  min-height: 50px;
`



export const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  position: relative;
  top: -10px;
`

/** Created by ownwindows on 15-01-22 **/
