////////////////////
//// Build
import React from "react";
import { useFieldArray } from "react-hook-form";
////////////////////
//// Environmental
import Tooltip from "../../shared/elements/messages/Tooltip";
import { IoIosAddCircle, IoIosRemoveCircleOutline } from "react-icons/io";
import {
    FormBreak,
    FormError,
    FormInput,
    FormInputWrap,
    FormLabel,
    FormSection,
} from "../../../styles/FormStyles";
import SelectUser from "../../shared/elements/FormElements/SelectUser";
import { IconBox } from "../../../styles/Icons";
import { FormSectionHeading, SubFormHeading } from "../../../styles/Typography";
import styled from "styled-components";
import { QUERIES } from "../../../services/helpers/mediaQueries";


export default function Fields({ control, register, errors }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "projectTaskList"
    });


    return (
        <FormSection>
            <FormSectionHeading>Project tasks</FormSectionHeading>

            { fields.map((item, index) => {
                return (
                    <FormInputWrap key={ item.id }>
                        <SubFormHeading>Task { index + 1 }</SubFormHeading>
                        <FormField>
                            <IconBox area="buttons" className="center">
                                <Tooltip text="Add">
                                    <IoIosAddCircle
                                        size={ 25 }
                                        type="button"
                                        onClick={ () =>
                                            append({
                                                taskName: "",
                                                description: ""
                                            })
                                        }/>
                                </Tooltip>
                                <Tooltip text="Delete">
                                    <IoIosRemoveCircleOutline
                                        size={ 25 }
                                        type="button"
                                        onClick={ () => remove(index) }
                                    />
                                </Tooltip>
                            </IconBox>
                            <FormInput area="name">
                                <FormLabel>
                                    <label htmlFor="taskName">Task name</label>
                                    <FormError role="alert">
                                        { errors?.projectTaskList?.[index]?.taskName && "Enter a task name!" }
                                    </FormError>
                                </FormLabel>
                                <input
                                    type="text"
                                    name="taskName"
                                    id="taskName"
                                    placeholder="Assign a task"
                                    { ...register(`projectTaskList[${ index }].taskName`, {
                                        required: true
                                    }) }
                                />
                            </FormInput>
                            <FormInput area="deadline">
                                <FormLabel>
                                    <label htmlFor="deadline">Deadline</label>
                                    <FormError role="alert">
                                        { errors?.projectTaskList?.[index]?.endTime && "Please set a deadline!" }
                                    </FormError>
                                </FormLabel>
                                <input
                                    type="date"
                                    name="endTime"
                                    id="endTime"
                                    { ...register(`projectTaskList[${ index }].endTime`, {
                                        required: true
                                    }) }
                                />
                            </FormInput>
                            <FormInput area="description">
                                <FormLabel>
                                    <label htmlFor="description">Description</label>
                                    <FormError role="alert">
                                        { errors?.projectTaskList?.[index]?.description && "Please describe your task!" }
                                    </FormError>
                                </FormLabel>
                                <textarea
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Describe how to complete this task"
                                    { ...register(`projectTaskList[${ index }].description`, {
                                        required: true
                                    }) }
                                />
                            </FormInput>
                            <FormBreak area="taskOwner">

                                <FormLabel>
                                    <label htmlFor="taskOwner">Task owner</label>
                                    <FormError role="alert">
                                        { errors.taskOwner && "Select a task owner!" }
                                    </FormError>
                                </FormLabel>
                                <SelectUser
                                    defaultValue={ "Task owner" }
                                    register={ register }
                                    parent={ `projectTaskList[${ index }].task` }
                                />

                            </FormBreak>
                        </FormField>




                    </FormInputWrap>
                );
            }) }
        </FormSection>
    );
}

const FormField = styled.section`
  display: grid;
  grid-column-gap: 0;
  grid-template-columns: 1fr;
  grid-template-areas:
      "name"
      "taskOwner"
      "deadline"
      "description"
  "buttons"
;
  @media ${ QUERIES.tablet } {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
    grid-template-areas:
      "name name"
      "deadline taskOwner"
      "description description"
      "buttons buttons"
  ;
  }
`
/** Created by ownwindows on 15-01-22 **/
