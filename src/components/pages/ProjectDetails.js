////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from "axios";
////////////////////
//// Environmental
import { ButtonRow, CommentAddWindow, DetailRow, Divider, PageContainer } from "../../styles/Layout";
import { UtilityContext } from "../../context/UtilityProvider";
import { useParams } from "react-router-dom";
import { ButtonBox, FormWindow } from "../../styles/Form";
import { Image } from "../../styles/Images";
import { getProjectComments } from "../../services/controllers/Comments";
import { getOneProject } from "../../services/controllers/Projects";
import Comment from "../shared/elements/Comments/Comment";
import {
    Category,
    Date,
    DetailContainer,
    Owner,
    PrimaryInfo,
    ProjectDescription,
    ProjectMain,
    SecondaryInfo,
    SubHeader,
    User
} from "../../styles/Typography";
import RectangleButton from "../shared/elements/clickables/RectangleButton";
import { Table, TableRow } from "../../styles/Table";
import { AiFillCloseCircle, IoIosHeart, IoIosHeartDislike } from "react-icons/all";
import CommentAdd from "../shared/elements/Comments/CommentAdd";
import { AuthContext } from "../../context/AuthProvider";
import { HeartIcon } from "../../styles/Icons";
import { projectVote } from "../../services/controllers/Votes";
import ProjectCreate from "../feature/Projects/ProjectCreate";
import { pluralize } from "../../services/helpers/text";

const PLURALS = {
    person: 'people',
    has: 'have'
};
const autoPluralize = pluralize(PLURALS);

