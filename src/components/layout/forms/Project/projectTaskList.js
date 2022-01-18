////////////////////
//// Build
import React from "react";
import { useFieldArray } from "react-hook-form";
import styled from 'styled-components';
////////////////////
//// Environmental
import RectangleButton from "../../../shared/elements/clickables/RectangleButton/RectangleButton";
import Tooltip from "../../../shared/elements/messages/Tooltip";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import InputField from "../../../shared/elements/FormElements/InputField";
import { ListItem, TaskList } from "../../../shared/elements/List";
import { Row } from "../../../shared/elements/Layout";
import { ButtonBox } from "../../../shared/elements/Form";
import NestedArray from "./taskSubtaskList";

let renderCount = 0;

export default function Fields({ control, register, setValue, getValues, errors }) {
    const { fields, append, remove, prepend } = useFieldArray({
        control,
        name: "projectTaskList"
    });


    return (
        <ProjectTasks>
            { fields.map((item, index) => {
                return (
                    <ListItem key={ item.id }>
                        <OrderedList>

                            <InputField
                                type="text"
                                name="Name"
                                inputName={`projectTaskList[${ index }].taskName`}
                                register={ register }
                                errors={ errors }
                            />
                            <InputField
                                type="text"
                                name="Description"
                                inputName={`projectTaskList[${ index }].description`}
                                register={ register }
                                errors={ errors }
                            />
                            <InputField
                                type="date"
                                name="Deadline"
                                inputName={`projectTaskList[${ index }].endTime`}
                                register={ register }
                                errors={ errors }
                            />
                            <Icon>

                                <Tooltip text="Delete">
                                    <IoIosRemoveCircleOutline
                                        size={ 25 }
                                        type="button"
                                        onClick={ () => remove(index) }
                                    />
                                </Tooltip>
                            </Icon>
                        </OrderedList>
                        <Row>
                            <NestedArray nestIndex={ index } { ...{ control, register } } />

                        </Row>
                    </ListItem>
                );
            }) }


            <ButtonBox>
                <RectangleButton
                    type="button"
                    onClick={ () => {
                        append({ taskName: "New task" });
                    } }
                >
                    New task
                </RectangleButton>


                <RectangleButton
                    type="button"
                    onClick={ () => {
                        setValue("projectTaskList", [
                            ...getValues().projectTaskList,
                            {
                                taskName: "Task name",
                                subTaskList: [ { taskName: "Subtask name", description: "Description" } ]
                            }
                        ]);
                    } }

                >
                    New subtask
                </RectangleButton>

            </ButtonBox>

        </ProjectTasks>
    );
}
const Icon = styled.div`
  align-self: center;
`


const ProjectTasks = styled.ul`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: column;
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
