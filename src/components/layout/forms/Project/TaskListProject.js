////////////////////
//// Build
import React, { useState } from "react";
import { useFieldArray } from "react-hook-form";
import styled from 'styled-components';
////////////////////
//// Environmental
import RectangleButton from "../../../shared/elements/clickables/RectangleButton/RectangleButton";
import Tooltip from "../../../shared/elements/messages/Tooltip";
import { IoIosAddCircle, IoIosRemoveCircleOutline } from "react-icons/io";
import InputField from "../../../shared/elements/FormElements/InputField";
import { ListItem, TaskList } from "../../../shared/elements/List";
import { Row } from "../../../shared/elements/Layout";
import { ButtonBox } from "../../../shared/elements/Form";
import NestedArray from "./TaskListTask";
import { ErrorMessage } from "../../../shared/elements/Text";
import {
    FormBreak,
    FormError,
    FormInput,
    FormInputWrap,
    FormLabel,
    FormSection,
    FormSectionHeading, SubFormHeading
} from "../../../shared/elements/FormStyles";
import SelectUser from "../../../shared/elements/FormElements/SelectUser";
import SelectCategory from "../../../shared/elements/FormElements/SelectCategory";

let renderCount = 0;

export default function Fields({ control, register, setValue, getValues, errors, listName }) {
    const [ taskOwner, setTaskOwner ] = useState();
    const { fields, append, remove, prepend } = useFieldArray({
        control,
        name: "projectTaskList"
    });

    console.log(errors)

    return (
        <FormSection>
            <FormSectionHeading>Project tasks</FormSectionHeading>

            { fields.map((item, index) => {
                console.log(item)
                return (
                    <FormInputWrap key={ item.id }>
                        <SubFormHeading>Task {index+1}</SubFormHeading>
                        <FormBreak>
                            <FormInput>
                                <FormLabel>
                                    <label htmlFor="taskName">Task name</label>
                                    <FormError role="alert">
                                        {errors?.projectTaskList?.[index]?.taskName && "Enter a task name!"}
                                    </FormError>
                                </FormLabel>
                                <input
                                    type="text"
                                    name="taskName"
                                    id="taskName"
                                    placeholder="Assign a task"
                                    {...register(`projectTaskList[${ index }].taskName`, {
                                        required: true})}
                                />
                            </FormInput>
                        </FormBreak>
                        <FormBreak>
                            <FormInput>
                                <FormLabel>
                                    <label htmlFor="deadline">Deadline</label>
                                    <FormError role="alert">
                                        {errors?.projectTaskList?.[index]?.endTime && "Please set a deadline!"}
                                    </FormError>
                                </FormLabel>
                                <input
                                    type="date"
                                    name="endTIme"
                                    id="endTime"
                                    {...register(`projectTaskList[${ index }].endTime`, {
                                        required: true})}
                                />
                            </FormInput>

                        </FormBreak>
                        <FormBreak>
                            <FormInput>
                                <FormLabel>
                                    <label htmlFor="description">Description</label>
                                    <FormError role="alert">
                                        {errors?.projectTaskList?.[index]?.description && "Please describe your task!"}
                                    </FormError>
                                </FormLabel>
                                <textarea
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Describe how to complete this task"
                                    {...register(`projectTaskList[${ index }].description`, {
                                        required: true})}
                                />
                            </FormInput>
                        </FormBreak>
                        <FormBreak>

                            <FormInput>
                                <SelectUser location={`projectTaskList[${ index }]`} user={taskOwner} setUser={setTaskOwner}/>

                            </FormInput>
                        </FormBreak>

                        <IconBox>
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


                    </FormInputWrap>
                );
            }) }
        </FormSection>
    );
}
const IconBox = styled.div`
  align-self: center;
`

