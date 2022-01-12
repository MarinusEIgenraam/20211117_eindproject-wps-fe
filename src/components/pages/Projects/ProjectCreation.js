////////////////////
//// Build
import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { UtilityContext } from "../../../context/UtilityProvider";
import FormWindow from "../../layout/containers/FormWindow";
import FieldArray from "./projectTaskList";
import InputField from "../../shared/elements/FormElements/InputField";
import InputArea from "../../shared/elements/FormElements/InputArea";
import RectangleButton from "../../shared/elements/clickables/RectangleButton/RectangleButton";
import ButtonContainer from "../../layout/containers/ButtonContainer";

////////////////////
//// Environmental

const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;

////////////////////
//// External


const defaultValues = {
    projectTaskList: [
        {
            taskName: "",
            subTaskList: [{ taskName: "", description: "" }]
        },
        {
            taskName: "",
            subTaskList: [{ taskName: "", description: "" }]
        }
    ]
};

export default function ProjectCreation() {
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


    // const onSubmit = async (values) => {
    //     setIsLoading(true)
    //
    //     if (values.image[0]) {
    //         if (values.image[0].type === 'image/jpeg' || values.image[0].type === 'image/png') {
    //             console.log(values.image)
    //             const imgur = await uploadImage(values.image[0])
    //             const request = {
    //                 ...values,
    //                 imageUrl: imgur
    //             }
    //             const response = await postProject(request)
    //             const project = { ...response }
    //             console.log(project)
    //
    //         } else (
    //             console.log('incorrect input')
    //         )
    //     } else {
    //         console.log("second")
    //         const imgur = ''
    //         const request = { ...values, image: imgur }
    //         const response = await postProject(request)
    //         const project = { ...response }
    //         console.log(project)
    //
    //     }
    //     setIsLoading(false)
    // }

    function onSubmit(data) {
        console.log("data", data)
    }

    return (
        <FormWindow>
            <Header>
                <h1>Create a project</h1>
            </Header>
            <CreationForm onSubmit={ handleSubmit(onSubmit) }>
                <Row>

                    <Column>
                        <InputField
                            type="text"
                            name="Name"
                            inputName="projectName"
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
                        <label>Project visual</label>

                        <input
                            type='file'
                            id='imageUrl'
                            accept='image/*'
                            { ...register('image') }
                            onChange={ handleImageChange }/>

                        <label htmlFor='file'>

                            <Image src={ picture }/>
                            Preview
                        </label>
                    </Column>
                </Row>
                <Row>
                    <h3>Tasks</h3>

                </Row>
                <Row>
                    <FieldArray
                        {...{ control, register, defaultValues, getValues, setValue, errors }}
                    />





                </Row>
                <ButtonRow>


                    <RectangleButton
                        type="button"
                        onClick={() => reset(defaultValues)}
                        buttonSize="btn--large"
                        buttonStyle="btn--danger--solid"
                    >
                        Reset
                    </RectangleButton>
                    <RectangleButton
                        type="submit"
                        buttonSize="btn--large"
                        buttonStyle="btn--succes--solid"
                        disabled={ !!error.projectName || !!error.description }

                    >
                        Submit
                    </RectangleButton>
                </ButtonRow>


            </CreationForm>

        </FormWindow>
    );
}

const Header = styled.div`

`
const Image = styled.img`
  width: 100%;
  height: 200px;
  aspect-ratio: 1/1;

`
const ButtonRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: -20px;
`

const Column = styled.div`
  display: flex;
  height: max-content;
  flex-direction: column;
  margin: 1rem;
  width: 100%;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem;
  //flex: 1 5;
  width: 100%;
`

const CreationForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  //align-items: center;
  justify-content: center;
  flex-direction: column;
`
/** Created by ownwindows on 10-01-22 **/
