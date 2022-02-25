////////////////////
//// Build
import React, { useEffect } from 'react'
////////////////////
//// Environmental
import TaskItem from "./TaskItem";
import { TaskListItem } from "../../../styles/List";

export default function TaskSubList({ subTaskList, editCount, setEditCount }) {

    useEffect(() => {

    }, [ subTaskList ]);

    return (
        <TaskListItem>
            { subTaskList.map((subTask, index) => {
                return (
                    <TaskItem key={ index } editCount={ editCount } setEditCount={ setEditCount } task={ subTask }/>

                )
            })
            }

        </TaskListItem>
    )
}


/** Created by ownwindows on 18-01-22 **/
