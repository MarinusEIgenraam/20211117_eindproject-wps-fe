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
import { Hero } from "../../styles/Images";
import { getBlogComments } from "../../services/controllers/Comments";
import Comment from "../shared/elements/Comments/Comment";
import {
    Date,
    DetailContainer,
    Owner,
    PrimaryInfo,
    ProjectDescription,
    ProjectMain,
    SecondaryInfo
} from "../../styles/Typography";
import RectangleButton from "../shared/elements/clickables/RectangleButton";
import { getOneBlog } from "../../services/controllers/Blogs";
import { AiFillCloseCircle } from "react-icons/all";
import CommentAdd from "../shared/elements/Comments/CommentAdd";
import { AuthContext } from "../../context/AuthProvider";


export default function BlogDetails() {
    const { isAuth } = useContext(AuthContext);
    const source = axios.CancelToken.source();
    const { id } = useParams();
    const utilityContext = useContext(UtilityContext);


    const [ pageable, setPageable ] = useState('');
    const [ loadedBlog, setLoadedBlog ] = useState({});
    const [ loadedComments, setLoadedComments ] = useState([]);
    const [ loadCount, setLoadCount ] = useState(6);
    const [ addComment, setAddComment ] = useState(false);


    useEffect(() => {

        setPageable('&page=1&size=5')

        getOneBlog(utilityContext, id).then(response => setLoadedBlog(response.data))
        getBlogComments(utilityContext, pageable, id).then((response)=> setLoadedComments(response.data.content))
        console.log(loadedComments)

        return function clearData() {
            source.cancel();
        };
    }, [ loadCount, utilityContext.creationCount ]);


    useEffect(() => {
        setAddComment(false)
    }, [loadedComments, utilityContext.creationCount]);


    function handlePageable() {
        setLoadCount(loadCount + 6)
    }


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
                                {/*<Owner>Project owner: { loadedBlog?.blogOwner.username }</Owner>*/}
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
                        { loadedComments.length > 0 &&
                            loadedComments.map((comment, index) =>
                                (
                                    <Comment comment={ comment } key={index}/>
                                ))
                        }
                        { (loadedComments.length > 6) &&
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
