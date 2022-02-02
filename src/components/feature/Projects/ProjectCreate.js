////////////////////
//// Build
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form";
////////////////////
//// Environmental
import { UtilityContext } from "../../../context/UtilityProvider";
import FieldArray from "./ProjectTaskList";
import RectangleButton from "../../shared/elements/clickables/RectangleButton";
import {
    Form,
    FormBreak,
    FormError,
    FormInput,
    FormInputWrap,
    FormLabel,
    FormSection,
} from "../../../styles/FormStyles";
import { ButtonBox } from "../../../styles/Form";
import { postProject } from "../../../services/controllers/Projects";
import { uploadImage } from "../../../services/controllers/Images";
import SelectCategory from "../../shared/elements/FormElements/SelectCategory";
import { FormSectionHeading, Heading } from "../../../styles/Typography";

const defaultValues = {
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

export default function ProjectCreate() {
    const { setHasError, setIsLoading } = useContext(UtilityContext);
    const [ publicVisibility, setPublicVisibility ] = useState(true);
    const [ picture, setPicture ] = useState('')

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


    const onSubmit = async (values) => {
        setIsLoading(true)

        if (values.imageUrl[0]) {
            if (values.imageUrl[0].type === 'image/jpeg' || values.imageUrl[0].type === 'image/png') {
                const imgur = await uploadImage(setHasError, setIsLoading, values.imageUrl[0])
                const request = {
                    ...values,
                    imageUrl: imgur
                }
                console.log(values)
                await postProject(setHasError, setIsLoading, request)

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

            await postProject(setHasError, setIsLoading, request)
        }
    }

    const handleVisibility = () => {
        setPublicVisibility(!publicVisibility);
    };

    return (
        <Form id="projectCreation" onSubmit={ handleSubmit(onSubmit) }>
            <Heading className="centered">Create a project</Heading>
            <FormSection>

                <FormSectionHeading>Project details</FormSectionHeading>

                <FormInputWrap>
                    <FormBreak>
                        <FormInput>
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
                    </FormBreak>
                    <FormBreak>
                        <FormInput>
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

                    </FormBreak>
                    <FormBreak>
                        <FormInput>
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

                    </FormBreak>
                    <FormBreak>
                        <FormInput>
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

                    </FormBreak>
                    <FormBreak>
                        <SelectCategory
                            defaultValue={ "Category" }
                            register={ register }
                            parent={ `categoryId` }
                        />
                        <FormInput className="radio">
                            <FormLabel>

                                <label htmlFor="publiclyVisible">Public visibility</label>
                            </FormLabel>
                            <input
                                type="radio"
                                name="publiclyVisible"
                                id="publiclyVisible"
                                value="publiclyVisible"
                                onClick={ handleVisibility }
                                checked={ publicVisibility === true }
                            />

                        </FormInput>
                    </FormBreak>
                    <FormBreak>
                        <FormInput>
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
                    </FormBreak>
                </FormInputWrap>
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
            </FormSection>
        </Form>
    );
}

/** Created by ownwindows on 10-01-22 **/
