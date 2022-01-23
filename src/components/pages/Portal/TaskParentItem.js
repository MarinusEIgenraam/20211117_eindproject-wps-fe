////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { UtilityContext } from "../../../context/UtilityProvider";
import { AuthContext } from "../../../context/AuthProvider";
import Tooltip from "../../shared/elements/messages/Tooltip";
import {
    IoBanOutline,
    IoCheckmarkCircleOutline,
    IoCheckmarkSharp,
    IoCreateOutline,
    IoIosSend, TiArrowBack,
    TiThumbsOk
} from "react-icons/all";
import { FinishedBox, IconBox } from "../../shared/styling/Icons";
import {
    Form,
    FormEdit,
    FormEditBreak,
    FormError,
    FormInputWrap,
    FormLabel,
    FormSection
} from "../../shared/styling/FormStyles";
import { useForm } from "react-hook-form";
import SelectUsers from "../../shared/elements/select/SelectUsers";
import { postProject, putTask, uploadImage } from "../../../services/controllers/requests";
import TaskSubList from "./TaskSubList";
import { DetailRow } from "./ListBlog";
import { TaskDescription, TaskFirstRow } from "../../shared/styling/Layout";
import { ProjectLink } from "../../shared/styling/Navigation";
import { TaskListItem } from "../../shared/styling/List";

////////////////////
//// Environmental
const { REACT_APP_API_URL } = process.env;

////////////////////
//// External

export default function TaskParentItem({ task, editCount ,setEditCount }) {
    const { setIsLoading } = useContext(UtilityContext);
    const [ isEditing, setIsEditing ] = useState(false);
    const [ editedTask, setEditedTask ] = useState(task);
    const {
        control,
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
        setValue
    } = useForm();

    const onSubmit = async (values) => {
        setIsEditing(false)
        setIsLoading(true)
        console.log(values.taskOwner)
        const newTask = {
            ...task,
            taskName: values.taskName,
            endTime: values.endTime,
            description: values.description,
            taskOwnerName: values.taskOwner

        }
        console.log(newTask);
        const response = await putTask(newTask, task.taskId)
        setEditedTask(newTask)
        console.log(response)
        setIsLoading(false)
        setEditCount(editCount +1)
    }

    const toggleTaskFinished = async () => {
        setIsEditing(false)
        setIsLoading(true)
        const newTask = {
            ...task,
            isRunning: !editedTask.isRunning,
        }
        const response = await putTask(newTask, task.taskId)
        setEditedTask(newTask)
        setIsLoading(false)
        setEditCount(editCount +1)
        console.log(editedTask)
    }


    useEffect(() => {

    }, [ task ]);


    return (
        <TaskListItem key={ editedTask.taskId }>
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
                                        <SelectUsers defaultValue={ editedTask.taskOwner.username }
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
                        { !editedTask.isRunning &&
                            <FinishedBox>
                                <Tooltip text="Finished">
                                    <TiThumbsOk
                                        size={ 15 }
                                    />
                                </Tooltip>
                            </FinishedBox>

                        }
                        <TaskDescription>
                            <h6> { editedTask.taskName }
                                { editedTask.parentProject &&
                                    <ProjectLink
                                        to={ `/${ editedTask.parentProject.projectId }` }> { editedTask.parentProject.projectName } </ProjectLink> }
                                { editedTask.parentTask &&
                                    <span>{ editedTask.parentTask.taskName } </span> }</h6>
                            <p> { editedTask.endTime } { editedTask.description } </p>
                        </TaskDescription>
                        <IconBox className="small">
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
                    </>
                }
            </TaskFirstRow>

            <DetailRow>
                <h6>{ editedTask.startTime } <span className="light">| { editedTask.taskOwner.username } </span>
                </h6>
            </DetailRow>
        </TaskListItem>
    )
}


/** Created by ownwindows on 18-01-22 **/
