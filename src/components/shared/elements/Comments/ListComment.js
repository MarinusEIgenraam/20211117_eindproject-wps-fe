////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';
import Comment from "./Comment";
import { OrderedList } from "../../../../styles/List";

////////////////////
//// Environmental

////////////////////
//// External

export default function ListComment({ comment }) {

    return (
        <CommentList>
            { comment.commentList &&
                comment.commentList.map((subComment) =>
                    (
                        <Comment comment={ subComment }/>
                    ))
            }
        </CommentList>
    )
}

const CommentList = styled(OrderedList)`

`

/** Created by ownwindows on 25-01-22 **/
