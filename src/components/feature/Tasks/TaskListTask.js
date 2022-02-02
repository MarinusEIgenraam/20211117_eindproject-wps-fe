////////////////////
//// Build
import React from "react";
import { useFieldArray } from "react-hook-form";
import { IoIosAddCircle, IoIosRemoveCircleOutline } from "react-icons/io";
////////////////////
//// Environmental
import Tooltip from "../../shared/elements/messages/Tooltip";
import {
    FormBreak,
    FormError,
    FormInput,
    FormInputWrap,
    FormLabel,
    FormSection,
} from "../../../styles/FormStyles";
import { IconBox } from "../../../styles/Icons";
import { SubFormHeading } from "../../../styles/Typography";

export default ({ nestIndex, control, register, errors }) => {
    const { fields, remove, append } = useFieldArray({
        control,
        name: `projectTaskList[${ nestIndex }].subTaskList`
    });
    return (
        <FormSection>
            { fields.map((item, subIndex) => {
                return (
                    <FormInputWrap key={ item.id } style={ { marginLeft: 20 } }>
                        <SubFormHeading>Sub task { subIndex + 1 }</SubFormHeading>
                        <FormBreak>
                            <FormInput>
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
                                    placeholder="Assign a task"
                                    { ...register(`projectTaskList[${ nestIndex }].subTaskList[${ subIndex }].taskName`) }
                                />
                            </FormInput>
                        </FormBreak>
                        <FormBreak>
                            <FormInput>
                                <FormLabel>
                                    <label htmlFor="deadline">Deadline</label>
                                    <FormError role="alert">
                                        { errors.endTime && "Please set a date!" }
                                    </FormError>
                                </FormLabel>
                                <input
                                    type="date"
                                    name="endTIme"
                                    id="endTime"
                                    { ...register(`projectTaskList[${ nestIndex }].subTaskList[${ subIndex }].endTime`) }
                                />
                            </FormInput>

                        </FormBreak>
                        <FormBreak>
                            <FormInput>
                                <FormLabel>
                                    <label htmlFor="description">Description</label>
                                    <FormError role="alert">
                                        { errors.email && "Please describe your task!" }
                                    </FormError>
                                </FormLabel>
                                <textarea
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Describe how to complete this task"
                                    { ...register(`projectTaskList[${ nestIndex }].subTaskList[${ subIndex }].description`) }
                                />
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
                                    onClick={ () => remove(subIndex) }
                                />
                            </Tooltip>
                        </IconBox>

                    </FormInputWrap>
                );
            }) }


        </FormSection>
    );
};




