////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
////////////////////
//// Environmental
import { FormColumn, FormError, FormInput, FormInputWrap, FormLabel } from "../../../styles/FormStyles";
import { AuthContext } from "../../../context/AuthProvider";
import RectangleButton from "../../shared/elements/clickables/RectangleButton";
import { UtilityContext } from "../../../context/UtilityProvider";
import { getProfileImage, uploadProfileImage } from "../../../services/controllers/Images";
import axios from "axios";
import { changePassword } from "../../../services/controllers/Auth";
import { Hero, WindowVisual } from "../../../styles/Images";
import { IconBox } from "../../../styles/Icons";
import Tooltip from "../../shared/elements/messages/Tooltip";
import { IoIosSend } from "react-icons/all";
import styled from "styled-components";
import { BorderedWindow, VisualContainer } from "../../../styles/Windows";
import { QUERIES } from "../../../services/helpers/mediaQueries";
import blogBackground from "../../../assets/images/visual_Blogs.svg";
import { Heading, SubHeading } from "../../../styles/Typography";
import { ButtonBox } from "../../../styles/Form";
import { getBlogs } from "../../../services/controllers/Blogs";

export default function PortalUserDetails() {
    const [ changeUsername, setChangeUsername ] = useState();
    const source = axios.CancelToken.source();
    const token = localStorage.getItem('token');
    const { user } = useContext(AuthContext);
    const { setHasError, setIsLoading, setCreationCount, creationCount } = useContext(UtilityContext);
    const [ picture, setPicture ] = useState('')
    const [ passwordSucces, setPasswordSucces ] = useState()
    const [ loadedImage, setLoadedImage ] = useState('')
    const [ registerSucces, setRegisterSucces ] = useState(false);
    const [editCount, setEditCount] = useState(creationCount)



    useEffect(() => {

        const getData = async () => {
            const response = await getProfileImage(setHasError, setIsLoading, user.username)
            {
                response && setLoadedImage(response)
            }
            console.log(response)
        }

        getData()

        return function clearData() {
            source.cancel();
        };

    }, []);

    const handleImageChange = (event) => {
        if (!event || !event.target.files) {
            return
        }
        const imageFile = event.target.files[0]
        const image = URL.createObjectURL(imageFile)
        setPicture(image)
    }

    const onSubmit = async (values) => {
        const profileImage = await uploadProfileImage(setEditCount, setHasError, setIsLoading, values.file[0])
    }

    const onPasswordChange = async (values) => {
        console.log(values)
        const message = await changePassword(setEditCount, setRegisterSucces, setHasError, setIsLoading, values)
    }

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: "onBlur",
    });

    const {
        register: imageRegister,
        formState: { errors: imageErrors },
        handleSubmit: imageSubmit,
    } = useForm({
        mode: "onBlur",
    });

    useEffect(() => {
        console.log(creationCount)

    }, [editCount]);

    return (
        <UserDetailWindow>
            <VisualContainer>

                <WindowVisual src={ blogBackground }/>
            </VisualContainer>
            <FormColumn>
                <SubHeading>Profile settings</SubHeading>

                <Form className="editForm" onSubmit={ handleSubmit(onPasswordChange) }>

                    <PasswordForm>
                        <FormInput area="oldPassword">
                            <FormLabel>
                                <label htmlFor="password">Old password</label>
                                <FormError role="alert">
                                    { errors.password && "Enter your old password!" }
                                </FormError>
                            </FormLabel>
                            <input
                                type="password"
                                name="password"
                                id="oldPassword"
                                { ...register("oldPassword", {
                                    required: true
                                }) }
                            />
                        </FormInput>
                        <FormInput area="newPassword">
                            <FormLabel>
                                <label htmlFor="password">New password</label>
                                <FormError role="alert">
                                    { errors.password && "Enter your new password!" }
                                </FormError>
                            </FormLabel>
                            <input
                                type="password"
                                name="password"
                                id="newPassword"
                                { ...register("newPassword", {
                                    required: true
                                }) }
                            />
                        </FormInput>
                        <FormInput area="newPasswordSecond">
                            <FormLabel>
                                <label htmlFor="password">repeat your password</label>
                                <FormError role="alert">
                                    { errors.password && "Enter your new password!" }
                                </FormError>
                            </FormLabel>
                            <input
                                type="password"
                                name="passwordSecond"
                                id="newPasswordSecond"
                                { ...register("newPasswordSecond", {
                                    required: true
                                }) }
                            />
                        </FormInput>
                        <IconBox area="submit" className="bottom">
                            <Tooltip text="Submit">
                                <IoIosSend
                                    size={ 22 }
                                    type="submit"
                                    onClick={ handleSubmit(onPasswordChange) }
                                />
                            </Tooltip>
                            { registerSucces &&
                                <h6>Your password has been changed</h6>

                            }
                        </IconBox>


                    </PasswordForm>

                </Form>

                <Form className="editForm" onSubmit={ imageSubmit(onSubmit) }>

                    <ImageForm>

                        <FormInput>
                            <FormLabel area="imageUrl">
                                <label htmlFor="image">Profile image</label>
                                <FormError role="alert">
                                    { imageErrors.imageUrl && "Please provide a jpg or png image!" }
                                </FormError>
                            </FormLabel>
                            <input
                                type="file"
                                name="file"
                                // accept="image/png, image/jpeg"
                                id="file"
                                { ...imageRegister("file") }
                                onChange={ handleImageChange }
                            />
                        </FormInput>
                        <ImagePreview image={ `http://localhost:8080/files/${ user.username }/download` }/>
                        <ButtonBox area="submit">

                            <RectangleButton onClick={ imageSubmit(onSubmit) }>Upload</RectangleButton>
                        </ButtonBox>
                    </ImageForm>
                </Form>
            </FormColumn>

        </UserDetailWindow>
    )
}
const ImagePreview = styled(Hero)`
  grid-area: imagePreview;
  width: 100%;

`
const UserDetailWindow = styled(BorderedWindow)`
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

const ImageForm = styled.section`
  display: grid;
  grid-column-gap: 0;
  grid-template-columns: 1fr;
  grid-template-areas:
      "imageUrl"
      "imagePreview"
      "submit"
;
  @media ${ QUERIES.tablet } {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
    grid-template-areas:
      "imageUrl imagePreview"
      "submit imagePreview"
  ;
  }
`

const PasswordForm = styled.section`
  display: grid;
  grid-column-gap: 0;
  grid-template-columns: 1fr;
  grid-template-areas:
      "newPassword"
      "newPasswordSecond"
      "oldPassword"
      "submit"
;
  @media ${ QUERIES.tablet } {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
    grid-template-areas:
      "newPassword newPasswordSecond"
      "oldPassword submit"
  ;
  }
`
const Form = styled.form`
`

/** Created by ownwindows on 20-01-22 **/
