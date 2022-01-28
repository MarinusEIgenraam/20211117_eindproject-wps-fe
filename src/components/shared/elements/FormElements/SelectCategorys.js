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

export default function SelectCategorys({ setCategory, category }) {
    const { setIsLoading, setHasError } = useContext(UtilityContext);
    const [ loadedCategories, setLoadedCategories ] = useState(false);

    const API_URL = `${ REACT_APP_API_URL }categories/all`;


    useEffect(() => {
        const source = axios.CancelToken.source();

        async function getData() {
            setHasError(false);
            setIsLoading(true)


            try {
                const result = await axios.get(API_URL, { cancelToken: source.token, });
                setLoadedCategories(result.data);

            } catch (e) {
                console.error(e);
                setHasError(true);
            }
            setIsLoading(false)
        }

        getData()

        return function clearData() {
            source.cancel();
        };
    }, []);


    return (
        <Row>
            { loadedCategories &&
                <Dropdown onChange={ setCategory }
                          data={ [
                              loadedCategories.map((categoryEntity) => {
                                  return (
                                      ( {
                                          value: categoryEntity.id,
                                          label: categoryEntity.name,
                                          iconClass: categoryEntity.name
                                      } )
                                  )
                              })
                          ] }
                          value={ category }

                          placeholder='Category'
                />
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
