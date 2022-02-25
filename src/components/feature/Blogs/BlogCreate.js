////////////////////
//// Build
import React, { useContext, useState } from 'react'
import styled from "styled-components";
////////////////////
//// Environmental
import { useForm } from "react-hook-form";
import { UtilityContext } from "../../../context/UtilityProvider";
import RectangleButton from "../../shared/elements/clickables/RectangleButton";
import { ButtonBox } from "../../../styles/Form";
import { FormError, FormInput, FormLabel } from "../../../styles/FormStyles";
import { postBlog, putBlog } from "../../../services/controllers/Blogs";
import { uploadImage } from "../../../services/controllers/Images";
import { Heading } from "../../../styles/Typography";
import { QUERIES } from "../../../services/helpers/mediaQueries";
import { BorderedWindow, VisualContainer } from "../../../styles/Windows";
import { Hero, WindowVisual } from "../../../styles/Images";
import blogBackground from "../../../assets/images/visual_blogs.svg";

const mockValues = { blogName: "newname" }

export default function BlogCreate({ setEdit, defaultBlog }) {
    const utilityContext = useContext(UtilityContext);
    const [ picture, setPicture ] = useState('')

    const defaultValues = defaultBlog ? defaultBlog : mockValues

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues
    });

    const handleImageChange = (event) => {
        if (!event || !event.target.files) {
            return
        }
        const imageFile = event.target.files[0]
        const imageURL = URL.createObjectURL(imageFile)
        setPicture(imageURL)
    }


    const onSubmit = async (values) => {
        console.log(values)
        uploadImage(utilityContext, values.imageUrl[0]).then(response => {
            const blog = {
                ...values,
                imageUrl: response.data.data.link
            }
            if (defaultBlog) {
                putBlog(utilityContext, blog);
            } else {
                postBlog(utilityContext, blog);
            }
            setEdit(false)
        })
    }


    return (
        <BlogWindow>
            <VisualContainer>

                <WindowVisual src={ blogBackground }/>
            </VisualContainer>
            <FormColumn>


                <Heading className="centered">
                    { defaultBlog ?
                        "Your blog"
                        :
                        "Create a blog"
                    }
                </Heading>
                <Form id="blogCreation" onSubmit={ handleSubmit(onSubmit) }>
                    <FormField>
                        <FormInput area="name">
                            <FormLabel>
                                <label htmlFor="name">Blog name</label>
                                <FormError role="alert">
                                    { errors.blogName && "Enter a blog name!" }
                                </FormError>
                            </FormLabel>
                            <input
                                type="text"
                                name="blogName"
                                id="blogName"
                                placeholder="Tell something interesting mate"
                                { ...register("blogName", {
                                    required: true
                                }) }
                            />
                        </FormInput>
                        <FormInput area="description">
                            <FormLabel>
                                <label htmlFor="name">Description</label>
                                <FormError role="alert">
                                    { errors.description && "Enter the story!" }
                                </FormError>
                            </FormLabel>
                            <textarea
                                name="description"
                                id="description"
                                placeholder="Tell something more"
                                { ...register("description", {
                                    required: true
                                }) }
                            />
                        </FormInput>
                        <FormInput area="url">
                            <FormLabel>
                                <label htmlFor="website">Website reference</label>
                                <FormError role="alert">
                                    { errors.url && "Please provide a correct url!" }
                                </FormError>
                            </FormLabel>
                            <input
                                type="url"
                                name="website"
                                id="website"
                                placeholder="www.willpoweredstudents.com"
                                { ...register("url") }
                            />
                        </FormInput>
                        <FormInput area="image">
                            <FormLabel>
                                <label htmlFor="imageUrl">Project image</label>
                                <FormError role="alert">
                                    { errors.imageUrl && "Please provide a jpg or png image!" }
                                </FormError>
                            </FormLabel>
                            <input
                                type="file"
                                name="imageUrl"
                                id="imageUrl"
                                { ...register("imageUrl", {
                                    required: true
                                }) }
                                onChange={ handleImageChange }
                            />
                        </FormInput>

                        <ImagePreview image={ picture }/>
                    </FormField>
                    <ButtonBox area="buttons">
                        <RectangleButton
                            buttonSize="btn--large"
                            buttonStyle="btn--primary--outline"
                        >
                            Preview
                        </RectangleButton>
                        <RectangleButton
                            type="submit"
                            buttonSize="btn--large"
                            buttonStyle="btn--primary--solid"
                            disabled={ errors.blogName || errors.description || errors.imageUrl }
                        >
                            Submit
                        </RectangleButton>
                        <RectangleButton
                            type="button"
                            onClick={ () => reset() }
                            buttonSize="btn--large"
                            buttonStyle="btn--danger--solid"
                        >
                            Reset
                        </RectangleButton>
                    </ButtonBox>


                </Form>
            </FormColumn>

        </BlogWindow>

    );
}

const ImagePreview = styled(Hero)`
  grid-area: imagePreview;
  width: 100%;

`

const FormField = styled.section`
  display: grid;
  grid-column-gap: 0;
  grid-template-columns: 1fr;
  grid-template-areas:
      "name"
      "url"
      "image"
      "description"
      "buttons";
  @media ${ QUERIES.tablet } {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
    grid-template-areas:
      "name name"
      "url url"
      "image imagePreview"
      "image imagePreview"
      "description description"
      "buttons buttons"
  ;
  }



`

const BlogWindow = styled(BorderedWindow)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
      "visual"
      "form";
  @media ${ QUERIES.tablet } {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "visual form"
      "visual form"
  ;
  }
`

const Form = styled.form`
  grid-area: form;
`

const FormColumn = styled.div`
  grid-area: form;
  width: 100%;
  padding: 0 1rem;
`
/** Created by ownwindows on 10-01-22 **/
