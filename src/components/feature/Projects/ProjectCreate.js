////////////////////
//// Build
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form";
////////////////////
//// Environmental
import { UtilityContext } from "../../../context/UtilityProvider";
import FieldArray from "./ProjectTaskList";
import RectangleButton from "../../shared/elements/clickables/RectangleButton";
import { FormError, FormInput, FormLabel, } from "../../../styles/FormStyles";
import { ButtonBox } from "../../../styles/Form";
import { postProject } from "../../../services/controllers/Projects";
import { uploadImage } from "../../../services/controllers/Images";
import SelectCategory from "../../shared/elements/FormElements/SelectCategory";
import { FormSectionHeading, SubHeading } from "../../../styles/Typography";
import styled from "styled-components";
import { QUERIES } from "../../../services/helpers/mediaQueries";
import { BorderedWindow, VisualContainer } from "../../../styles/Windows";
import { Hero, WindowVisual } from "../../../styles/Images";
import projectBackground from "../../../assets/images/visual_projects.svg";

const mockValues = {
    projectTaskList: [
        {
            taskName: "First task",
        },
        {
            taskName: "Second task",
        },
        {
            taskName: "Third task",
        },
        {
            taskName: "Fourth task",
        },
        {
            taskName: "Fifth task",
        }
    ]
};

export default function ProjectCreate({ setEdit, defaultProject }) {
    const utilityContext = useContext(UtilityContext);
    const [ publicVisibility, setPublicVisibility ] = useState(true);
    const [ picture, setPicture ] = useState('')

    const defaultValues = defaultProject ? defaultProject : mockValues;

    const {
        control,
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
        setValue
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


    const onSubmit = (values) => {

        if (values.imageUrl[0]) {
            if (values.imageUrl[0].type === 'image/jpeg' || values.imageUrl[0].type === 'image/png') {
                uploadImage(utilityContext, values.imageUrl[0]).then(response => {
                    return {
                        ...values,
                        imageUrl: response.data.data.link
                    };
                }).then(response => {
                    postProject(utilityContext, response)
                });

            } else (
                console.log('incorrect input')
            )
        } else {
            const imgur = ''
            const request = {
                ...values,
                imageUrl: imgur
            }
            console.log(values)

            return postProject(utilityContext, request)
        }
    }

    const handleVisibility = () => {
        setPublicVisibility(!publicVisibility);
    };
    console.log(errors)

    return (
        <ProjectWindow>
            <VisualContainer>

                <WindowVisual src={ projectBackground }/>
            </VisualContainer>
            <FormColumn>

                <Form id="projectCreation" onSubmit={ handleSubmit(onSubmit) }>
                    <SubHeading>Create a project</SubHeading>

                    <FormSectionHeading>Project details</FormSectionHeading>

                    <FormField>
                        <FormInput area="name">
                            <FormLabel>
                                <label htmlFor="name">Project name</label>
                                <FormError role="alert">
                                    { errors.projectName && "Enter a project name!" }
                                </FormError>
                            </FormLabel>
                            <input
                                type="text"
                                name="projectName"
                                id="projectName"
                                placeholder="Make the world a better place"
                                { ...register("projectName", {
                                    required: true
                                }) }
                            />
                        </FormInput>
                        <FormInput area="website">
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
                        <FormInput area="imageUrl">
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
                                { ...register("imageUrl") }
                                onChange={ handleImageChange }
                            />
                        </FormInput>
                        <ImagePreview image={ picture }/>
                        <FormInput area="deadline">
                            <FormLabel>
                                <label htmlFor="deadline">Deadline</label>
                                <FormError role="alert">
                                    { errors.endTime && "Please set a date!" }
                                </FormError>
                            </FormLabel>
                            <input
                                type="date"
                                name="phone"
                                id="phone"
                                { ...register("endTime", {
                                    required: true
                                }) }
                            />
                        </FormInput>
                        <SelectCategory
                            area="category"
                            defaultValue={ "Category" }
                            register={ register }
                            parent={ `categoryId` }
                        />
                        <FormInput className="radio" area="visibility">
                            <FormLabel>

                                <label htmlFor="publiclyVisible">Public visibility</label>
                            </FormLabel>
                            <input
                                type="checkbox"
                                name="publiclyVisible"
                                id="publiclyVisible"
                                value="publiclyVisible"
                                onClick={ handleVisibility }
                                defaultChecked={ true }
                            />

                        </FormInput>
                        <FormInput area="description">
                            <FormLabel>
                                <label htmlFor="description">Description</label>
                                <FormError role="alert">
                                    { errors.email && "Please describe your project!" }
                                </FormError>
                            </FormLabel>
                            <textarea
                                name="description"
                                id="description"
                                placeholder="Describe the purpose of your project"
                                { ...register("description") }
                            />
                        </FormInput>
                    </FormField>
                    <FieldArray
                        { ...{ control, register, defaultValues, getValues, setValue, errors } }
                    />
                    <ButtonBox>

                        <RectangleButton
                            type="button"
                            onClick={ () => reset(defaultValues) }
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
                </Form>
            </FormColumn>


        </ProjectWindow>
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
      "website"
      "imageUrl"
      "imagePreview"
      "deadline"
  "category"
  "description"
  "visibility";
  @media ${ QUERIES.tablet } {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
    grid-template-areas:
      "name name"
      "website website"
      "imageUrl imagePreview"
      "category imagePreview"
      "deadline imagePreview"
      "visibility imagePreview"
      "description description"
  ;
  }
`

const ProjectWindow = styled(BorderedWindow)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
      "visual"
      "form";
  @media ${ QUERIES.tablet } {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "form visual"
      "form visual"
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
