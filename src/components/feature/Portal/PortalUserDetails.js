////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
////////////////////
//// Environmental
import {
    Form,
    FormBreak, FormEdit, FormEditBreak,
    FormError,
    FormInput,
    FormInputWrap,
    FormLabel,
    FormSection
} from "../../../styles/FormStyles";
import { AuthContext } from "../../../context/AuthProvider";
import { ButtonBox, FormWindow } from "../../../styles/Form";
import RectangleButton from "../../shared/elements/clickables/RectangleButton";
import { UtilityContext } from "../../../context/UtilityProvider";
import { getProfileImage, uploadProfileImage } from "../../../services/controllers/Images";
import axios from "axios";
import { changePassword } from "../../../services/controllers/Auth";
import { ButtonRow } from "../../../styles/Layout";
import { ProjectHero } from "../../../styles/Images";
import { IconBox } from "../../../styles/Icons";
import Tooltip from "../../shared/elements/messages/Tooltip";
import { IoIosSend } from "react-icons/all";

export default function PortalUserDetails() {
    const [ changeUsername, setChangeUsername ] = useState();
    const source = axios.CancelToken.source();
    const token = localStorage.getItem('token');
    const { user } = useContext(AuthContext);
    const { setHasError, setIsLoading } = useContext(UtilityContext);
    const [ picture, setPicture ] = useState('')
    const [ passwordSucces, setPasswordSucces ] = useState()
    const [ loadedImage, setLoadedImage ] = useState('')
    const [ registerSucces, setRegisterSucces ] = useState(false);
    const {
        control,
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
        setValue
    } = useForm({});

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
        setIsLoading(true)
        const profileImage = await uploadProfileImage(setHasError, setIsLoading, values.file[0])
        setIsLoading(false)
        console.log(profileImage)
    }

    const onPasswordChange = async (values) => {
        const message = await changePassword(setRegisterSucces, setHasError, setIsLoading, values)
        setPasswordSucces(message)
    }

    return (
        <FormWindow>
            <h2 className="centered">
                Settings
            </h2>
            <Form className="editForm">
                <FormInputWrap>


                    <FormBreak>
                        <FormInput>
                            <FormLabel>
                                <label htmlFor="email">Email</label>
                                <FormError role="alert">
                                    { errors.email && "Enter your email address!" }
                                </FormError>
                            </FormLabel>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="..."
                                defaultValue={ user.email }
                                { ...register("email", {
                                    required: true
                                }) }
                            />
                        </FormInput>
                    </FormBreak>


                </FormInputWrap>
            </Form>
            <Form className="editForm" onSubmit={ handleSubmit(onPasswordChange)}>

                <FormSection>
                    <FormInputWrap>
                        <FormBreak>

                            <FormInput>
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
                        </FormBreak>
                        <FormBreak>
                            <FormInput>
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
                        </FormBreak>
                    </FormInputWrap>
                    <IconBox className="bottom">
                        <Tooltip text="Submit">
                            <IoIosSend
                                size={ 22 }
                                type="submit"
                                onClick={ handleSubmit(onPasswordChange) }
                            />
                        </Tooltip>
                        {registerSucces &&
                            <h6>Your password has been changed</h6>

                        }
                    </IconBox>


                </FormSection>

            </Form>

            <Form className="editForm" onSubmit={ handleSubmit(onSubmit) }>

                <FormBreak>
                    <FormInput>
                        <FormLabel>
                            <label htmlFor="image">Profile image</label>
                            <FormError role="alert">
                                { errors.imageUrl && "Please provide a jpg or png image!" }
                            </FormError>
                        </FormLabel>
                        <input
                            type="file"
                            name="file"
                            id="file"
                            { ...register("file") }
                            onChange={ handleImageChange }
                        />
                        <RectangleButton type="submit">Upload</RectangleButton>
                    </FormInput>

                </FormBreak>
            </Form>
            <ProjectHero image={ loadedImage}/>

            <ButtonBox>
                <RectangleButton
                    type="button"
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

        </FormWindow>
    )
}

/** Created by ownwindows on 20-01-22 **/
