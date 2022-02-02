////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/all";
import axios from "axios";
////////////////////
//// Environmental
import { UtilityContext } from "../../../context/UtilityProvider";
import { CenteredSubHeader } from "../../../styles/Typography";
import { TaskListItem, UnsortedList } from "../../../styles/List";
import RectangleButton from "../../shared/elements/clickables/RectangleButton";
import { AuthContext } from "../../../context/AuthProvider";
import ProjectCreate from "../Projects/ProjectCreate";
import { Container, DetailRow } from "../../../styles/Layout";
import { getBlogsFor } from "../../../services/controllers/Blogs";
import BlogCreate from "./BlogCreate";

export default function BlogList() {
    const { setIsLoading, setHasError } = useContext(UtilityContext);
    const { isAuth, user } = useContext(AuthContext);
    const [ writeProject, setWriteProject ] = useState(false);
    const [ categoryUri, setCategoryUri ] = useState('');

    const [ loadedBlogs, setLoadedBlogs ] = useState();
    const [ blogCategory, setBlogCategory ] = useState('');

    useEffect(() => {
        const source = axios.CancelToken.source();
        const token = localStorage.getItem('token');
        if (blogCategory) {
            setCategoryUri(`?categoryId=${ blogCategory }`)
        }

        async function getData() {
            setHasError(false);
            setIsLoading(true)

            const response = await getBlogsFor(setHasError, setIsLoading, token, user)
            {
                response && setLoadedBlogs(response.data.content)
            }
        }

        getData()

        return function clearData() {
            source.cancel();
        };

    }, [ blogCategory ]);

    const handleSearch = (event) => {
    }


    return (
        <Container>
            <CenteredSubHeader>
                Your blogs
            </CenteredSubHeader>
            <UnsortedList>
                { loadedBlogs && loadedBlogs.map((blog, index) => (
                    <TaskListItem to={ `/project/${ blog.id }` } key={ index }>
                        <h6> { blog.blogName } </h6>
                        <DetailRow>
                            <h6>{ blog.startTime } <span
                                className="light">| { blog.blogOwner.username } </span>
                            </h6>
                        </DetailRow>


                    </TaskListItem>
                )) }
            </UnsortedList>
            { ( user?.authorities === "Project lord" | "Project manager" && !writeProject ) ?
                <RectangleButton
                    type="button"
                    onClick={ () => setWriteProject(true) }
                    buttonSize="btn--medium"
                    buttonStyle="btn--special--solid"
                >
                    NEW
                </RectangleButton>
                :
                <AiOutlineClose onClick={ () => setWriteProject(false) } size={ 30 }/>

            }
            { writeProject &&
                <BlogCreate/>
            }
        </Container>
    )
}


/** Created by ownwindows on 18-01-22 **/
