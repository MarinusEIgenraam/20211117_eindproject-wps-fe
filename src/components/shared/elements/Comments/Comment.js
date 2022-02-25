////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import ListComment from "./ListComment";
import { CommentListItem } from "../../../../styles/List";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthProvider";
import CommentAdd from "./CommentAdd";
import RectangleButton from "../clickables/RectangleButton";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/all";
import {
    ButtonRow,
    CommentAddWindow,
    CommentChildren,
    CommenterDetail,
    UserCommenterDetails
} from "../../../../styles/Layout";
import { UtilityContext } from "../../../../context/UtilityProvider";

////////////////////
//// Environmental

////////////////////
//// External

export default function Comment({ comment, index }) {
    const { isAuth } = useContext(AuthContext);
    const utilityContext = useContext(UtilityContext);
    const [ addComment, setAddComment ] = useState(false);

    useEffect(() => {
        setAddComment(false)
    }, [ comment, utilityContext.creationCount ]);


    return (
        <CommentListItem key={ index } className="comment">
            <UserCommenterDetails>
                <CommenterDetail className="date">{ comment.startTime }</CommenterDetail>
                <CommenterDetail className="username"><NavLink className="UserLink"
                                                               to={ `/users/${ comment.user.username }` }>{ comment.user.username }</NavLink></CommenterDetail>
                <CommenterDetail
                    className="commentListLength">Replies(<span>{ comment.commentList.length }</span>)</CommenterDetail>
            </UserCommenterDetails>
            <CommentText>
                { comment.text }
            </CommentText>
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
                    <CommentAdd parent={ `parentCommentId` } parentId={ comment.id }/>
                }

            </CommentAddWindow>
            <CommentChildren>
                <ListComment comment={ comment }/>

            </CommentChildren>
        </CommentListItem>
    )
}


const CommentText = styled.div`
`


/** Created by ownwindows on 25-01-22 **/
