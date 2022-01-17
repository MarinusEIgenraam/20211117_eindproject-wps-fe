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
import styled from 'styled-components'
import { H1, H2 } from "../../../shared/elements/Text";
import { ButtonBox, Form, FormWindow } from "../../../shared/elements/Form";
import { Image, Img } from "../../../shared/elements/Images";

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


    return (
        <FormWindow>
            <Form onSubmit={ handleSubmit(onSubmit) }>
                <H2 className="centered">
                    Create a blog
                </H2>
                <OrderedList>

                    <InputField
                        type="text"
                        name="Name"
                        inputName="blogName"
                        register={ register }
                        errors={ errors }
                        required={ true }
                    />
                    <InputArea
                        type="text"
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
                    <InputField
                        className="centered"
                        type="file"
                        name="Image"
                        inputName="imageUrl"
                        register={ register }
                        errors={ errors }
                        required={ false }
                        placeholder="https://www.willpoweredstudents.com"
                        onChange={ handleImageChange }
                    />
                    {/*<ImageItem>*/}
                    {/*    <Image src={ picture }/>*/}
                    {/*</ImageItem>*/}
                </OrderedList>
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
                        disabled={ error.name || error.description }


                    >
                        Submit
                    </RectangleButton>


                </ButtonBox>


            </Form>


        </FormWindow>
    );
}

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
    align-items: start;
    @media (min-width: 768px) {
      flex: 1 0 45%;
    }

  }


  li > div {
    flex: 1 0 100%;
    display: flex;
    flex-wrap: wrap;
    @media (min-width: 552px) {
      flex: 1 0 70%;
    }
  }


  li > label {
    flex: 1 0 30%;

  }

`


/** Created by ownwindows on 10-01-22 **/
