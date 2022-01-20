////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { DetailContainer, H2 } from "../elements/Text";
import { Form, FormBreak, FormError, FormInput, FormLabel } from "../elements/FormStyles";
import { useForm } from "react-hook-form";
import axios from "axios";
import { UtilityContext } from "../../../context/UtilityProvider";
import { AuthContext } from "../../../context/AuthProvider";
import RectangleButton from "../elements/clickables/RectangleButton/RectangleButton";
import { QUERIES } from "../../../services/helpers/mediaQueries";
import { FooterContainer } from "../elements/FooterStyles";

////////////////////
//// Environmental
const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;

////////////////////
//// External

export default function Footer() {
    const [ fixed, setFixed ] = useState(true);
    const { setIsLoading } = useContext(UtilityContext);
    const [ error, toggleError ] = useState(false);
    const [ succes, toggleSucces ] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange'
    });
    const { login, isAuth, user } = useContext(AuthContext);


    const changeBackground = () => {
        if (window.scrollY <= 1) {
            setFixed(true);
        } else {
            setFixed(false)
        }
    };

    async function onSubmit(event) {
        toggleError(false);
        setIsLoading(true);

        try {

            const result = await axios.post(REACT_APP_AUTH, {
                username: event.username,
                password: event.password,
            });

            console.log(result)
            login(result.data.jwt);

        } catch (e) {
            console.error(e)

            toggleError(true);
        }

    }

    const enterSubmit = (e) => {
        if (e.key === "Enter" && e.shiftKey == false) {
            const data = { content: e.target.value };
            return handleSubmit(onSubmit(data));
        }
    };
    window.addEventListener('scroll', changeBackground);

    return (
        <FooterContainer fixed={ fixed }>
            <LoginContainer>
                { isAuth ?
                    <span>Welcome back { user.username }</span>
                    :
                    <Form id="footerForm" onSubmit={ handleSubmit(onSubmit) }>
                        <FormInput>
                            <FormLabel>
                                <FormError role="alert">
                                    { errors.username && "Enter your username!" }
                                </FormError>
                            </FormLabel>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Username"
                                { ...register("username", {
                                    required: true
                                }) }
                            />
                        </FormInput>
                        <FormInput>
                            <FormLabel>
                                <FormError role="alert">
                                    { errors.password && "Please provide your correct password!" }
                                </FormError>
                            </FormLabel>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                onKeyPress={enterSubmit}
                                placeholder="Password"
                                { ...register("password") }
                            />
                        </FormInput>
                    </Form>

                }
            </LoginContainer>
            <FooterWrap>
                <ContactContainer>
                    <h4>Contact</h4>
                    <span>Marinus Eigenraam</span>
                    <p>rinuseigenraam@gmail.com</p>
                </ContactContainer>

            </FooterWrap>

        </FooterContainer>
    )
}

const SocialsContainer = styled.div`
    justify-content: space-between;
  min-height: 5rem;
  z-index: auto;
  position: relative;
`
const ContactContainer = styled.div`
  padding: 0 0.5rem;

`

const LoginContainer = styled.div`
  
  form {

    display: flex;
    align-items: end;
    justify-content: start;
  }

  > form div > input {
    background: transparent;
    height: 2rem;

  }
`


export const FooterWrap = styled.div`
  display: flex;
  
  max-width: 100%;


  & > *,
  div > * {
    display: flex;
    flex-direction: column;

    @media ${QUERIES.tabletMini} {
      align-items: flex-start;
    }
  }
`;

/** Created by ownwindows on 15-01-22 **/

