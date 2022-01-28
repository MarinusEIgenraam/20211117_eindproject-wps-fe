////////////////////
//// Build
import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import ListComment from "./ListComment";
import { CommentListItem, ListItem } from "../../../../styles/List";
import { NavLink } from "react-router-dom";
import { Details } from "../../../../styles/TextLayout";
import { DetailContainer, Owner, User } from "../../../../styles/Typography";
import { ProjectCardLink } from "../../../../styles/Navigation";
import { DetailRow } from "../../../../styles/Layout";
import { Form, FormEdit, FormEditBreak, FormError, FormLabel, FormSection } from "../../../../styles/FormStyles";
import SelectUser from "../FormElements/SelectUser";
import { IconBox } from "../../../../styles/Icons";
import Tooltip from "../messages/Tooltip";
import { IoIosSend } from "react-icons/all";
import { useForm } from "react-hook-form";
import { postTask } from "../../../../services/controllers/Tasks";
import { UtilityContext } from "../../../../context/UtilityProvider";
import { AuthContext } from "../../../../context/AuthProvider";
import { postComment } from "../../../../services/controllers/Comments";

////////////////////
//// Environmental

////////////////////
//// External

export default function CommentAdd ({ parent, parentId }) {
    const { setHasError, setIsLoading } = useContext(UtilityContext);
    const { isAuth, user } = useContext(AuthContext);
    const [addComment, setAddComment] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (values) => {
        const request = {
            ...values,
            parent: parentId,
        }

        const response = await postComment(setIsLoading, setHasError, request)
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
                        <textarea
                            name="text"
                            id="text"
                            placeholder="Tell us something new"
                            { ...register("text", {
                                required: true
                            }) }
                        />
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
    )
}



/** Created by ownwindows on 25-01-22 **/
