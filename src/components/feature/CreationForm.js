////////////////////
//// Build
import React, { useContext, useState } from 'react'
import styled, { css } from 'styled-components'

////////////////////
//// Environmental
import { BlogImage, WindowVisual } from "../../styles/Images";
import blogBackground from '../../assets/images/visual_blogs.svg'
import { useFieldArray, useForm } from "react-hook-form";
import { postBlog } from "../../services/controllers/Blogs";
import { uploadImage } from "../../services/controllers/Images";
import { UtilityContext } from "../../context/UtilityProvider";
import { QUERIES } from "../../services/helpers/mediaQueries";
import { ButtonBox } from "../../styles/Form";
import RectangleButton from "../shared/elements/clickables/RectangleButton";

export default function CreationForm() {
    const utilityContext = useContext(UtilityContext);
    const [ picture, setPicture ] = useState('')

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const { fields, append, remove, prepend } = useFieldArray({
        control,
        name: "projectTaskList"
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

        uploadImage(utilityContext, values.imageUrl[0]).then((response) => {
            return {
                ...values,
                imageUrl: response
            }
        }).then(response => {
            postBlog(utilityContext, response)
        }).then(response => {
            return response
        });
    }


    return (
        <BorderedWindow>
            <VisualContainer>

                <WindowVisual src={ blogBackground }/>
            </VisualContainer>
            <BlogPreview>

            </BlogPreview>

            <FormColumn>
                <Heading>Your new blog</Heading>

                <Form onSubmit={ handleSubmit(onSubmit) }>
                    <FormField>
                        <FormInput area="name">
                            <FormLabel>
                                <label htmlFor="name">Name</label>
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
                        <FormInput area="url">
                            <FormLabel>
                                <label htmlFor="name">Reference url</label>
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
                        <FormInput area="image">
                            <FormLabel>
                                <label htmlFor="name">Image</label>
                                <FormError role="alert">
                                    { errors.blogName && "Enter a blog name!" }
                                </FormError>
                            </FormLabel>
                            <input
                                type="file"
                                name="blogName"
                                id="blogName"
                                placeholder="Tell something interesting mate"
                                { ...register("blogName", {
                                    required: true
                                }) }
                            />
                        </FormInput>
                        <ImagePreview/>

                        <FormInput area="description">
                            <FormLabel>
                                <label htmlFor="description">Description</label>
                                <FormError role="alert">
                                    { errors.blogName && "Enter a blog name!" }
                                </FormError>
                            </FormLabel>
                            <textarea
                                type="text"
                                name="blogName"
                                id="blogName"
                                placeholder="Tell something interesting mate"
                                { ...register("blogName", {
                                    required: true
                                }) }
                            />
                        </FormInput>


                    </FormField>


                    <ButtonBox
                        area="buttons"
                    >
                        <RectangleButton
                            buttonSize="btn--large"
                            buttonStyle="btn--primary--outline"
                        >
                            Preview
                        </RectangleButton>
                        <RectangleButton
                            buttonSize="btn--large"
                            buttonStyle="btn--primary--solid"
                        >
                            Post
                        </RectangleButton>
                        <RectangleButton
                            buttonSize="btn--large"
                            buttonStyle="btn--danger--solid"
                        >
                            Reset
                        </RectangleButton>
                    </ButtonBox>
                </Form>
            </FormColumn>

        </BorderedWindow>

    );
}

const VisualContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 1rem;
`

const Form = styled.form`
  grid-area: form;
`

const BorderedWindow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
      "visual"
      "form"
  "blogPreview";
  transition: all .5s ease;

  max-width: 70vw;
  width: 100%;
  z-index: 1;
  background: ${ props => props.theme.createBackground };
  border: solid var(--box-border-medium) ${ props => props.theme.createBorder };
  box-shadow: ${ props => props.theme.createShadow };
  @media ${ QUERIES.tablet } {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "visual form"
      "visual form"
      "blogPreview form"
      "blogPreview form"
  ;
  }
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

const ImagePreview = styled(BlogImage)`
  grid-area: imagePreview;
  width: 100%;

`


const Heading = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 2rem;
  font-weight: 300;
  padding-top: 1rem;
  color: ${ props => props.theme.text };

  @media ${ QUERIES.tabletMini } {
    font-size: 2rem;
  }
`;

const FormError = styled.div`
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
  color: ${ props => props.theme.sub_text };
  text-align: right;

`;

const FormLabel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const BlogPreview = styled.div`
  grid-area: blogPreview;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;

`
const FormColumn = styled.div`
  grid-area: form;
  width: 100%;
  padding: 0 1rem;
`

const FormInput = styled.div`
  ${ ({ area }) =>
          area &&
          css`
            grid-area: ${ area };
          ` }
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75rem;
  width: 100%;

  label {
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
  }

  &.radio {
    flex-direction: row;
    justify-content: space-between;

    input {
      height: 1rem;
    }
  }

  & [type="file"] {
    min-width: 135px;
  }

  input {
    width: 100%;
    border: ${ props => props.theme.createBorder } solid var(--box-border-thin);
    padding: 0.75rem 1rem;
    color: ${ props => props.theme.text };
    font-size: 1rem;
    background-color: ${ props => props.theme.background };
    height: 3rem;

    &::placeholder {
      color: ${ props => props.theme.sub_text };
    }

    &:focus,
    &:hover {
      outline: ${ props => props.theme.createBorder } solid var(--box-border-medium);
    }
  }

  textarea {
    min-height: 7rem;
    resize: vertical;
    border: ${ props => props.theme.createBorder } solid var(--box-border-thin);
    padding: 0.75rem 1rem;
    color: ${ props => props.theme.text };
    font-size: 1rem;
    text-transform: capitalize;
    background-color: ${ props => props.theme.background };

    &:focus,
    &:hover {
      outline: ${ props => props.theme.createBorder } solid var(--box-border-medium);
    }
  }
`;

/** Created by ownwindows on 10-01-22 **/
