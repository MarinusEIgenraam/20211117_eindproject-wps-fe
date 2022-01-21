////////////////////
//// Build
import React from "react";
import styled from 'styled-components';
import { useFieldArray } from "react-hook-form";
////////////////////
//// Environmental
import Tooltip from "../../../shared/elements/messages/Tooltip";
import { IoIosAddCircle, IoIosRemoveCircleOutline } from "react-icons/io";
import { Input, InputDate, InputLabel } from "../../../shared/styling/Input";
import { Row, SubRow, SubRowList } from "../../../shared/styling/Layout";
import { ListItem } from "../../../shared/styling/List";
import { FormBreak, FormError, FormInput, FormInputWrap, FormLabel, FormSection, SubFormHeading } from "../../../shared/styling/FormStyles";

export default ({ nestIndex, control, register, errors }) => {
    const { fields, remove, append } = useFieldArray({
        control,
        name: `projectTaskList[${ nestIndex }].subTaskList`
    });
    console.log()
    return (
        <FormSection>
            { fields.map((item, subIndex) => {
                return (
                    <FormInputWrap key={ item.id } style={ { marginLeft: 20 } }>
                        <SubFormHeading>Sub task {subIndex+1}</SubFormHeading>
                        <FormBreak>
                            <FormInput>
                                <FormLabel>
                                    <label htmlFor="taskName">Task name</label>
                                    <FormError role="alert">
                                        {errors.taskName && "Enter a task name!"}
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
                                        {errors.endTime && "Please set a date!"}
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
                                        {errors.email && "Please describe your task!"}
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




const IconBox = styled.div`
  align-self: center;
`



const OrderedList = styled.ul`
  margin-top: 4em;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;

  li {
    padding: 0 1rem;
    margin: 0;
    flex: 1 0 100%;
    list-style: none;
    border: none;
    align-items: start;
    @media (min-width: 768px) {
      flex: 1 0 50%;
    }

  }

  li label{
    flex: 1 0 30%;
    @media (min-width: 768px) {
      flex: 1 0 100%;
    }
  }

  li > div {
    flex: 1 0 70%;
    display: flex;
    flex-wrap: wrap;
    @media (min-width: 768px) {
      flex: 1 0 70%;
    }
  }


  li > label {
    flex: 1 0 30%;

  }

`
