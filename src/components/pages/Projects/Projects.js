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
import ButtonContainer from "../../layout/containers/ButtonContainer";
import ListContainer from "../../layout/containers/ListContainer";
import ProjectDetails from "./ProjectDetails";
import ProjectCategory from "../../shared/elements/ProjectCategory";

const { REACT_APP_API_URL } = process.env;



export default function Projects() {
    const [ pageOffset, setPageOffset ] = useState(0);
    const { setIsLoading } = useContext(UtilityContext);
    const [ hasError, setHasError ] = useState(false);

    const [ loadedProjects, setLoadedProjects ] = useState();
    const [ filteredProjects, setFilteredProjects ] = useState(loadedProjects);
    const [searchParam , setSearchParam] = useState(["owner", "name"])

    const [isSelected, setIsSelected] = useState({});
    const [ projectCategory, setProjectCategory ] = useState('');

    const API_URL = `${ REACT_APP_API_URL }projects/all`;


    useEffect(() => {
        const source = axios.CancelToken.source();

        async function getData() {
            setHasError(false);
            setIsLoading(true)


            try {
                const result = await axios.get(API_URL, { cancelToken: source.token, });

                setLoadedProjects(result.data);
                console.log(result)

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

    const handleSearch = (event) => {
    }

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
                <ProjectCategory category={ projectCategory } setCategory={ setProjectCategory }/>
                {/*<SearchField setSearchParam={setSearchParam}/>*/}

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
            <ButtonContainer>
                <RectangleButton
                    buttonStyle="btn--primary--solid"
                    buttonSize="btn--large"
                    type="submit">
                    Next
                </RectangleButton>


                <RectangleButton
                    buttonStyle="btn--primary--solid"
                    buttonSize="btn--large"
                    type="submit">
                    Previous
                </RectangleButton>
            </ButtonContainer>

        </PageContainer>
    );
}

const Project = styled.div`

`

/** Created by ownwindows on 04-01-22 **/
