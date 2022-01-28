////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
////////////////////
//// Environmental
import { UtilityContext } from "../../../context/UtilityProvider";
import { CenteredSubHeader } from "../../../styles/Typography";
import { TaskListItem, UnsortedList } from "../../../styles/List";
import { AuthContext } from "../../../context/AuthProvider";
import TaskItem from "./TaskItem";
import TaskParentItem from "./TaskParentItem";
import { getTasksFor } from "../../../services/controllers/Tasks";
import { Container } from "../../../styles/Layout";

export default function TaskList({ editCount, setEditCount }) {
    const { setIsLoading } = useContext(UtilityContext);
    const { isAuth, user } = useContext(AuthContext);
    const [ hasError, setHasError ] = useState(false);
    const [ categoryUri, setCategoryUri ] = useState('');

    const [ loadedTasks, setLoadedTasks ] = useState();
    const [ projectCategory, setProjectCategory ] = useState('');


    useEffect(() => {
        const source = axios.CancelToken.source();
        const token = localStorage.getItem('token');

        const getData = async () => {
            setHasError(false);
            setIsLoading(true)
            const tasks = await getTasksFor(setIsLoading, setHasError, token, user)
            setLoadedTasks(tasks)
            setIsLoading(false)
        }

        getData()

        return function clearData() {
            source.cancel();
        };

    }, [ editCount ]);


    return (
        <Container>
            <CenteredSubHeader>
                Your tasks
            </CenteredSubHeader>


            <UnsortedList>
                { loadedTasks && loadedTasks.map((task, index) => {
                    return (
                        <TaskListItem key={ index }>
                            <TaskParentItem editCount={ editCount } setEditCount={ setEditCount } task={ task }/>
                            <h6>Sub tasks</h6>
                            { task.taskTaskList &&
                                task.taskTaskList.map((subTask, index) => {
                                    return (
                                        <TaskItem key={ index } editCount={ editCount } setEditCount={ setEditCount }
                                                  task={ subTask }/>

                                    )
                                })
                            }

                        </TaskListItem>
                    )
                }) }
            </UnsortedList>
        </Container>
    )
}


/** Created by ownwindows on 18-01-22 **/
