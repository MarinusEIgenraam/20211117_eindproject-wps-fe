////////////////////
//// Build
import React, { useContext, useState } from 'react'
import ListComment from "./ListComment";
import { CommentListItem } from "../../../../styles/List";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthProvider";
import CommentAdd from "./CommentAdd";
import RectangleButton from "../clickables/RectangleButton";
import styled from "styled-components";

////////////////////
//// Environmental

////////////////////
//// External

export default function Comment({ comment }) {
    const { isAuth, user } = useContext(AuthContext);
    const [ addComment, setAddComment ] = useState(false);
    const [ children, showChildren ] = useState(false);
    console.log(comment.commentList)

    return (
        <CommentListItem className="comment">
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
            <CommentChildren>
                <ListComment comment={ comment }/>

            </CommentChildren>
            <CommentAddWindow>
                <RectangleButton
                    className="btn btn--medium"
                    onClick={ () => setAddComment(!addComment) }
                >
                    Add comment
                </RectangleButton>

                { ( addComment && isAuth ) &&
                    <CommentAdd parent={ `parentCommentId` } parentId={ comment.id }/>
                }
            </CommentAddWindow>
        </CommentListItem>
    )
}

const UserCommenterDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  align-items: baseline;


  margin-bottom: 1em;
  border-bottom: solid var(--box-border-medium) ${ props => props.theme.border };


`
const CommentText = styled.div`
`
const CommenterDetail = styled.div`

  line-height: 1em;

  a {
    font-weight: 700;
    text-decoration: none;

    color: var(--tertiary);
  }

  &.date {
    font-size: 0.8rem;
    color: ${ props => props.theme.sub_text };
  }

  &.commentListLength {
    span {
      font-weight: 700;
    }
  }

`
const CommentChildren = styled.div`
  padding-top: 1em;
  padding-left: 1em;

`
const CommentAddWindow = styled.div`

`

/** Created by ownwindows on 25-01-22 **/
