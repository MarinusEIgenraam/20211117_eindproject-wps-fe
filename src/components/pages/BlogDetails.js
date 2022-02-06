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
import { FormWindow } from "../../styles/Form";
import { Image, Hero } from "../../styles/Images";
import { getBlogComments, getProjectComments } from "../../services/controllers/Comments";
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
    User,
    Votes
} from "../../styles/Typography";
import RectangleButton from "../shared/elements/clickables/RectangleButton";
import { Table, TableRow } from "../../styles/Table";
import { getOneBlog } from "../../services/controllers/Blogs";
import { AiFillCloseCircle } from "react-icons/all";
import CommentAdd from "../shared/elements/Comments/CommentAdd";
import { AuthContext } from "../../context/AuthProvider";


export default function BlogDetails({}) {
    const source = axios.CancelToken.source();
    const { setIsLoading, setHasError, creationCount, setCreationCount } = useContext(UtilityContext);
    const [ loadedBlog, setLoadedBlog ] = useState();
    const [ loadedComments, setLoadedComments ] = useState();
    const [ loadCount, setLoadCount ] = useState(6);
    const { isAuth } = useContext(AuthContext);
    const [ addComment, setAddComment ] = useState(false);

    const { id } = useParams();

    useEffect(() => {

        const getData = async () => {
            const blogResult = await getOneBlog(setIsLoading, setHasError, id);
            setLoadedBlog(blogResult.data);
            console.log(loadedBlog)
            const commentResults = await getBlogComments(setIsLoading, setHasError, loadCount, id);
            setLoadedComments(commentResults.data.content)
        }

        getData()

        return function clearData() {
            source.cancel();
        };

    }, [ loadCount, creationCount ]);

    function handlePageable() {
        setLoadCount(loadCount + 6)
    }

    useEffect(() => {
        setAddComment(false)
    }, [creationCount]);

    return (
        <PageContainer>
            { loadedBlog &&
                <>

                    <FormWindow className="blog-window">
                        <ProjectMain>
                            <DetailContainer>
                                <Title>
                                    { loadedBlog.blogName }
                                </Title>
                            </DetailContainer>
                            <Hero className="" image={ loadedBlog.imageUrl }/>
                        </ProjectMain>
                        <ProjectDescription>
                            { loadedBlog.description }
                        </ProjectDescription>
                        <DetailRow>
                            <a href={ `${loadedBlog.ur}`}>
                                {loadedBlog.url}
                            </a>
                        </DetailRow>
                        <DetailRow className="users no-margin">
                            <PrimaryInfo>
                                <Owner>Project owner: { loadedBlog?.blogOwner.username }</Owner>
                            </PrimaryInfo>
                            <SecondaryInfo>
                                <Date>{ loadedBlog?.startTime }</Date>
                            </SecondaryInfo>
                        </DetailRow>


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
                                        onClick={ () => setAddComment(false)}
                                        size={ 15 }
                                    />
                                }
                            </ButtonRow>


                            { ( addComment && isAuth ) &&
                                <CommentAdd parent={ `parentBlogId` } parentId={ loadedBlog.blogId }/>
                            }

                        </CommentAddWindow>
                        { loadedComments &&
                            loadedComments.map((comment, index) =>
                                (
                                    <Comment comment={ comment } key={index}/>
                                ))
                        }
                        { (loadedComments && loadedComments.length > 6) &&
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
