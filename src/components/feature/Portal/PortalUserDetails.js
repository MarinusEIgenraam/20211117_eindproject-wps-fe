////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
////////////////////
//// Environmental
import {
    Form,
    FormBreak,
    FormError,
    FormInput,
    FormInputWrap,
    FormLabel,
    FormSection
} from "../../../styles/FormStyles";
import { AuthContext } from "../../../context/AuthProvider";
import { FormWindow } from "../../../styles/Form";
import RectangleButton from "../../shared/elements/clickables/RectangleButton";
import { UtilityContext } from "../../../context/UtilityProvider";
import { getProfileImage, uploadProfileImage } from "../../../services/controllers/Images";
import axios from "axios";
import { changePassword } from "../../../services/controllers/Auth";
import { Hero } from "../../../styles/Images";
import { IconBox } from "../../../styles/Icons";
import Tooltip from "../../shared/elements/messages/Tooltip";
import { IoIosSend } from "react-icons/all";

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
        const profileImage = await uploadProfileImage(setHasError, setIsLoading, values.file[0])
        console.log(profileImage)
    }

    const onPasswordChange = async (values) => {
        console.log(values)
        const message = await changePassword(setRegisterSucces, setHasError, setIsLoading, values)
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

    return (
        <FormWindow>
            <h2 className="centered">
                Settings
            </h2>
            <Form className="editForm" onSubmit={ handleSubmit(onPasswordChange) }>

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
                            <FormInput>
                                <FormLabel>
                                    <label htmlFor="password">repeat your password</label>
                                    <FormError role="alert">
                                        { errors.password && "Enter your old password!" }
                                    </FormError>
                                </FormLabel>
                                <input
                                    type="password"
                                    name="passwordSecond"
                                    id="oldPasswordSecond"
                                    { ...register("oldPasswordSecond", {
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
                        { registerSucces &&
                            <h6>Your password has been changed</h6>

                        }
                    </IconBox>


                </FormSection>

            </Form>

            <Form className="editForm" onSubmit={ imageSubmit(onSubmit) }>

                <FormBreak>
                    <FormInput>
                        <FormLabel>
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
                        <RectangleButton
                            onClick={ imageSubmit(onSubmit) }>Upload</RectangleButton>
                    </FormInput>

                </FormBreak>
                <FormBreak>
                    <FormInput>
                        <Hero image={ `http://localhost:8080/files/${ user.username }/download` }/>

                    </FormInput>
                </FormBreak>
            </Form>


        </FormWindow>
    )
}

/** Created by ownwindows on 20-01-22 **/
