////////////////////
//// Build
import React, { useState } from 'react'
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import InputField from "./FormElements/InputField";

////////////////////
//// Environmental

////////////////////
//// External

export default function SearchField({ setSearchParam }) {
    const { register, handleSubmit, formState: { errors }  } = useForm()

    const handleChange = (event) => {
        const search = event.target.value
        setSearchParam(search)
    }

    const onSubmit = (data) => {
        setSearchParam(data.keyword)
    }


    return (
        <form onSubmit={ handleSubmit(onSubmit) }>
            <Search
                type="text"
                inputName="param"
                register={ register }
                errors={ errors }
                placeholder="Search for..."
                onChange={ handleChange }
            />
        </form>


    )
}

const Search = styled(InputField)`
  width: 25rem !important;
`


/** Created by ownwindows on 09-01-22 **/
