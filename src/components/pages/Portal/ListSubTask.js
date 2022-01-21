////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { UtilityContext } from "../../../context/UtilityProvider";
import axios from "axios";
import { H2 } from "../../shared/styling/Text";
import { UnorderedList } from "../../shared/styling/List";
import { IoCheckmarkDoneCircleSharp } from "react-icons/all";
import { AuthContext } from "../../../context/AuthProvider";
import { NavLink } from "react-router-dom";
import Tooltip from "../../shared/elements/messages/Tooltip";
import TaskItem from "./TaskItem";
import { IconBox } from "../../shared/styling/Icons";

////////////////////
//// Environmental
const { REACT_APP_API_URL } = process.env;

////////////////////
//// External

export default function ListSubTask({ subTaskList, editCount, setEditCount }) {
    const { setIsLoading } = useContext(UtilityContext);
    const { isAuth, user } = useContext(AuthContext);

    const API_URL = `${ REACT_APP_API_URL }tasks`;


    return (
        <TaskListItem>
            { subTaskList.map(subTask => {
                    return (
                        <TaskItem task={ subTask }/>

                    )
                })
            }

        </TaskListItem>
    )
}

const TaskListItem = styled.li`
  width: 70vw;
  margin-top: 1rem;

  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-direction: column;
  background: ${ props => props.theme.background };


  @media (min-width: 769px) {

  }

  @media (max-width: 660px) {
    flex-direction: column;
  }

`

const ProjectLink = styled(NavLink)`
  display: inline-block;
  margin-left: 1ch;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
  color: ${ props => props.theme.sub_text };

  max-width: 20ch;
`

const TaskFirstRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
`
export const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;


  @media screen and (min-width: 769px) {
    margin-top: 15vh;
  }
`


export const DetailRow = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.25rem 0;
  border-top: solid var(--box-border-medium) ${ props => props.theme.border };


  .light {
    font-weight: 300;
  }
`

const TaskDescription = styled.div`
  p {
    font-size: 0.8rem;
  }

  > h6 {
    color: ${ props => props.theme.text };

    span {
      max-width: 40%;
      overflow: hidden;
      color: ${ props => props.theme.sub_text };
    }
  }
`

const SubTaskListItem = styled(TaskListItem)`
  margin-top: 0.2rem;
  margin-left: 0.5rem;

`
/** Created by ownwindows on 18-01-22 **/
