////////////////////
//// Build
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import Tooltip from "../../shared/elements/old/Tooltip";
import { Form, FormEdit, FormEditBreak, FormError, FormLabel, FormSection } from "../../shared/styling/FormStyles";
import { UtilityContext } from "../../../context/UtilityProvider";
import { IconBox } from "../../shared/styling/Icons";
import { AuthContext } from "../../../context/AuthProvider";
import SelectUser from "../../shared/elements/FormElements/SelectUser";
import { IoIosSend } from "react-icons/all";
import { postTask } from "../../../services/controllers/Tasks";

////////////////////
//// Environmental

const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;

////////////////////
//// External

export default function AddTask({parentTask, editCount, setEditCount}) {
    const [ projectCategory, setProjectCategory ] = useState('');
    const { hasError, setHasError, setIsLoading } = useContext(UtilityContext);
    const { isAuth, user } = useContext(AuthContext);
    const [ error, toggleError ] = useState(false);
    const [ taskOwner, setTaskOwner ] = useState(user.username)

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
        setIsLoading(true)
        console.log(parentTask)
        console.log(values);
        const request = {
            ...values,
            parentTaskId: parentTask,
        }
        const response = await postTask(request)
        setEditCount(editCount+1)
        console.log(response)
    }


    return (
        <Form id="taskCreation" className="editForm" onSubmit={handleSubmit(onSubmit)}>
            <FormSection>
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
                        <SelectUser
                            defaultValue={ user.username }
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
                    </IconBox>
                </FormEditBreak>

            </FormSection>
        </Form>
    );
}

/** Created by ownwindows on 10-01-22 **/
