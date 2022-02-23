////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import { IoIosAddCircle, IoIosRemoveCircleOutline } from "react-icons/io";
import { IoBanOutline, IoCheckmarkSharp, IoCreateOutline, IoIosSend, TiArrowBack, TiThumbsOk } from "react-icons/all";
import { useForm } from "react-hook-form";
////////////////////
//// Environmental
import { UtilityContext } from "../../../context/UtilityProvider";
import Tooltip from "../../shared/elements/messages/Tooltip";
import { FinishedBox, IconBox } from "../../../styles/Icons";
import {
    Form,
    FormEdit,
    FormEditBreak,
    FormError,
    FormInputWrap,
    FormLabel,
    FormSection
} from "../../../styles/FormStyles";
import SelectUser from "../../shared/elements/FormElements/SelectUser";
import TaskSubList from "./TaskSubList";
import TaskAdd from "./TaskAdd";
import { putTask } from "../../../services/controllers/Tasks";
import { ListItem } from "../../../styles/List";
import { TaskDescription, TaskFirstRow } from "../../../styles/Layout";


export default function TaskItem({ task, editCount, setEditCount }) {
    const utilityContext = useContext(UtilityContext);
    const [ addTask, setAddTask ] = useState(false)
    const [ isEditing, setIsEditing ] = useState(false);
    const [ editedTask, setEditedTask ] = useState(task);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (values) => {
        setIsEditing(false)
        const newTask = {
            ...task,
            taskName: values.taskName,
            endTime: values.endTime,
            description: values.description,
            taskOwnerName: values.taskOwner
        }
        putTask(utilityContext, newTask, task.taskId).then(response => setEditedTask(response.data.content))
    }

    const toggleTaskFinished = async () => {
        setIsEditing(false)
        const newTask = {
            ...task,
            isRunning: !editedTask.isRunning,
        }
        putTask(utilityContext, newTask, task.taskId).then(response => setEditedTask(response.data.content))
    }

    useEffect(() => {

    }, [ task ]);


    return (
        <ListItem className="taskItem" key={ task.taskId }>
            <TaskFirstRow>
                { isEditing ?
                    <Form className="editForm" onSubmit={ handleSubmit(onSubmit) }>
                        <FormSection>
                            <FormInputWrap>

                                <FormEditBreak>
                                    <FormEdit>
                                        <FormLabel>
                                            <label htmlFor="taskName">Task name</label>
                                            <FormError role="alert">
                                                { errors.taskName && "Enter a task name!" }
                                            </FormError>
                                        </FormLabel>
                                        <input
                                            type="text"
                                            name="taskName"
                                            id="taskName"
                                            defaultValue={ editedTask.taskName }
                                            placeholder="New task name"
                                            { ...register("taskName", {
                                                required: true
                                            }) }
                                        />
                                    </FormEdit>
                                    <FormEdit>
                                        <FormLabel>
                                            <label htmlFor="description">Description</label>
                                            <FormError role="alert">
                                                { errors.projectName && "Enter a project name!" }
                                            </FormError>
                                        </FormLabel>
                                        <input
                                            type="text"
                                            name="description"
                                            id="description"
                                            defaultValue={ editedTask.description }
                                            placeholder="New task description"
                                            { ...register("description", {
                                                required: true
                                            }) }
                                        />
                                    </FormEdit>
                                    <FormEdit>
                                        <FormLabel>
                                            <label htmlFor="endTime">Deadline</label>
                                            <FormError role="alert">
                                                { errors.endTime && "Enter a deadline!" }
                                            </FormError>
                                        </FormLabel>
                                        <input
                                            type="date"
                                            name="endTime"
                                            id="endTime"
                                            defaultValue={ editedTask.endTime }
                                            { ...register("endTime", {
                                                required: true
                                            }) }
                                        />
                                    </FormEdit>
                                    <FormEdit>
                                        <FormLabel>
                                            <label htmlFor="description">Task owner</label>
                                            <FormError role="alert">
                                                { errors.taskOwner && "Enter a project name!" }
                                            </FormError>
                                        </FormLabel>
                                        <SelectUser defaultValue={ editedTask.taskOwner.username }
                                                    register={ register }
                                                    parent="task"/>

                                    </FormEdit>
                                    <IconBox className="bottom">
                                        <Tooltip text="Submit">
                                            <IoIosSend
                                                size={ 22 }
                                                type="submit"
                                                onClick={ handleSubmit(onSubmit) }
                                            />
                                        </Tooltip>
                                        <Tooltip text="Cancel">
                                            <IoBanOutline
                                                size={ 20 }
                                                type="button"
                                                onClick={ () => setIsEditing(false) }
                                            />
                                        </Tooltip>
                                    </IconBox>
                                </FormEditBreak>

                            </FormInputWrap>
                        </FormSection>
                    </Form>
                    :
                    <>

                        <TaskDescription>
                            { !editedTask.isRunning &&
                                <FinishedBox>
                                    <Tooltip text="Finished">
                                        <TiThumbsOk
                                            size={ 15 }
                                        />
                                    </Tooltip>
                                </FinishedBox>

                            }
                            <h6>

                                <span>
                                    { editedTask.endTime }</span> { editedTask.taskName } </h6>
                            <p> { editedTask.description } </p>
                        </TaskDescription>
                        <IconBox className="small">
                            <IconBox>
                                { addTask &&

                                    <Tooltip text="Delete">
                                        <IoIosRemoveCircleOutline
                                            size={ 25 }
                                            type="button"
                                            onClick={ () => setAddTask(false) }
                                        />
                                    </Tooltip>
                                }
                                { !addTask &&
                                    <Tooltip text="Add">
                                        <IoIosAddCircle
                                            size={ 25 }
                                            type="button"
                                            onClick={ () => setAddTask(true) }

                                        />
                                    </Tooltip>
                                }

                            </IconBox>
                            { editedTask.isRunning &&
                                <Tooltip text="Edit">
                                    <IoCreateOutline
                                        size={ 20 }
                                        onClick={ () => setIsEditing(true) }
                                        type="button"
                                    />
                                </Tooltip>
                            }
                            { editedTask.isRunning ?
                                <Tooltip text="Done">
                                    <IoCheckmarkSharp
                                        size={ 20 }
                                        type="button"
                                        onClick={ () => toggleTaskFinished() }
                                    />
                                </Tooltip>
                                :
                                <Tooltip text="Done">
                                    <TiArrowBack
                                        size={ 20 }
                                        type="button"
                                        onClick={ () => toggleTaskFinished() }
                                    />
                                </Tooltip>
                            }
                        </IconBox>
                        { addTask &&
                            <TaskAdd setAddTask={ setAddTask } editCount={ editCount } setEditCount={ setEditCount }
                                     parentTask={ task.taskId }/>
                        }

                        <TaskSubList editCount={ editCount } setEditCount={ setEditCount }
                                     subTaskList={ editedTask.taskTaskList }/>
                    </>
                }
            </TaskFirstRow>
        </ListItem>
    )
}


/** Created by ownwindows on 18-01-22 **/
