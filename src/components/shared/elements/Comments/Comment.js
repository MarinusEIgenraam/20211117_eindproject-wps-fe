////////////////////
//// Build
import React, { useContext, useState } from 'react'
import ListComment from "./ListComment";
import { CommentListItem } from "../../../../styles/List";
import { NavLink } from "react-router-dom";
import { DetailContainer } from "../../../../styles/Typography";
import { DetailRow } from "../../../../styles/Layout";
import { AuthContext } from "../../../../context/AuthProvider";
import CommentAdd from "./CommentAdd";
import RectangleButton from "../clickables/RectangleButton";

////////////////////
//// Environmental

////////////////////
//// External

export default function Comment({ comment }) {
    const { isAuth, user } = useContext(AuthContext);
    const [ addComment, setAddComment ] = useState(false);
    const [ children, showChildren ] = useState(false);

    return (
        <CommentListItem>
            <DetailContainer>
                { comment.text }
                <DetailRow className="users">
                    <span>{ comment.startTime }</span><NavLink
                    to={ `/users/${ comment.user.username }` }>{ comment.user.username }</NavLink>
                    { comment.commentList.length > 0 &&
                        <button onClick={ () => showChildren(!children) }>show children</button>
                    }
                </DetailRow>
            </DetailContainer>
            <RectangleButton
                className="btn btn--medium"
                onClick={ () => setAddComment(!addComment) }
            >
                Add comment
            </RectangleButton>
            { (  addComment && isAuth ) &&
                <CommentAdd parent={ `parentCommentId` } parentId={ comment.id }/>
            }

            { children &&
                <ListComment comment={ comment }/>
            }
        </CommentListItem>
    )
}


/** Created by ownwindows on 25-01-22 **/
