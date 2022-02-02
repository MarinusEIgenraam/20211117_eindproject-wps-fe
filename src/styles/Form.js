////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';

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
  max-width: 1200px;

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

`

export const ButtonBox = styled.section`
  display: flex;
  width: 100%;
  flex-direction: row;
  padding: 1rem 1rem;
  justify-content: center;
  align-items: center;
  position: relative;
`

export const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  position: relative;
  top: -10px;
`

/** Created by ownwindows on 15-01-22 **/
