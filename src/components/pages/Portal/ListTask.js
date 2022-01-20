////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { UtilityContext } from "../../../context/UtilityProvider";
import axios from "axios";
import { H2 } from "../../shared/elements/Text";
import { UnorderedList } from "../../shared/elements/List";
import RectangleButton from "../../shared/elements/clickables/RectangleButton/RectangleButton";
import { AiOutlineClose } from "react-icons/all";
import { AuthContext } from "../../../context/AuthProvider";
import CreateProject from "../../layout/forms/Project/CreateProject";

////////////////////
//// Environmental
const { REACT_APP_API_URL } = process.env;

////////////////////
//// External

export default function ListTask() {
    const [ pageOffset, setPageOffset ] = useState(0);
    const { setIsLoading } = useContext(UtilityContext);
    const { isAuth, user } = useContext(AuthContext);
    const [ writeProject, setWriteProject ] = useState(false);
    const [ hasError, setHasError ] = useState(false);
    const [ categoryUri, setCategoryUri ] = useState('');

    const [ loadedTasks, setLoadedTasks ] = useState();
    const [ filteredProjects, setFilteredProjects ] = useState(loadedTasks);
    const [ searchParam, setSearchParam ] = useState([ "owner", "name" ])

    const [ isSelected, setIsSelected ] = useState({});
    const [ projectCategory, setProjectCategory ] = useState('');

    const API_URL = `${ REACT_APP_API_URL }tasks`;


    useEffect(() => {
        const source = axios.CancelToken.source();
        const token = localStorage.getItem('token');
        if (projectCategory) {
            setCategoryUri(`?categoryId=${ projectCategory }`)
        }

        async function getData() {
            setHasError(false);
            setIsLoading(true)


            try {
                const result = await axios.get(`${ API_URL }?taskOwner=${ user.username }`, {
                    cancelToken: source.token,
                    headers: {
                        Authorization: `Bearer ${ token }`
                    }
                });

                setLoadedTasks(result.data);
                console.log(result)
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
        <Container>
            <H2>
                Your tasks
            </H2>


            <UnorderedList>
                { loadedTasks && loadedTasks.map(task => (
                    <TaskListItem key={ task.id }>
                        <TaskFirstRow>
                            <TaskDescription>
                                <h6> { task.taskName } <span>{ task.parentProject.projectName } </span></h6>
                                <p> { task.description } </p>
                            </TaskDescription>
<button>finished</button>
                        </TaskFirstRow>
                        <DetailRow>
                            <h6>{ task.startTime } <span className="light">| { task.taskOwner.username } </span>
                            </h6>
                        </DetailRow>


                    </TaskListItem>
                )) }
            </UnorderedList>
        </Container>
    )
}

const TaskFirstRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
`
export const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;


  @media screen and (min-width: 769px) {
    margin-top: 15vh;
  }
`


export const DetailRow = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.25rem 0;
  border-top: solid var(--box-border-medium) ${ props => props.theme.border };


  .light {
    font-weight: 300;
  }
`

const TaskDescription = styled.div`
  p {
    font-size: 0.8rem;
  }

  > h6 {
    color: ${ props => props.theme.text };

    span {
      max-width: 40%;
      overflow: hidden;
      color: ${ props => props.theme.sub_text };
    }
  }
`
const TaskListItem = styled.li`
  width: 70vw;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-direction: column;
  background: ${ props => props.theme.background };


  @media (min-width: 769px) {

  }

  @media (max-width: 660px) {
    flex-direction: column;
  }

`

/** Created by ownwindows on 18-01-22 **/
