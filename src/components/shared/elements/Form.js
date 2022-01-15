////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export const Form = styled.form`
  align-items: start;
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
`

export const FormWindow = styled.div`
  background: ${ props => props.theme.windowBackground };
  padding: 1.5rem 3rem;
  display: flex;
  flex-direction: column;
  border: solid var(--box-border-medium) ${ props => props.theme.border };
  box-shadow: ${ props => props.theme.shadow };
  height: max-content;
  max-width: 80vw;
`

export const ButtonBox = styled.section`
  display: flex;
  width: 100%;
  flex-direction: row;
  padding: 1rem 1rem;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -20px;
`

export const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  position: relative;
  top: -10px;
`

/** Created by ownwindows on 15-01-22 **/
