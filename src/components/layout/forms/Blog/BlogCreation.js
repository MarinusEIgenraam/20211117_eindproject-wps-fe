////////////////////
//// Build
import React, { useContext, useState } from 'react'
import { useFieldArray, useForm } from "react-hook-form";
import { UtilityContext } from "../../../../context/UtilityProvider";
import InputField from "../../../shared/elements/FormElements/InputField";
import InputArea from "../../../shared/elements/FormElements/InputArea";
import RectangleButton from "../../../shared/elements/clickables/RectangleButton/RectangleButton";
import { AuthContext } from "../../../../context/AuthProvider";
import { postBlog, uploadImage } from "../../../../services/controllers/requests";
import { H1 } from "../../../shared/elements/Text";
import { Column, Row } from "../../../shared/elements/Layout";
import { Image } from "../../../shared/elements/Images";
import { ButtonBox, Form, FormWindow } from "../../../shared/elements/Form";

////////////////////
//// Environmental

const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;

////////////////////
//// External


export default function BlogCreation() {
    const { isAuth, user } = useContext(AuthContext);
    const { hasError, setHasError, setIsLoading } = useContext(UtilityContext);
    const [ error, toggleError ] = useState(false);
    const [ picture, setPicture ] = useState('')

    const {
        control,
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
        setValue
    } = useForm();
    const { fields, append, remove, prepend } = useFieldArray({
        control,
        name: "projectTaskList"
    });

    const handleImageChange = (event) => {
        if (!event || !event.target.files) {
            console.log("anything")
            return
        }
        const imageFile = event.target.files[0]
        const imageURL = URL.createObjectURL(imageFile)
        setPicture(imageURL)
        console.log(picture)
    }


    const onSubmit = async (values) => {
        setIsLoading(true)
        const imgur = await uploadImage(values.imageUrl[0])


        const request = {
            ...values,
            imageUrl: imgur
        }
        const response = await postBlog(request)
        const project = { ...response }
        console.log(project)

        setIsLoading(false)
    }
    //
    // function onSubmit(data) {
    //     console.log("data", data)
    // }

    return (
        <FormWindow>
            <H1>
                Write a blog
            </H1>
            <Form onSubmit={ handleSubmit(onSubmit) }>
                <Row>

                    <Column>
                        <InputField
                            type="text"
                            name="Name"
                            inputName="blogName"
                            register={ register }
                            errors={ errors }
                            required={ true }
                        />
                        <InputArea
                            type="text-area"
                            name="Description"
                            inputName="description"
                            register={ register }
                            errors={ errors }
                            required={ true }
                            placeholder="What do you want to achieve with this project..."
                        />
                        <InputField
                            type="url"
                            name="Website"
                            inputName="url"
                            register={ register }
                            errors={ errors }
                            required={ false }
                            placeholder="https://www.willpoweredstudents.com"

                        />
                    </Column>
                    <Column>
                        <InputField
                            type="file"
                            name="Website"
                            inputName="imageUrl"
                            register={ register }
                            errors={ errors }
                            required={ false }
                            placeholder="https://www.willpoweredstudents.com"
                            onChange={ handleImageChange }
                        />


                        <label htmlFor='file'>

                            <Image src={ picture }/>
                            Preview
                        </label>
                    </Column>
                </Row>
                <ButtonBox>


                    <RectangleButton
                        type="button"
                        onClick={ () => reset() }
                        buttonSize="btn--large"
                        buttonStyle="btn--danger--solid"
                    >
                        Reset
                    </RectangleButton>
                    <RectangleButton
                        type="submit"
                        buttonSize="btn--large"
                        buttonStyle="btn--succes--solid"
                        disabled={ error.name || error.description  }

                    >
                        Submit
                    </RectangleButton>

                </ButtonBox>



            </Form>

        </FormWindow>
    );
}




/** Created by ownwindows on 10-01-22 **/
