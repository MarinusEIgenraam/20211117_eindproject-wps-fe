////////////////////
//// Build
import React from "react";
import styled from 'styled-components';
import { useFieldArray } from "react-hook-form";
////////////////////
//// Environmental
import RectangleButton from "../../shared/elements/clickables/RectangleButton/RectangleButton";
import Tooltip from "../../shared/elements/Tooltip";
import { IoIosRemoveCircleOutline, IoIosAddCircle } from "react-icons/io";
import { TiDelete } from "react-icons/ti";

export default ({ nestIndex, control, register }) => {
    const { fields, remove, append } = useFieldArray({
        control,
        name: `projectTaskList[${ nestIndex }].subTaskList`
    });
    console.log()
    return (
        <SubtaskList>
            { fields.map((item, k) => {
                return (
                    <Subtask key={ item.id } style={ { marginLeft: 20 } }>

                        <Row>

                            <Label>

                                <p>
                                    Task name

                                </p>                                <Input
                                    { ...register(`projectTaskList[${ nestIndex }].subTaskList[${ k }].taskName`) }
                                    placeholder="..."
                                />
                            </Label>
                            <Label>
                                <p>

                                    Description
                                </p>                                <Input
                                    { ...register(`projectTaskList[${ nestIndex }].subTaskList[${ k }].description`) }
                                    placeholder="Description"
                                />
                            </Label>
                            <Label>
                                <p>

                                    Deadline
                                </p>
                                <InputDate
                                    type="date"
                                    { ...register(`projectTaskList[${ nestIndex }].subTaskList[${ k }].endTime`) }
                                />
                            </Label>
                            <Icon>

                                <Tooltip text="Delete">
                                    <IoIosRemoveCircleOutline
                                        size={ 25 }
                                        type="button"
                                        onClick={ () => remove(k) }
                                    />
                                </Tooltip>
                            </Icon>
                            <Icon>

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
                            </Icon>
                        </Row>

                    </Subtask>
                );
            }) }


        </SubtaskList>
    );
};

const SubtaskList = styled.div`
  div:nth-child(1) {
    div label p {
      visibility: visible;
    }
  }
`

const Subtask = styled.div`
  display: flex;
  flex-direction: row;

`

const Icon = styled.div`
  align-self: center;
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