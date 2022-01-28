////////////////////
//// Build
import React, { useState } from 'react'
import styled from 'styled-components';
import { Container } from "../../shared/styling/Layout";
import Comment from "./Comment";
import { SL } from "../../shared/styling/List";

////////////////////
//// Environmental

////////////////////
//// External

export default function ListComment({comment}) {

    return (
        <CommentList>
            {comment.commentList &&
                comment.commentList.map((subComment) =>
                    (
                        <Comment comment={ subComment }/>
                    ))
            }
        </CommentList>
    )
}

const CommentList = styled(SL)`

`

/** Created by ownwindows on 25-01-22 **/
