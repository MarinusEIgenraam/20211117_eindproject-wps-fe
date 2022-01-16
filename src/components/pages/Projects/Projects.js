////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
////////////////////
//// Environmental
import { UtilityContext } from "../../../context/UtilityProvider";
import RectangleButton from "../../shared/elements/clickables/RectangleButton/RectangleButton";
import ProjectDetails from "../../layout/content/ProjectDetails";
import ProjectCategory from "../../shared/elements/FormElements/ProjectCategory";
import { HeaderContainer } from "../../shared/elements/TextLayout";
import { H1, H2 } from "../../shared/elements/Text";
import { ButtonBox } from "../../shared/elements/Form";
import { ListWrapper, ProjectList } from "../../shared/elements/List";
import { PageContainer} from "../../shared/elements/Layout";
import { Link } from "react-router-dom";

const { REACT_APP_API_URL } = process.env;



export default function Projects() {
    const [ pageOffset, setPageOffset ] = useState(0);
    const { setIsLoading } = useContext(UtilityContext);
    const [ hasError, setHasError ] = useState(false);
    const [ categoryUri, setCategoryUri ] = useState('');

    const [ loadedProjects, setLoadedProjects ] = useState();
    const [ filteredProjects, setFilteredProjects ] = useState(loadedProjects);
    const [searchParam , setSearchParam] = useState(["owner", "name"])

    const [isSelected, setIsSelected] = useState({});
    const [ projectCategory, setProjectCategory ] = useState('');

    const API_URL = `${ REACT_APP_API_URL }projects`;


    useEffect(() => {
        const source = axios.CancelToken.source();
        const token = localStorage.getItem('token');
        if (projectCategory) {
            setCategoryUri(`?categoryId=${projectCategory}`)
        }
        async function getData() {
            setHasError(false);
            setIsLoading(true)


            try {
                const result = await axios.get(`${API_URL}${categoryUri}`, {
                    cancelToken: source.token,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }});

                setLoadedProjects(result.data.content);

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

    }, [ pageOffset, projectCategory ]);

    const handleSearch = (event) => {
    }

    return (
        <PageContainer>
            <HeaderContainer>
                <H2>
                    Projects
                </H2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam delectus incidunt mollitia
                    quisquam veritatis? Ducimus eum, ipsam laboriosam minima sit vero voluptates. Ab consequatur cum
                    cumque delectus ducimus eveniet hic ipsum libero maxime molestias nam natus nobis numquam omnis,
                    quia quis sint sit unde, veniam vitae? Dolore impedit molestiae quo!
                </p>
            </HeaderContainer>

            <ButtonBox>
                <ProjectCategory category={ projectCategory } setCategory={ setProjectCategory }/>
                {/*<SearchField setSearchParam={setSearchParam}/>*/}

            </ButtonBox>
            <ProjectList>
                { loadedProjects && loadedProjects.map(project => (
                    <Link to={ `/project/${project.id}` } key={ project.id }>
                        <h4>
                            { project.name }
                        </h4>
                        {/*<p>Due by : {project.endTime.toDate().toDateString()}</p>*/}
                        <div className="assigned-to">
                            <ul>
                                {project.collaborators.map(user=>(
                                    <li className='avatar' key={user.imageUrl}  title={user.username}>
                                        <div className="avatar">
                                            <img src={user.imageUrl} alt="user avatar" />
                                        </div>
                                    </li>
                                ))}
                                <li className='avatar' key={project.projectOwner.imageUrl}  title={project.projectOwner.username}>
                                    <div className="avatar">
                                        <img src={project.projectOwner.imageUrl} alt="user avatar" />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Link>
                )) }
            </ProjectList>

            <ButtonBox>
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
            </ButtonBox>

        </PageContainer>
    );
}

const Avatar = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  img{
    width: 100%;
    height: 100%;
  }
`

/** Created by ownwindows on 04-01-22 **/
