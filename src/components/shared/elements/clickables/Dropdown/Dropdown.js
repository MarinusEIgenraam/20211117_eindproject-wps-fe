////////////////////
//// Dependencies
import React from 'react';
import styled from 'styled-components';

////////////////////
//// Internal

////////////////////
//// External


const STYLES = [
    "drop--primary--solid",
    "drop--primary--transparant",
];

export default function Dropdown({ value, data, placeholder, listStyle, onChange }) {
    const checkListStyle = STYLES.includes(listStyle) ? listStyle : STYLES[0];

    const handleChange = (event) => {
        const { value } = event.target;
        onChange(value);
        console.log(value);

    };

    console.log(data);
    return (
        <SelectContainer>
            <Select
                value={ value }
                className={ `drop ${ checkListStyle }` }
                onChange={ handleChange }>
                <Option value=''>{ placeholder }</Option>
                {data[0] && data[0].map((item, key) => {
                    return (
                        <Option
                            key={ key }
                            value={ item.value }>
                            { item.label }
                        </Option>
                    )
                }) }

                <Focus className='focus'></Focus>
            </Select>

        </SelectContainer>
    );
};

const Focus = styled.span`
`

const Option = styled.option`
  background: ${ props => props.theme.windowBackground };
`
const SelectContainer = styled.div`
  appearance: none;
  width: 100%;
  font-family: inherit;
  outline: none;
  min-width: 15ch;
  max-width: 30ch;
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

const Select = styled.select`
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


/** Created by ownwindows on 18-11-21 **/