////////////////////
//// Build
import React from "react";
import styled from 'styled-components';
import { useFieldArray } from "react-hook-form";
////////////////////
//// Environmental
import Tooltip from "../../../shared/elements/messages/Tooltip";
import { IoIosAddCircle, IoIosRemoveCircleOutline } from "react-icons/io";
import { Input, InputDate, InputLabel } from "../../../shared/elements/Input";
import { Row, SubRow, SubRowList } from "../../../shared/elements/Layout";

export default ({ nestIndex, control, register }) => {
    const { fields, remove, append } = useFieldArray({
        control,
        name: `projectTaskList[${ nestIndex }].subTaskList`
    });
    console.log()
    return (
        <SubRowList>
            { fields.map((item, k) => {
                return (
                    <SubRow key={ item.id } style={ { marginLeft: 20 } }>

                        <Row>

                            <InputLabel>

                                <p>
                                    Task name

                                </p>                                <Input
                                    { ...register(`projectTaskList[${ nestIndex }].subTaskList[${ k }].taskName`) }
                                    placeholder="..."
                                />
                            </InputLabel>
                            <InputLabel>
                                <p>

                                    Description
                                </p>                                <Input
                                    { ...register(`projectTaskList[${ nestIndex }].subTaskList[${ k }].description`) }
                                    placeholder="Description"
                                />
                            </InputLabel>
                            <InputLabel>
                                <p>

                                    Deadline
                                </p>
                                <InputDate
                                    type="date"
                                    { ...register(`projectTaskList[${ nestIndex }].subTaskList[${ k }].endTime`) }
                                />
                            </InputLabel>
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

                    </SubRow>
                );
            }) }


        </SubRowList>
    );
};




const Icon = styled.div`
  align-self: center;
`





