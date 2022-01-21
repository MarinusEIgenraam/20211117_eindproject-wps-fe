////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { UtilityContext } from "../../../../context/UtilityProvider";
import axios from "axios";
////////////////////
//// Environmental
import Dropdown from "../clickables/Dropdown/Dropdown";

const { REACT_APP_API_URL } = process.env;

////////////////////
//// External

export default function SelectUsers({ register, parent, defaultValue }) {
    const { setIsLoading } = useContext(UtilityContext);
    const [ loadedUsers, setLoadedUsers ] = useState(false);
    const [ loadedCategories, setLoadedCategories ] = useState(false);
    const [ hasError, setHasError ] = useState(false);

    const API_URL = `${ REACT_APP_API_URL }users`;


    useEffect(() => {
        const source = axios.CancelToken.source();

        async function getData() {
            setHasError(false);
            setIsLoading(true)
            try {
                const result = await axios.get(API_URL, { cancelToken: source.token, });

                setLoadedUsers(result.data.content);
                console.log(loadedUsers)

            } catch (e) {
                console.error(e);
                setHasError(true);
            }
            console.log(loadedUsers)
            setIsLoading(false)
        }

        getData()

        return function clearData() {
            source.cancel();
        };

    }, []);
    return (
        <SelectContainer id="SelectContainer">
            <Select { ...register(`${parent}Owner`) }>
                <option key={defaultValue} value={ defaultValue }>{defaultValue}</option>
                { loadedUsers &&
                    loadedUsers.map((user, key) => {
                            return (
                                <option key={key} value={ user.username }>{user.username}</option>
                            )
                        }
                    )
                }

            </Select>
        </SelectContainer>
    );
}

export const SelectContainer = styled.div`
  appearance: none;
  font-family: inherit;
  outline: none;

  
  height: max-content;
  cursor: pointer;
  display: flex;
  grid-template-areas: "select";
  align-items: center;
  position: relative;

  &:after {
    content: "";
    width: 0.8em;
    margin-left: 1ch;
    height: 0.5em;
    justify-self: end;
    background-color: ${ props => props.theme.text };
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }
`

export const Select = styled.select`

  appearance: none;
  background-color: transparent;
  border: none;
  margin: 0;
  width: 100%;
  cursor: inherit;
  line-height: inherit;
  outline: none;


  &::-ms-expand {
    display: none;
  }
`;

/** Created by ownwindows on 08-01-22 **/
