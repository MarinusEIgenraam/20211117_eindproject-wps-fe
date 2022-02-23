////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
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
import { DetailRow, TaskDescription, TaskFirstRow } from "../../../styles/Layout";
import { ProjectLink } from "../../../styles/Navigation";
import { TaskListItem } from "../../../styles/List";
import { putTask } from "../../../services/controllers/Tasks";


export default function TaskParentItem({ task }) {
    const utilityContext = useContext(UtilityContext);
    const [ isEditing, setIsEditing ] = useState(false);
    const [ editedTask, setEditedTask ] = useState(task);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (values) => {
        const newTask = {
            ...task,
            taskName: values.taskName,
            endTime: values.endTime,
            description: values.description,
            taskOwnerName: values.taskOwner

        }

        putTask(utilityContext, newTask, task.taskId).then(response => setEditedTask(response.data))
    }

    const toggleTaskFinished = async () => {
        setIsEditing(false)
        const newTask = {
            ...task,
            isRunning: !editedTask.isRunning,
        }
        putTask(utilityContext, newTask, task.taskId).then(response => setEditedTask(response.data))
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
                                            <label htmlFor="taskOwner">Task owner</label>
                                            <FormError role="alert">
                                                { errors.taskOwner && "Assign a task owner!" }
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
