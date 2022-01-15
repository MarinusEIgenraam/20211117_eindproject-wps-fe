////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';
import InputField from "./FormElements/InputField";

////////////////////
//// Environmental

////////////////////
//// External

export const SelectContainer = styled.div`
  appearance: none;
  font-family: inherit;
  outline: none;
  width: 25rem;
  min-width: 10rem;
  max-width: 20rem;
  height: max-content;
  border: 1px solid ${ props => props.theme.border };
  padding: 0.25em 0.5em;
  font-size: 1.25rem;
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

export const Focus = styled.span`
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




export const Input = styled.input`
  padding: 0.5rem;
  margin-top: 0.25rem;
  color: ${ props => props.theme.text };
  font-weight: 400;
  display: block;
  border: none;
  background-color: transparent;
  text-align: start;
  justify-content: start;
  border-bottom: 1px dotted #999;
  width: ${ ({ width }) => width ? width : "100%" };
  height: ${ ({ height }) => height ? height : "" };

  outline: var(--tertiary-quarter) solid var(--box-border-thin);
  color: ${ props => props.theme.text };

  &::placeholder {
    color: ${ props => props.theme.sub_text };
  }
`

export const InputDate = styled(Input)`
  height: 34px;
`

export const InputContainer = styled.div`
  color: ${ props => props.theme.text };
  flex-grow: 1;
  width: 100%;
`

export const InputLabel = styled.label`
  margin-bottom: 1.25rem;
  padding: 0.25rem;
  visibility: hidden;
`

export const Search = styled(InputField)`
  width: 25rem !important;
`


/** Created by ownwindows on 15-01-22 **/
