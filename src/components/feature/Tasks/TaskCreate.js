////////////////////
//// Build
import React from 'react'
import { useFieldArray } from "react-hook-form";
////////////////////
//// Environmental
import NestedArray from "./TaskListTask";

export default function Fields({ control, register, setValue, getValues }) {
    const { fields, append, remove, prepend } = useFieldArray({
        control,
        name: "test"
    });

    return (
        <>
            <ul>
                { fields.map((item, index) => {
                    return (
                        <li key={ item.id }>
                            <input
                                name={ `test[${ index }].name` }
                                ref={ register() }
                                defaultValue={ item.name }
                            />

                            <button type="button" onClick={ () => remove(index) }>
                                Delete
                            </button>
                            <NestedArray nestIndex={ index } { ...{ control, register } } />
                        </li>
                    );
                }) }
            </ul>

            <section>
                <button
                    type="button"
                    onClick={ () => {
                        append({ name: "append" });
                    } }
                >
                    append
                </button>

                <button
                    type="button"
                    onClick={ () => {
                        setValue("test", [
                            ...getValues().test,
                            {
                                name: "append",
                                nestedArray: [ { field1: "append", field2: "append" } ]
                            }
                        ]);
                    } }
                >
                    Append Nested
                </button>

                <button
                    type="button"
                    onClick={ () => {
                        prepend({ name: "append" });
                    } }
                >
                    prepend
                </button>

                <button
                    type="button"
                    onClick={ () => {
                        setValue("test", [
                            {
                                name: "append",
                                nestedArray: [ { field1: "Prepend", field2: "Prepend" } ]
                            },
                            ...getValues().test
                        ]);
                    } }
                >
                    prepend Nested
                </button>
            </section>
        </>
    );
}

/** Created by ownwindows on 11-01-22 **/
