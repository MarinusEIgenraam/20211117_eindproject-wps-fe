////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { Form, FormBreak, FormError, FormInput, FormInputWrap, FormLabel } from "../../../styles/FormStyles";
import { useForm } from "react-hook-form";
import { UtilityContext } from "../../../context/UtilityProvider";
import { AuthContext } from "../../../context/AuthProvider";
import { QUERIES } from "../../../services/helpers/mediaQueries";
import { loginUser } from "../../../services/controllers/Auth";

export default function Footer() {
    const [ fixed, setFixed ] = useState(true);
    const utilityContext = useContext(UtilityContext);
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange'
    });
    const { isAuth, user } = useContext(AuthContext);


    const changeBackground = () => {
        if (window.scrollY <= 1) {
            setFixed(true);
        } else {
            setFixed(false)
        }
    };

    async function onSubmit(event) {
        loginUser(utilityContext, event)
    }

    useEffect(() => {
        const mediaWatcher = window.addEventListener('scroll', changeBackground);

        return function cleanup() {
            mediaWatcher.removeEventListener('scroll', changeBackground)
        }
    },[])


    return (
        <FooterContainer hasError={ utilityContext.hasError } fixed={ fixed }>
            <FooterContent>

                <LoginContainer>
                    { isAuth ?
                        <span>Welcome back { user.username }</span>
                        :
                        <Form id="footerForm" onSubmit={ handleSubmit(onSubmit) }>
                            <FormInputWrap>
                                <FormBreak>
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
                                </FormBreak>
                                <FormBreak>
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

                                            placeholder="Password"
                                            { ...register("password") }
                                        />
                                    </FormInput>
                                </FormBreak>
                                <input className="invisible" type="submit"/>
                            </FormInputWrap>
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
            </FooterContent>

        </FooterContainer>
    )
}

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  
`
const ContactContainer = styled.div`
  padding: 0 0.5rem;

`

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
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

    @media ${ QUERIES.tabletMini } {
      flex-direction: row;
      > * {
        margin-right: 1em;
      }
    }
  }
`;

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  padding: 0.5rem 1rem;
  background: ${ props => props.theme.windowBackground };
  margin-top: 250px;
  width: 100%;
  transition: all 500ms;

  @media ${ QUERIES.tabletMini } {
    padding: 0rem 2rem;
  }

  ${ ({ hasError, fixed, theme }) => ( !hasError && fixed )
          ?
          {
            "position": "fixed;",
            "bottom": 0,
            "box-shadow": `0 5px 15px ${ theme.boxShadow }`
          }
          :
          {
            "position": "relative;",

          }
  }
  transition: 0;
`;


/** Created by ownwindows on 15-01-22 **/

