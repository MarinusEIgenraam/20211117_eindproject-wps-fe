////////////////////
//// Build
import React, { useContext } from 'react'
import { useForm } from "react-hook-form";
import { IoIosSend } from "react-icons/all";
////////////////////
//// Environmental
import Tooltip from "../../shared/elements/messages/Tooltip";
import { Form, FormEdit, FormEditBreak, FormError, FormLabel, FormSection } from "../../../styles/FormStyles";
import { UtilityContext } from "../../../context/UtilityProvider";
import { IconBox } from "../../../styles/Icons";
import { AuthContext } from "../../../context/AuthProvider";
import SelectUser from "../../shared/elements/FormElements/SelectUser";
import { postTask } from "../../../services/controllers/Tasks";

export default function TaskAdd({ parentTask }) {
    const utilityContext = useContext(UtilityContext);
    const { user } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (values) => {
        const request = {
            ...values,
            parentTaskId: parentTask,
        }
        postTask(utilityContext, request).then(r => {})
    }

    return (
        <Form id="taskCreation" className="editForm" onSubmit={ handleSubmit(onSubmit) }>
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
