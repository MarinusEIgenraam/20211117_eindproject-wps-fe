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
import { ListItem } from "../../../shared/elements/List";

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
                    <ListItem key={ item.id } style={ { marginLeft: 20 } }>

                        <OrderedList>

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
                        </OrderedList>

                    </ListItem>
                );
            }) }


        </SubRowList>
    );
};




const Icon = styled.div`
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
