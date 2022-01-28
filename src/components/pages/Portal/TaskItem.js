////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { UtilityContext } from "../../../context/UtilityProvider";
import { AuthContext } from "../../../context/AuthProvider";
import Tooltip from "../../shared/elements/old/Tooltip";
import { IoBanOutline, IoCheckmarkSharp, IoCreateOutline, IoIosSend, TiArrowBack, TiThumbsOk } from "react-icons/all";
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
import SelectUser from "../../shared/elements/FormElements/SelectUser";
import TaskSubList from "./TaskSubList";
import AddTask from "./AddTask";
import { IoIosAddCircle, IoIosRemoveCircleOutline } from "react-icons/io";
import { putTask } from "../../../services/controllers/Tasks";

////////////////////
//// Environmental
const { REACT_APP_API_URL } = process.env;

////////////////////
//// External

export default function TaskItem({ task, editCount, setEditCount }) {
    const { setIsLoading } = useContext(UtilityContext);
    const { isAuth, user } = useContext(AuthContext);
    const [addTask ,setAddTask] = useState(false)
    const [ isEditing, setIsEditing ] = useState(false);
    const [ isFinished, setIsFinished ] = useState(false);
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
        const newTask = {
            ...task,
            taskName: values.taskName,
            endTime: values.endTime,
            description: values.description,
            taskOwnerName: values.taskOwner
        }
        const response = await putTask(newTask, task.taskId)
        setEditedTask(newTask)
        setEditCount(editCount +1)
        setIsLoading(false)
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
    }

    useEffect(() => {
        console.log(task)

    }, [ task ]);


    return (
        <ListItem key={ task.taskId }>
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
                                            onClick={ () => setAddTask(false)}
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
                        {addTask &&
                            <AddTask setAddTask={setAddTask} editCount={editCount} setEditCount={setEditCount} parentTask={task.taskId}/>
                        }

                        <TaskSubList editCount={editCount} setEditCount={setEditCount} subTaskList={ editedTask.taskTaskList }/>
                    </>
                }
            </TaskFirstRow>
        </ListItem>
    )
}


const ListItem = styled.li`
  width: 70vw;
  margin-top: 0.2rem;
  margin-left: 0.5rem;
  padding-right: 0.5rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-direction: column;
  background: ${ props => props.theme.background };


  @media (max-width: 660px) {
    flex-direction: column;
  }

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
  position: relative;
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
/** Created by ownwindows on 18-01-22 **/
