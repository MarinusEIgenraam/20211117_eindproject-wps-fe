////////////////////
//// Build
import React, { useState } from 'react'
import styled from 'styled-components';
import ListComment from "./ListComment";
import { ListItem } from "../../../../styles/List";
import { NavLink } from "react-router-dom";

////////////////////
//// Environmental

////////////////////
//// External

export default function Comment({ comment }) {
    const [ children, showChildren ] = useState(false);

    return (
        <CommentItem>
            { comment.text }
            <footer>
                <span>{ comment.startTime }</span><NavLink
                to={ `/users/${ comment.user.username }` }>{ comment.user.username }</NavLink>
                { comment.commentList.length > 0 &&
                    <button onClick={ () => showChildren(!children) }>show children</button>
                }
            </footer>

            { children &&
                <ListComment comment={ comment }/>
            }
        </CommentItem>
    )
}

const CommentItem = styled(ListItem)`
  justify-content: start;
  align-items: start;

  & footer {
    display: flex;
    text-align: start;
  }

`

/** Created by ownwindows on 25-01-22 **/
