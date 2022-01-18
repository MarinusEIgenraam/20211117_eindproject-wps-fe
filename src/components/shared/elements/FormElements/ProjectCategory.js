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

export default function ProjectCategory({ setCategory, category }) {
    const { setIsLoading } = useContext(UtilityContext);
    const [ loadedCategories, setLoadedCategories ] = useState(false);
    const [ hasError, setHasError ] = useState(false);

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

                          placeholder='Category'/>
            }

        </Row>
    );
}

const Row = styled.div`
  width: 100%;
  padding:0 1rem;
  display: flex;
  justify-content: end;

  @media (min-width: 768px) {
    width: 50%;
  }
`

/** Created by ownwindows on 08-01-22 **/