export default function Project() {
    const source = axios.CancelToken.source();
    const utilityContext = useContext(UtilityContext);
    const { user, isAuth } = useContext(AuthContext);
    const { id } = useParams();

    const [ pageable, setPageable ] = useState('');
    const [ loadedProject, setLoadedProject ] = useState();
    const [ loadedComments, setLoadedComments ] = useState([]);
    const [ loadCount, setLoadCount ] = useState(6);
    const [ addComment, setAddComment ] = useState(false);
    const [ editProject, setEditProject ] = useState(false);


    function handlePageable() {
        setLoadCount(loadCount + 6)
    }

    function handleVote(voteType) {

        const newVote = {
            voteType: voteType,
            projectId: id
        }
        return projectVote(utilityContext, newVote)
    }


    useEffect(() => {
        getOneProject(utilityContext, id).then((response) => setLoadedProject(response.data))
        setPageable(`&page=0&size=${ loadCount }`)

        getProjectComments(utilityContext, pageable, id).then((response) => setLoadedComments(response.data.content))


        return function clearData() {
            source.cancel();
        };
    }, [ loadCount, utilityContext.creationCount ]);


    useEffect(() => {
        setAddComment(false)
    }, [ utilityContext.creationCount ]);

    return (
        <PageContainer>
            { ( loadedProject && ( ( loadedProject?.projectOwner.username === user?.username ) ) ) &&
                <>
                    <ButtonRow className="header-button">

                        <RectangleButton
                            type="submit"
                            buttonSize="btn--large"
                            buttonStyle="btn--quinary--solid"
                            onClick={ () => setEditProject(true) }
                        >
                            Edit project
                        </RectangleButton>
                    </ButtonRow>

                    { editProject &&
                        <ProjectCreate defaultProject={ loadedProject }/>
                    }
                </>
            }
            { ( loadedProject && !editProject ) &&
                <>

                    <FormWindow>

                        <ProjectMain>
                            <DetailContainer className="projectDetails">
                                <Title>
                                    { loadedProject.projectName }
                                </Title>
                                <div>


                                    <ProjectDescription>
                                        { loadedProject.description }
                                    </ProjectDescription>
                                    <Divider className="no-margin"/>
                                    { loadedProject.voteCount } { autoPluralize(loadedProject.voteCount, "person") } { autoPluralize(loadedProject.voteCount, "has") } liked
                                    this project
                                </div>

                            </DetailContainer>
                            <Image className="with-margin" src={ loadedProject.imageUrl }/>
                        </ProjectMain>
                        <DetailRow className="users">
                            <PrimaryInfo>
                                <Owner>{ loadedProject?.projectOwner.username }</Owner>
                                { loadedProject?.collaborators.map((user, index) => (
                                    <User className="on" key={ index }>{ user.username } </User>
                                )) }
                            </PrimaryInfo>
                            <SecondaryInfo>
                                <Category>{ loadedProject?.category.name }</Category>
                                <Date>{ loadedProject?.startTime }</Date>
                            </SecondaryInfo>
                        </DetailRow>
                        <ButtonBox className="liked">
                            { user &&
                                <HeartIcon>
                                    <div>
                                        <IoIosHeart
                                            onClick={ () => handleVote("UPVOTE") }
                                            size={ 30 }
                                        />
                                    </div>
                                </HeartIcon>
                            }

                            { user &&
                                <HeartIcon>
                                    <div>
                                        <IoIosHeartDislike
                                            onClick={ () => handleVote("DOWNVOTE") }
                                            size={ 30 }
                                        />
                                    </div>
                                </HeartIcon>
                            }

                        </ButtonBox>
                    </FormWindow>

                    <FormWindow className="project-details-tasks">
                        <SubHeader>
                            Project tasks
                        </SubHeader>
                        <Table>

                            <tbody>
                            <TableRow>

                                <th className="name">
                                    name
                                </th>
                                <th className="description">
                                    description
                                </th>
                                <th className="number">
                                    sub tasks
                                </th>
                                <th className="user">
                                    task owner
                                </th>
                                <th className="date">
                                    deadline
                                </th>
                                <th className="date">
                                    created at
                                </th>

                            </TableRow>

                            { loadedProject?.projectTaskList &&
                                loadedProject?.projectTaskList.map((task, index) =>
                                    (
                                        <TableRow className="project-task" key={ index }>
                                            <td>{ task.taskName }
                                            </td>
                                            <td>
                                                { task.description }
                                            </td>
                                            <td>{ task.taskTaskList.length }</td>
                                            <td>
                                                { task.taskOwner.username }
                                            </td>
                                            <td className="date">
                                                { task.endTime }
                                            </td>
                                            <td className="date">
                                                { task.startTime }
                                            </td>
                                        </TableRow> )
                                )
                            }
                            </tbody>
                        </Table>
                    </FormWindow>


                    <CommentList>
                        <CommentAddWindow>
                            <ButtonRow>

                                <RectangleButton
                                    className="btn btn--super-small"
                                    disabled={ !isAuth }
                                    disabledText="Login to reply"
                                    onClick={ () => setAddComment(!addComment) }
                                >
                                    comment
                                </RectangleButton>
                                { addComment &&
                                    <AiFillCloseCircle
                                        onClick={ () => setAddComment(false) }
                                        size={ 15 }
                                    />
                                }
                            </ButtonRow>


                            { ( addComment && isAuth ) &&
                                <CommentAdd parent={ `parentProjectId` } parentId={ loadedProject.projectId }/>
                            }

                        </CommentAddWindow>
                        { loadedComments &&
                            loadedComments.map((comment, index) =>
                                (
                                    <Comment key={ index } comment={ comment }/>
                                ))
                        }
                        { ( loadedComments && loadedComments.length > 6 ) &&
                            <RectangleButton onClick={ handlePageable } buttonSize="btn btn--medium"
                                             buttonStyle="btn--special--outline">
                                Load more
                            </RectangleButton>
                        }
                    </CommentList>

                </>
            }
        </PageContainer>
    )
}

const CommentList = styled.ol`
  // li:first-child {
    //   box-shadow: ${ props => props.theme.topShadow };
  // }
`
const Title = styled.h3`

`
/** Created by ownwindows on 04-01-22 **/
