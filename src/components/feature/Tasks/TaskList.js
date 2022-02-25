////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
////////////////////
//// Environmental
import { UtilityContext } from "../../../context/UtilityProvider";
import { HeaderBar } from "../../../styles/Typography";
import { TaskListItem, UnsortedList } from "../../../styles/List";
import { AuthContext } from "../../../context/AuthProvider";
import TaskItem from "./TaskItem";
import TaskParentItem from "./TaskParentItem";
import { getTasksFor } from "../../../services/controllers/Tasks";
import { Container } from "../../../styles/Layout";
import { AiFillProject, AiOutlineProject } from "react-icons/all";

export default function TaskList({ editCount, setEditCount }) {
    const utilityContext = useContext(UtilityContext);
    const { user } = useContext(AuthContext);
    const [ pageable, setPageable ] = useState('');
    const [ loadedTasks, setLoadedTasks ] = useState({});


    useEffect(() => {
        const source = axios.CancelToken.source();

        getTasksFor(utilityContext, pageable, user).then(response => setLoadedTasks(response.data.content))

        return function clearData() {
            source.cancel();
        };

    }, [ utilityContext.creationCount ]);

    const calculateTasks = (tasks) => {
        let taskNumber = tasks.length;

        tasks.forEach(task => {
            taskNumber += calculateTasks(task.taskTaskList);
        })
        return taskNumber;
    };


    return (
        <>
            { ( loadedTasks && loadedTasks.length > 0 ) &&
                <Container>
                    <HeaderBar>
                        <h3>
                            Tasks
                        </h3>
                        <div>

                            { loadedTasks.length } <AiFillProject
                            size={ 20 }/> { calculateTasks(loadedTasks) - loadedTasks.length } <AiOutlineProject
                            size={ 20 }/>
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
