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
                            </Row>
                            <Row>

                            </Row>
                        </ListItem>
                    );
                }) }
            </TaskList>


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


const ProjectTasks = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: column;
`
