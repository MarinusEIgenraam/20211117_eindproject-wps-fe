////////////////////
//// Build
import React, { useState } from 'react'
import { Input } from "../Input";

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
        <Input
            type="file"
            name="Image"
            inputName="file"
            register={ register }
            required={ true }
            onChange={handleImageChange}
        />

    )
}

/** Created by ownwindows on 10-01-22 **/
