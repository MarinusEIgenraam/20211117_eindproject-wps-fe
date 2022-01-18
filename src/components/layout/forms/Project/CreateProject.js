////////////////////
//// Build
import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { UtilityContext } from "../../../../context/UtilityProvider";
import FieldArray from "./TaskListProject";
import RectangleButton from "../../../shared/elements/clickables/RectangleButton/RectangleButton";
import { postProject, uploadImage } from "../../../../services/controllers/requests";
import SelectCategory from "../../../shared/elements/FormElements/SelectCategory";
import {
    CashOnContent,
    CashOnImage,
    CashOnWrap,
    Form,
    FormBreak,
    FormError,
    FormInput,
    FormInputWrap,
    FormLabel, FormSection, FormSectionHeading, Heading
} from "./FormStyles";
import { H2 } from "../../../shared/elements/Text";
import InputField from "../../../shared/elements/FormElements/InputField";
import { ButtonBox } from "../../../shared/elements/Form";

////////////////////
//// Environmental

const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;

////////////////////
//// External


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

export default function CreateProject() {
    const [ projectCategory, setProjectCategory ] = useState('');
    const { hasError, setHasError, setIsLoading } = useContext(UtilityContext);
    const [ error, toggleError ] = useState(false);
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
        console.log("jo")
        console.log(values);

        if (values.imageUrl[0]) {
            if (values.imageUrl[0].type === 'image/jpeg' || values.imageUrl[0].type === 'image/png') {
                const imgur = await uploadImage(values.imageUrl[0])
                console.log(imgur)
                const request = {
                    ...values,
                    categoryId: projectCategory,
                    imageUrl: imgur
                }
                const response = await postProject(request)
                const project = { ...response }
                console.log(project)

            } else (
                console.log('incorrect input')
            )
        } else {
            console.log(projectCategory)

            const imgur = ''
            const request = {
                ...values,
                categoryId: projectCategory,
                imageUrl: imgur
            }
            const response = await postProject(request)
            const project = { ...response }
            console.log(project)

        }
        setIsLoading(false)
    }

    const handleVisibility = () => {
        setPublicVisibility(!publicVisibility);
    };

    return (
        <Form id="projectCreation" onSubmit={handleSubmit(onSubmit)}>
        <Heading className="centered">Create a project</Heading>
            <FormSection>

                <FormSectionHeading>Project details</FormSectionHeading>

                <FormInputWrap>
                    <FormBreak>
                        <FormInput>
                            <FormLabel>
                                <label htmlFor="name">Project name</label>
                                <FormError role="alert">
                                    {errors.projectName && "Enter a project name!"}
                                </FormError>
                            </FormLabel>
                            <input
                                type="text"
                                name="projectName"
                                id="projectName"
                                placeholder="Make the world a better place"
                                {...register("projectName", {
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

                    </FormBreak>
                    <FormBreak>
                        <FormInput>
                            <FormLabel>
                                <label htmlFor="deadline">Deadline</label>
                                <FormError role="alert">
                                    {errors.endTime && "Please set a date!"}
                                </FormError>
                            </FormLabel>
                            <input
                                type="date"
                                name="phone"
                                id="phone"
                                {...register("endTime", {
                                    required: true})}
                            />
                        </FormInput>

                    </FormBreak>
                    <FormBreak>
                        <FormInput>
                            <SelectCategory register={register} category={projectCategory} setCategory={setProjectCategory}/>

                        </FormInput>
                        <FormInput className="radio">
                            <FormLabel>

                                <label htmlFor="publiclyVisible">Public visibility</label>
                            </FormLabel>
                            <input
                                type="radio"
                                name="publiclyVisible"
                                id="publiclyVisible"
                                value="publiclyVisible"
                                onClick={handleVisibility}
                                checked={publicVisibility === true ? true : false}
                            />

                        </FormInput>
                    </FormBreak>
                    <FormBreak>
                        <FormInput>
                            <FormLabel>
                                <label htmlFor="description">Description</label>
                                <FormError role="alert">
                                    {errors.email && "Please describe your project!"}
                                </FormError>
                            </FormLabel>
                            <textarea
                                type="text"
                                name="description"
                                id="description"
                                placeholder="Describe the purpose of your project"
                                {...register("description")}
                            />
                        </FormInput>
                    </FormBreak>
                </FormInputWrap>
            </FormSection>
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
                    disabled={ errors }
                >
                    Submit
                </RectangleButton>
            </ButtonBox>
        </Form>
    );
}

/** Created by ownwindows on 10-01-22 **/
