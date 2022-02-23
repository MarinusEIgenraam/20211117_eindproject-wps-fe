////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
////////////////////
//// Environmental
import { UtilityContext } from "../../../context/UtilityProvider";
import { HeaderBar, HeaderBox } from "../../../styles/Typography";
import { ProjectListItem, UnsortedList } from "../../../styles/List";
import { AuthContext } from "../../../context/AuthProvider";
import { Container, DetailRow } from "../../../styles/Layout";
import { getBlogsFor } from "../../../services/controllers/Blogs";
import { LinkHeader } from "../../../styles/Navigation";
import { AiFillProject } from "react-icons/all";

export default function BlogList() {
    const utilityContext = useContext(UtilityContext);
    const { isAuth, user } = useContext(AuthContext);
    const [ pageable, setPageable ] = useState('');

    const [ loadedBlogs, setLoadedBlogs ] = useState([]);
    const [ blogCategory, setBlogCategory ] = useState('');

    useEffect(() => {
        const source = axios.CancelToken.source();
        const token = localStorage.getItem('token');
        if (blogCategory) {
            setPageable(`?categoryId=${ blogCategory }`)
        }

        getBlogsFor(utilityContext, pageable, user).then((response) => setLoadedBlogs(response))

        return function clearData() {
            source.cancel();
        };

    }, [ blogCategory ]);

    return (

        <>
            { loadedBlogs.length > 0 &&
                <Container>
                    <HeaderBar>
                        <h3>
                            Your blogs
                        </h3>
                        <div>

                            { loadedBlogs.length } <AiFillProject size={ 20 }/>
                        </div>
                    </HeaderBar>
                    <UnsortedList>
                        { loadedBlogs && loadedBlogs.map((blog, index) => (
                            <ProjectListItem key={ index }>
                                <HeaderBox>
                                    <LinkHeader className="listItem" to={ `/blogs/${ blog.blogId }` }>
                                        { blog.blogName }
                                    </LinkHeader>
                                </HeaderBox>
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
