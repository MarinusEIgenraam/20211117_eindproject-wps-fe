////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from "axios";
import { UtilityContext } from "../../context/UtilityProvider";
import { AuthContext } from "../../context/AuthProvider";
import { getOneProject } from "../../services/controllers/Projects";
import { getProjectComments } from "../../services/controllers/Comments";
import { useParams } from "react-router-dom";
import { FormWindow } from "../shared/styling/Form";
import { getOneUser } from "../../services/controllers/Users";
import { PageContainer } from "../shared/styling/Layout";
import { getProfileImage } from "../../services/controllers/Images";
import ListProject from "./Portal/ListProject";
import ListBlog from "./Portal/ListBlog";

////////////////////
//// Environmental

////////////////////
//// External

export default function UserProfile() {
    const source = axios.CancelToken.source();
    const { setIsLoading } = useContext(UtilityContext);
    const { isAuth, user, setRole } = useContext(AuthContext);
    const [ hasError, setHasError ] = useState(false);
    const [ userDetails, setUserDetails ] = useState('');
    const [ profileImage, setProfileImage ] = useState('');
    const { username } = useParams();

    useEffect(() => {

        const getData = async () => {
            setHasError(false);
            setIsLoading(true)
            const userData = await getOneUser(username)
            const userProfileImage = await getProfileImage(username)
            setUserDetails(userData)
            setProfileImage(userProfileImage)
            console.log(userProfileImage)
            setIsLoading(false)
        }

        getData()
        console.log(userDetails)

        return function clearData() {
            source.cancel();
        };

    }, []);

    return (
        <PageContainer>
            <FormWindow>
                <h2 className="centered">{userDetails.username}</h2>
                <h5 className="centered">{setRole(userDetails.authorities)}</h5>
            </FormWindow>

            <ListProject/>
            <ListBlog/>
        </PageContainer>
    );
}

const NewUserProfile = styled.div`

`

/** Created by ownwindows on 04-01-22 **/
