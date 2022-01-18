////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';
import { useFieldArray } from "react-hook-form";
////////////////////
//// Environmental
import NestedArray from "./TaskListTask";
////////////////////
//// External

let renderCount = 0;

export default function Fields({ control, register, setValue, getValues }) {
    const { fields, append, remove, prepend } = useFieldArray({
        control,
        name: "test"
    });

    renderCount++;

    return (
        <>
            <ul>
                {fields.map((item, index) => {
                    return (
                        <li key={item.id}>
                            <input
                                name={`test[${index}].name`}
                                ref={register()}
                                defaultValue={item.name}
                            />

                            <button type="button" onClick={() => remove(index)}>
                                Delete
                            </button>
                            <NestedArray nestIndex={index} {...{ control, register }} />
                        </li>
                    );
                })}
            </ul>

            <section>
                <button
                    type="button"
                    onClick={() => {
                        append({ name: "append" });
                    }}
                >
                    append
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setValue("test", [
                            ...getValues().test,
                            {
                                name: "append",
                                nestedArray: [{ field1: "append", field2: "append" }]
                            }
                        ]);
                    }}
                >
                    Append Nested
                </button>

                <button
                    type="button"
                    onClick={() => {
                        prepend({ name: "append" });
                    }}
                >
                    prepend
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setValue("test", [
                            {
                                name: "append",
                                nestedArray: [{ field1: "Prepend", field2: "Prepend" }]
                            },
                            ...getValues().test
                        ]);
                    }}
                >
                    prepend Nested
                </button>
            </section>

            <span className="counter">Render Count: {renderCount}</span>
        </>
    );
}


const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem;
  height: 300px;
  //flex: 1 5;
  width: 100%;
`

const Column = styled.div`
  display: flex;
  height: max-content;
  flex-direction: column;
  margin: 1rem;
  width: 100%;
`

/** Created by ownwindows on 11-01-22 **/
