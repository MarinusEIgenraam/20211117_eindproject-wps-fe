////////////////////
//// Build
import React from "react";
import { useFieldArray } from "react-hook-form";
import styled from 'styled-components';
////////////////////
//// Environmental
import NestedArray from "./taskSubtaskList";
import RectangleButton from "../../../shared/elements/clickables/RectangleButton/RectangleButton";
import Tooltip from "../../../shared/elements/messages/Tooltip";
import { IoIosRemoveCircleOutline } from "react-icons/io";

let renderCount = 0;

export default function Fields({ control, register, setValue, getValues }) {
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

                                <Label>
                                    <p>
                                        Task name

                                    </p>
                                    <Input
                                        { ...register(`projectTaskList[${ index }].taskName`) }
                                        placeholder="Task name"
                                    />
                                </Label>
                                <Label>
                                    <p>

                                        Description
                                    </p>
                                    <Input
                                        type="text-area"
                                        { ...register(`projectTaskList[${ index }].description`) }
                                        placeholder="Description"
                                    />
                                </Label>
                                <Label>
                                    <p>

                                        Deadline
                                    </p>
                                    <InputDate
                                        type="date"
                                        { ...register(`projectTaskList[${ index }].endTime`) }
                                    />
                                </Label>
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

                                <NestedArray nestIndex={ index } { ...{ control, register } } />
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

