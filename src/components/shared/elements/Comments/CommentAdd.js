////////////////////
//// Build
import React, { useContext } from 'react'
import { Form, FormEdit, FormEditBreak, FormError, FormLabel, FormSection } from "../../../../styles/FormStyles";
import { IconBox } from "../../../../styles/Icons";
import Tooltip from "../messages/Tooltip";
import { IoIosSend } from "react-icons/all";
import { useForm } from "react-hook-form";
import { UtilityContext } from "../../../../context/UtilityProvider";
import { postComment } from "../../../../services/controllers/Comments";

////////////////////
//// Environmental

////////////////////
//// External

export default function CommentAdd ({ parent, parentId }) {
    const utilityContext = useContext(UtilityContext);


    const { register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit = (values) => {
        const request = {
            ...values,
            ...((parent === "parentProjectId") &&  { parentProjectId: parentId }),
            ...((parent === "parentBlogId") &&  { parentBlogId: parentId }),
            ...((parent === "parentCommentId") &&  { parentCommentId: parentId })
        }
        return postComment(utilityContext, request)
    }

    return (
        <Form id="comment" className="editForm comment" onSubmit={ handleSubmit(onSubmit) }>
            <FormSection className="comment">
                <FormEditBreak>
                    <FormEdit>
                        <FormLabel>
                            <FormError role="alert">
                                { errors.taskName && "Enter a comment!" }
                            </FormError>
                        </FormLabel>
                        <textarea
                            className="comment"
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
