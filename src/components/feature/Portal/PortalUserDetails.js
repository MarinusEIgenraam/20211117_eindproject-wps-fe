////////////////////
//// Build
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form";
////////////////////
//// Environmental
import { Form, FormBreak, FormError, FormInput, FormInputWrap, FormLabel } from "../../../styles/FormStyles";
import { AuthContext } from "../../../context/AuthProvider";
import { ButtonBox, FormWindow } from "../../../styles/Form";
import RectangleButton from "../../shared/elements/clickables/RectangleButton";
import { UtilityContext } from "../../../context/UtilityProvider";
import { uploadProfileImage } from "../../../services/controllers/Images";

export default function PortalUserDetails() {
    const [ changeUsername, setChangeUsername ] = useState();
    const { user } = useContext(AuthContext);
    const { hasError, setHasError, setIsLoading } = useContext(UtilityContext);
    const [ picture, setPicture ] = useState('')
    const [ profileImage, setProfileImage ] = useState('')
    const {
        control,
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
        setValue
    } = useForm({});

    const handleImageChange = (event) => {
        if (!event || !event.target.files) {
            console.log("anything")
            return
        }
        const imageFile = event.target.files[0]
        const image = URL.createObjectURL(imageFile)
        setPicture(image)
        console.log(picture)
    }

    const onSubmit = async (values) => {
        setIsLoading(true)
        console.log("jo")
        console.log(values);

        const profileImage = await uploadProfileImage(setHasError, setIsLoading, values.file[0])
        console.log(profileImage)

        setIsLoading(false)
    }

    console.log(user)
    return (
        <FormWindow>
            <h2 className="centered">
                Settings
            </h2>
            <ButtonBox>
                <RectangleButton
                    type="button"
                    buttonSize="btn--large"
                    buttonStyle="btn--danger--solid"
                >
                    Reset
                </RectangleButton>
                <RectangleButton
                    type="submit"
                    buttonSize="btn--large"
                    buttonStyle="btn--succes--solid"
                    // disabled={ errors }
                >
                    Submit
                </RectangleButton>
            </ButtonBox>
            <Form className="editForm">
                <FormInputWrap>


                    <FormBreak>
                        <FormInput>
                            <FormLabel>
                                <label htmlFor="email">Email</label>
                                <FormError role="alert">
                                    { errors.email && "Enter your email address!" }
                                </FormError>
                            </FormLabel>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="..."
                                defaultValue={ user.email }
                                { ...register("email", {
                                    required: true
                                }) }
                            />
                        </FormInput>
                    </FormBreak>

                </FormInputWrap>
            </Form>
            <form onSubmit={ handleSubmit(onSubmit) }>

                <FormBreak>
                    <FormInput>
                        <FormLabel>
                            <label htmlFor="image">Profile image</label>
                            <FormError role="alert">
                                { errors.imageUrl && "Please provide a jpg or png image!" }
                            </FormError>
                        </FormLabel>
                        <input
                            type="file"
                            name="file"
                            id="file"
                            { ...register("file") }
                            onChange={ handleImageChange }
                        />

                    </FormInput>
                    <input type="submit" value="Upload File"/>

                </FormBreak>
            </form>

        </FormWindow>
    )
}

/** Created by ownwindows on 20-01-22 **/
