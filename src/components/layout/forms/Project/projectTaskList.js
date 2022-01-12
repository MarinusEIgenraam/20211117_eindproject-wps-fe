////////////////////
//// Build
import React from "react";
import { useFieldArray } from "react-hook-form";
import styled from 'styled-components';
////////////////////
//// Environmental
import NestedArray from "./taskSubtaskList";
import RectangleButton from "../../../shared/elements/clickables/RectangleButton/RectangleButton";
import ButtonContainer from "../../containers/ButtonContainer";
import Tooltip from "../../../shared/elements/Tooltip";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import InputField from "../../../shared/elements/FormElements/InputField";

let renderCount = 0;

export default function Fields({ control, register, setValue, getValues, errors }) {
    const { fields, append, remove, prepend } = useFieldArray({
        control,
        name: "projectTaskList"
    });


    return (
        <ProjectTasks>
            <TaskList>
                { fields.map((item, index) => {
                    return (
                        <ListItem key={ item.id }>
                            <Row>

                                <InputField
                                    type="text"
                                    name="Name"
                                    inputName={`projectTaskList[${ index }].taskName`}
                                    register={ register }
                                    errors={ errors }
                                    placeholder="https://www.willpoweredstudents.com"
                                />
                                <InputField
                                    type="text"
                                    name="Description"
                                    inputName={`projectTaskList[${ index }].description`}
                                    register={ register }
                                    errors={ errors }
                                    placeholder="https://www.willpoweredstudents.com"
                                />
                                <InputField
                                    type="date"
                                    name="Deadline"
                                    inputName={`projectTaskList[${ index }].endTime`}
                                    register={ register }
                                    errors={ errors }
                                    placeholder="https://www.willpoweredstudents.com"
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
                            </Row>
                            <Row>

                            </Row>
                        </ListItem>
                    );
                }) }
            </TaskList>


            <ButtonContainer>
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

            </ButtonContainer>

        </ProjectTasks>
    );
}
const Icon = styled.div`
  align-self: center;
`
const TaskList = styled.ul`
  width: 100%;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  li:nth-child(1) {
    div div {
      label {
        visibility: visible;
      }
    }
  }



  `

const ProjectTasks = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: column;

`

const Input = styled.input`
  padding: 0.5rem;
  margin-top: 0.25rem;
  color: ${ props => props.theme.text };
  font-weight: 400;
  display: block;
  font-size: 1rem;
  border: none;
  text-align: start;
  justify-content: start;
  width: min-content;

  outline: var(--tertiary-quarter) solid var(--box-border-thin);
  color: ${ props => props.theme.text };

  &::placeholder {
    color: ${ props => props.theme.sub_text };
  }
`

const ListItem = styled.li`
  border: none;
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  //flex: 1 5;
`

const Label = styled.label`
  font-size: 0.8rem;
  margin-bottom: 1.25rem;
  padding: 0.25rem;

  p {
    visibility: hidden;
  }


`

const InputDate = styled(Input)`
  height: 34px;
`