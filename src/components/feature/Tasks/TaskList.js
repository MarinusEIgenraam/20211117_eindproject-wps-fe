////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
////////////////////
//// Environmental
import { UtilityContext } from "../../../context/UtilityProvider";
import { CenteredSubHeader, HeaderBar } from "../../../styles/Typography";
import { TaskListItem, UnsortedList } from "../../../styles/List";
import { AuthContext } from "../../../context/AuthProvider";
import TaskItem from "./TaskItem";
import TaskParentItem from "./TaskParentItem";
import { getTasksFor } from "../../../services/controllers/Tasks";
import { Container } from "../../../styles/Layout";
import {
    AiFillProject,
    AiOutlineFundProjectionScreen,
    AiOutlineProject,
    FaProjectDiagram,
    IoBanOutline
} from "react-icons/all";

export default function TaskList({ editCount, setEditCount }) {
    const { setHasError, setIsLoading, setCreationCount, creationCount } = useContext(UtilityContext);
    const { isAuth, user } = useContext(AuthContext);
    const [ categoryUri, setCategoryUri ] = useState('');

    const [ loadedTasks, setLoadedTasks ] = useState();
    const [ projectCategory, setProjectCategory ] = useState('');


    useEffect(() => {
        const source = axios.CancelToken.source();
        const token = localStorage.getItem('token');

        const getData = async () => {
            const tasks = await getTasksFor(utilityContext, token, user)
            setLoadedTasks(tasks)
        }

        getData()

        return function clearData() {
            source.cancel();
        };

    }, [ creationCount ]);

    const calculateTasks = (tasks) => {
        let taskNumber = tasks.length;

        tasks.forEach(task => {
            taskNumber += calculateTasks(task.taskTaskList);
        })
        return taskNumber;
    };


    return (
        <>
            { (loadedTasks && loadedTasks.length  > 0) &&
                <Container>
                    <HeaderBar>
                        <h3>
                            Tasks
                        </h3>
                        <div>

                            {loadedTasks.length} <AiFillProject size={ 20 }/> {calculateTasks(loadedTasks)-loadedTasks.length} <AiOutlineProject size={ 20 }/>
                        </div>
                    </HeaderBar>


                    <UnsortedList>
                        { loadedTasks.map((task, index) => {
                            return (
                                <TaskListItem key={ index }>
                                    <TaskParentItem editCount={ editCount } setEditCount={ setEditCount }
                                                    task={ task }/>
                                    <h6>Sub tasks</h6>
                                    <UnsortedList>

                                        { task.taskTaskList &&
                                            task.taskTaskList.map((subTask, index) => {
                                                return (
                                                    <TaskItem key={ index } editCount={ editCount }
                                                              setEditCount={ setEditCount }
                                                              task={ subTask }/>

                                                )
                                            })
                                        }
                                    </UnsortedList>

                                </TaskListItem>
                            )
                        }) }
                    </UnsortedList>
                </Container>
            }
        </>
    )
}


/** Created by ownwindows on 18-01-22 **/
