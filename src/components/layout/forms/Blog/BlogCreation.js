////////////////////
//// Build
import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { useFieldArray, useForm } from "react-hook-form";
import { UtilityContext } from "../../../../context/UtilityProvider";
import FormWindow from "../../containers/FormWindow";
import InputField from "../../../shared/elements/FormElements/InputField";
import InputArea from "../../../shared/elements/FormElements/InputArea";
import RectangleButton from "../../../shared/elements/clickables/RectangleButton/RectangleButton";
import { AuthContext } from "../../../../context/AuthProvider";
import { postBlog } from "../../../../services/controllers/requests";

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

        const request = {
            ...values,
            blogOwnerId: user.username,
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
            <Header>
                <h1>Write a blog</h1>
            </Header>
            <CreationForm onSubmit={ handleSubmit(onSubmit) }>
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
const ButtonBox = styled.section`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
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
  
  justify-content: center;
  flex-direction: column;
  div div div label {
    visibility: visible;
  }
`
/** Created by ownwindows on 10-01-22 **/
