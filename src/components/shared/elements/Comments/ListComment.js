////////////////////
//// Build
import React, { useContext, useEffect } from 'react'
import styled from 'styled-components';
import Comment from "./Comment";
import { OrderedList } from "../../../../styles/List";
import { UtilityContext } from "../../../../context/UtilityProvider";

////////////////////
//// Environmental

////////////////////
//// External

export default function ListComment({ comment }) {
    const utilityContext = useContext(UtilityContext);


    useEffect(() => {
    }, [comment, utilityContext.creationCount]);


    return (
        <CommentList>
            { comment.commentList &&
                comment.commentList.map((subComment, index) =>
                    (
                        <Comment key={index} comment={ subComment }/>
                    ))
            }
        </CommentList>
    )
}

const CommentList = styled(OrderedList)`
    
    &:not(:hover){
      & > *{
        //
        //text-shadow: 0 0 12px black;
        //color: transparent;
      }
    }

`

/** Created by ownwindows on 25-01-22 **/
