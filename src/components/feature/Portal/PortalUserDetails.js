////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
////////////////////
//// Environmental
import { FormColumn, FormError, FormInput, FormLabel } from "../../../styles/FormStyles";
import { AuthContext } from "../../../context/AuthProvider";
import RectangleButton from "../../shared/elements/clickables/RectangleButton";
import { UtilityContext } from "../../../context/UtilityProvider";
import { getProfileImage, uploadProfileImage } from "../../../services/controllers/Images";
import axios from "axios";
import { changePassword } from "../../../services/controllers/Auth";
import { WindowVisual } from "../../../styles/Images";
import { IconBox } from "../../../styles/Icons";
import Tooltip from "../../shared/elements/messages/Tooltip";
import { IoIosSend } from "react-icons/all";
import styled from "styled-components";
import { BorderedWindow, VisualContainer } from "../../../styles/Windows";
import { QUERIES } from "../../../services/helpers/mediaQueries";
import securityVisual from "../../../assets/images/visual_security.svg";
import { SubHeading } from "../../../styles/Typography";
import { ButtonBox } from "../../../styles/Form";

export default function PortalUserDetails() {
    const source = axios.CancelToken.source();
    const { user } = useContext(AuthContext);
    const utilityContext = useContext(UtilityContext);
    const [ profileImageUrl, setProfileImageUrl ] = useState(``)

    const [ picture, setPicture ] = useState('')
    const [ loadedImage, setLoadedImage ] = useState('')
    const [ registerSucces, setRegisterSucces ] = useState(false);


    useEffect(() => {

        const getData = async () => {
            setLoadedImage(getProfileImage(utilityContext, user.username))
        }

        getData()
        console.log(utilityContext.creationCount)

        return function clearData() {
            source.cancel();
        };

    }, [ utilityContext.creationCount ]);

    const handleImageChange = (event) => {
        if (!event || !event.target.files) {
            return
        }
        const imageFile = event.target.files[0]
        const image = URL.createObjectURL(imageFile)
        setPicture(image)
    }

    const onSubmit = (values) => {
        utilityContext.setCreationCount(utilityContext.creationCount++)
        return uploadProfileImage(utilityContext, values.file[0])
    }

    const onPasswordChange = (values) => {
        console.log(values)
        return changePassword(utilityContext, values)
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

    }, [ utilityContext.creationCount ]);

    return (
        <UserDetailWindow>
            <VisualContainer>

                <WindowVisual src={ securityVisual }/>
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
                        <ImagePreview id="preview" key={ Date.now() }
                                      src={ `http://localhost:8080/files/${ user.username }/download` }/>
                        <ButtonBox area="submit">

                            <RectangleButton
                                buttonSize="btn--large"
                                buttonStyle="btn--succes--solid"
                                onClick={ imageSubmit(onSubmit) }>Upload</RectangleButton>
                        </ButtonBox>
                    </ImageForm>
                </Form>
            </FormColumn>

        </UserDetailWindow>
    )
}
export const Hero = styled.img`
  background-size: cover;
  border: solid var(--box-border-medium) ${ props => props.theme.border };
  height: 200px;
  width: 200px;
  aspect-ratio: 1 / 1;
`

const ImagePreview = styled(Hero)`
  grid-area: imagePreview;

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
      "submit";
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
      "submit";
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
