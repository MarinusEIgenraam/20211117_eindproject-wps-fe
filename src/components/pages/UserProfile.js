////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { UtilityContext } from "../../context/UtilityProvider";
import { AuthContext } from "../../context/AuthProvider";
import { useParams } from "react-router-dom";
////////////////////
//// Environmental
import { FormWindow } from "../../styles/Form";
import { getOneUser } from "../../services/controllers/Users";
import { PageContainer } from "../../styles/Layout";
import { getProfileImage } from "../../services/controllers/Images";
import ProjectList from "../feature/Projects/ProjectList";
import BlogList from "../feature/Blogs/BlogList";

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
                <h2 className="centered">{ userDetails.username }</h2>
                <h5 className="centered">{ setRole(userDetails.authorities) }</h5>
            </FormWindow>

            <ProjectList/>
            <BlogList/>
        </PageContainer>
    );
}

/** Created by ownwindows on 04-01-22 **/
