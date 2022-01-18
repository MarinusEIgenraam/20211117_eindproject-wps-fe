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

export default function SelectUser({ setUser, user, location }) {
    const { setIsLoading } = useContext(UtilityContext);
    const [ loadedUsers, setLoadedUsers ] = useState(false);
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
        <Row>
            { loadedUsers &&
                <Dropdown onChange={ setUser }
                          data={ [
                              loadedUsers.map((user) => {
                                  return (
                                      ( {
                                          value: user.username,
                                          label: user.username,
                                          iconClass: user.username
                                      } )
                                  )
                              })
                          ] }
                          value={ location.user }

                          placeholder='Task owner'/>
            }

        </Row>
    );
}

export const Row = styled.div`
  background-color: ${ props => props.theme.background };
  width: 100%;
  flex-direction: column;
  gap: 1rem;

  @media screen and (min-width: 650px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  & > * {
    flex: 1;
    margin: 1.375rem auto 0rem auto;
  }
`;
/** Created by ownwindows on 08-01-22 **/
