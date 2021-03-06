////////////////////
//// Build
import React from 'react'
import styled, { css } from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External


export const SelectContainer = styled.div`
  ${ ({ area }) =>
          area &&
          css`
            grid-area: ${ area };
          ` }
  appearance: none;
  align-self: end;
  margin-bottom: 0.75rem;
  font-family: inherit;
  outline: none;
  width: 100%;
  font-size: 1.1rem;
  font-weight: 500;


  height: 3rem;
  border: 1px solid ${ props => props.theme.border };
  padding: 0.5rem 0.5rem;
  cursor: pointer;
  background-image: linear-gradient(to top, ${ props => props.theme.border }, ${ props => props.theme.background } 33%);
  display: flex;
  grid-template-areas: "select";
  align-items: center;
  position: relative;

  &:after {
    content: "";
    width: 0.8em;
    height: 0.5em;
    justify-self: end;
    background-color: ${ props => props.theme.text };
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }
`

export const Option = styled.option`
  background: ${ props => props.theme.windowBackground };
`


export const Select = styled.select`
  appearance: none;
  background-color: transparent;
  border: none;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  outline: none;


  &::-ms-expand {
    display: none;
  }
`

const Input = styled.input`
  padding: 0.5rem;
  width: 100%;
  min-height: 31px;

  margin-top: 0.25rem;
  color: ${ props => props.theme.text };
  font-weight: 400;
  border: none;
  background-color: transparent;


  outline: ${ props => props.theme.createBorder } solid var(--box-border-thin);
  color: ${ props => props.theme.text };

  &::placeholder {
    color: ${ props => props.theme.createSubText };
  }
`

export const InputMultiLine = styled.textarea`
  padding: 0.5rem;
  margin-top: 0.25rem;

  color: ${ props => props.theme.text };
  font-weight: 400;
  border: none;
  width: 100%;
  background-color: transparent;
  min-height: 50px;
  outline: ${ props => props.theme.createBorder } solid var(--box-border-thin);
  color: ${ props => props.theme.text };

  &::placeholder {
    color: ${ props => props.theme.sub_text };
  }
`

export const InputDate = styled(Input)`
  height: 34px;
`

export const Search = styled(Input)`
  width: 25rem !important;
`


/** Created by ownwindows on 15-01-22 **/
