////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
////////////////////
//// Environmental
import { UtilityContext } from "../../../context/UtilityProvider";
import { CenteredSubHeader } from "../../../styles/Typography";
import { ProjectListItem, UnsortedList } from "../../../styles/List";
import { AuthContext } from "../../../context/AuthProvider";
import { Container, DetailRow } from "../../../styles/Layout";
import { getBlogsFor } from "../../../services/controllers/Blogs";
import { LinkHeader } from "../../../styles/Navigation";

export default function BlogList() {
    const { setIsLoading, setHasError } = useContext(UtilityContext);
    const { isAuth, user } = useContext(AuthContext);
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
            console.log(response);
        }

        getData()

        return function clearData() {
            source.cancel();
        };

    }, [ blogCategory ]);

    const handleSearch = (event) => {
    }


    return (

<>
    { (loadedBlogs && loadedBlogs.length > 0) &&
        <Container>
            <CenteredSubHeader>
                Your blogs
            </CenteredSubHeader>
            <UnsortedList>
                { loadedBlogs && loadedBlogs.map((blog, index) => (
                    <ProjectListItem key={ index }>
                        <LinkHeader className="listItem" to={ `/blogs/${ blog.blogId }` }>
                            { blog.blogName }
                        </LinkHeader>
                        <DetailRow className="listItem">
                            <h6>{ blog.startTime } <span
                                className="light">| { blog.blogOwner.username } </span>
                            </h6>
                        </DetailRow>


                    </ProjectListItem>
                )) }
            </UnsortedList>
        </Container>
    }
</>
    )
}


/** Created by ownwindows on 18-01-22 **/
