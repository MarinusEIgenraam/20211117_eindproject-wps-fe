////////////////////
//// Build
import React, { useState } from 'react'
import styled from 'styled-components';
import InputField from "./InputField";
import { useForm } from "react-hook-form";

////////////////////
//// Environmental

////////////////////
//// External

export default function ImageUpload({register}) {
    const [picture, setPicture] = useState('')


    const handleImageChange = (event) => {
        if (!event || !event.target.files){
            console.log("anything")
            return
        }
        const imageFile = event.target.files[0]
        const imageURL = URL.createObjectURL(imageFile)
        setPicture(imageURL)
        console.log(picture)
    }

    return (
        <input
            type="file"
            name="Image"
            inputName="file"
            register={ register }
            required={ true }
            onChange={handleImageChange}
        />

    )
}

const NewImageUpload = styled.div`

`

/** Created by ownwindows on 10-01-22 **/
