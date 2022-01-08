////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';

////////////////////
//// Environmental
import PageHeader from "../../layout/containers/PageHeader";
import PageContainer from "../../layout/containers/PageContainer";
import { UtilityContext } from "../../../context/UtilityProvider";
import RectangleButton from "../../shared/elements/clickables/RectangleButton/RectangleButton";
import * as PropTypes from "prop-types";
import ButtonContainer from "../../layout/containers/ButtonContainer";
import ListContainer from "../../layout/containers/ListContainer";
import ProjectDetails from "./ProjectDetails";
import ProjectCategory from "./ProjectCategory";

const { REACT_APP_API_URL } = process.env;

////////////////////
//// External


ButtonContainer.propTypes = { children: PropTypes.node };
export default function Projects() {
    const { setIsLoading } = useContext(UtilityContext);
    const [ pageOffset, setPageOffset ] = useState(0);
    const [ loadedProjects, setLoadedProjects ] = useState();
    const [ hasError, setHasError ] = useState(false);
    const [ category, setCategory ] = useState(false);

    const API_URL = `${ REACT_APP_API_URL }projects/all`;


    useEffect(() => {
        const source = axios.CancelToken.source();

        async function getData() {
            setHasError(false);
            setIsLoading(true)


            try {
                const result = await axios.get(API_URL, { cancelToken: source.token, });

                setLoadedProjects(result.data);
                console.log(loadedProjects)

            } catch (e) {
                console.error(e);
                setHasError(true);
            }
            console.log(loadedProjects)
            setIsLoading(false)
        }

        getData()

        return function clearData() {
            source.cancel();
        };

    }, [ pageOffset ]);


    return (
        <PageContainer>
            <PageHeader>
                <h1>
                    Projects
                </h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam delectus incidunt mollitia
                    quisquam veritatis? Ducimus eum, ipsam laboriosam minima sit vero voluptates. Ab consequatur cum
                    cumque delectus ducimus eveniet hic ipsum libero maxime molestias nam natus nobis numquam omnis,
                    quia quis sint sit unde, veniam vitae? Dolore impedit molestiae quo!
                </p>
            </PageHeader>

            <ButtonContainer>
                <RectangleButton
                    buttonStyle="btn--primary--solid"
                    buttonSize="btn--large"
                    type="submit">
                    Next
                </RectangleButton>
                <ProjectCategory category={category} setCategory={setCategory}/>

                <RectangleButton
                    buttonStyle="btn--primary--solid"
                    buttonSize="btn--large"
                    type="submit">
                    Previous
                </RectangleButton>
            </ButtonContainer>
            <ListContainer>
                { loadedProjects &&
                    loadedProjects.map((project) => {
                        return (

                            <ProjectDetails project={ project }/>

                        );

                    })

                }


            </ListContainer>

        </PageContainer>
    );
}

const Project = styled.div`

`

/** Created by ownwindows on 04-01-22 **/
