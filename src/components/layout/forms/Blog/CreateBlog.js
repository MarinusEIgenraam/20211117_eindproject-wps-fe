////////////////////
//// Build
import React, { useContext, useState } from 'react'
import { useFieldArray, useForm } from "react-hook-form";
import { UtilityContext } from "../../../../context/UtilityProvider";
import RectangleButton from "../../../shared/elements/clickables/RectangleButton/RectangleButton";
import { AuthContext } from "../../../../context/AuthProvider";
import { postBlog, uploadImage } from "../../../../services/controllers/requests";
import styled from 'styled-components'
import { H2 } from "../../../shared/elements/Text";
import { ButtonBox } from "../../../shared/elements/Form";
import { Form, FormBreak, FormError, FormInput, FormInputWrap, FormLabel, Heading } from "../Project/FormStyles";

////////////////////
//// Environmental

const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;

////////////////////
//// External


export default function CreateBlog() {
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
        <Form id="blogCreation" onSubmit={ handleSubmit(onSubmit) }>
            <Heading className="centered">Create a blog</Heading>
            <FormInputWrap>
                <FormBreak>
                    <FormInput>
                        <FormLabel>
                            <label htmlFor="name">Blog name</label>
                            <FormError role="alert">
                                {errors.blogName && "Enter a blog name!"}
                            </FormError>
                        </FormLabel>
                        <input
                            type="text"
                            name="blogName"
                            id="blogName"
                            placeholder="Tell something interesting mate"
                            {...register("blogName", {
                                required: true})}
                        />
                    </FormInput>
                </FormBreak>
                <FormBreak>
                    <FormInput>
                        <FormLabel>
                            <label htmlFor="name">Description</label>
                            <FormError role="alert">
                                {errors.description && "Enter the story!"}
                            </FormError>
                        </FormLabel>
                        <textarea
                            type="text"
                            name="description"
                            id="description"
                            placeholder="Tell something more"
                            {...register("description", {
                                required: true})}
                        />
                    </FormInput>
                </FormBreak>
                <FormBreak>
                    <FormInput>
                        <FormLabel>
                            <label htmlFor="website">Website reference</label>
                            <FormError role="alert">
                                {errors.url && "Please provide a correct url!"}
                            </FormError>
                        </FormLabel>
                        <input
                            type="url"
                            name="website"
                            id="website"
                            placeholder="www.willpoweredstudents.com"
                            {...register("url")}
                        />
                    </FormInput>

                </FormBreak>
                <FormBreak>
                    <FormInput>
                        <FormLabel>
                            <label htmlFor="imageUrl">Project image</label>
                            <FormError role="alert">
                                {errors.imageUrl && "Please provide a jpg or png image!"}
                            </FormError>
                        </FormLabel>
                        <input
                            type="file"
                            name="imageUrl"
                            id="imageUrl"
                            {...register("imageUrl")}
                            onChange={ handleImageChange }
                        />
                    </FormInput>
                    {/*<ImageItem>*/}
                    {/*    <Image src={ picture }/>*/}
                    {/*</ImageItem>*/}
                </FormBreak>
            </FormInputWrap>
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
                    disabled={ errors.blogName || errors.description || errors.imageUrl }
                >
                    Submit
                </RectangleButton>
            </ButtonBox>


        </Form>

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

  li > span{
    flex: 1 0 70%;
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