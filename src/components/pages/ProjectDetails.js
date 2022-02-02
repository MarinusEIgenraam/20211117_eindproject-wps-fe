////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from "axios";
////////////////////
//// Environmental
import { ButtonRow, CommentAddWindow, DetailRow, PageContainer } from "../../styles/Layout";
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
    User, Votes
} from "../../styles/Typography";
import RectangleButton from "../shared/elements/clickables/RectangleButton";
import { Table, TableRow } from "../../styles/Table";
import {
    AiFillCloseCircle,
    AiFillHeart,
    FcDislike, FcLike,
    FcLikePlaceholder, IoIosHeart,
    IoIosHeartDislike,
    RiDislikeFill
} from "react-icons/all";
import CommentAdd from "../shared/elements/Comments/CommentAdd";
import { AuthContext } from "../../context/AuthProvider";
import { HeartIcon } from "../../styles/Icons";
import { projectVote } from "../../services/controllers/Votes";


export default function Project({}) {
    const source = axios.CancelToken.source();
    const { setIsLoading, setHasError, creationCount, setCreationCount } = useContext(UtilityContext);
    const [ loadedProject, setLoadedProject ] = useState();
    const [ loadedComments, setLoadedComments ] = useState();
    const [ loadCount, setLoadCount ] = useState(6);
    const { isAuth } = useContext(AuthContext);
    const [ addComment, setAddComment ] = useState(false);

    const { id } = useParams();

    useEffect(() => {

        const getData = async () => {
            const projectResult = await getOneProject(setIsLoading, setHasError, id);
            setLoadedProject(projectResult.data);
            const commentResults = await getProjectComments(setIsLoading, setHasError, loadCount, id);
            setLoadedComments(commentResults.data.content)
        }

        getData()

        return function clearData() {
            source.cancel();
        };

    }, [ loadCount, creationCount ]);

    useEffect(() => {
        setAddComment(false)
    }, [ creationCount ]);


    function handlePageable() {
        setLoadCount(loadCount + 6)
    }

    async function handleVote(voteType) {
        const newVote = {
            voteType: voteType,
            projectId: id
        }
        console.log(newVote)
        const results = await projectVote(setIsLoading, setHasError, newVote)
        setCreationCount(creationCount+1)
        console.log(results)
    }

    return (
        <PageContainer>
            { loadedProject &&
                <>

                    <FormWindow>

                        <ProjectMain>
                            <DetailContainer className="projectDetails">
                                <Title>
                                    { loadedProject.projectName }
                                </Title>
                                <ProjectDescription>
                                    { loadedProject.description }
                                </ProjectDescription>

                            </DetailContainer>
                            <Image className="with-margin" src={ loadedProject.imageUrl }/>
                        </ProjectMain>
                        <DetailRow className="users">
                            <PrimaryInfo>
                                <Owner>Project owner: { loadedProject?.projectOwner.username }</Owner>
                                { loadedProject?.collaborators.map((user, index) => (
                                    <User className="on">{ user.username } </User>
                                )) }
                            </PrimaryInfo>
                            <SecondaryInfo>
                                <Category>{ loadedProject?.category.name }</Category>
                                <Date>{ loadedProject?.startTime }</Date>
                            </SecondaryInfo>
                        </DetailRow>
                        <ButtonBox className="liked">
                            <HeartIcon>
                                <div>
                                    <IoIosHeart
                                        onClick={ () => handleVote("UPVOTE") }
                                        size={ 30 }
                                    />
                                </div>
                            </HeartIcon>
                            <Votes>{ loadedProject.voteCount }</Votes>
                            <HeartIcon>
                                <div>
                                    <IoIosHeartDislike
                                        onClick={ () => handleVote("DOWNVOTE") }
                                        size={ 30 }
                                    />
                                </div>
                            </HeartIcon>
                        </ButtonBox>
                    </FormWindow>

                    <FormWindow className="project-details-tasks">
                        <SubHeader>
                            Project tasks
                        </SubHeader>
                        <Table>

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
                            loadedComments.map(comment =>
                                (
                                    <Comment comment={ comment }/>
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

const Text = styled.div`
  width: 50%;
`

/** Created by ownwindows on 04-01-22 **/
