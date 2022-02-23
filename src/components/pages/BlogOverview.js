////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { AiOutlineClose } from "react-icons/all";

////////////////////
//// Environmental
import { UtilityContext } from "../../context/UtilityProvider";
import { CenteredHeader, SubTitle } from "../../styles/Typography";
import { PageContainer, PageHeader } from "../../styles/Layout";
import Blog from "../feature/Blogs/Blog";
import BlogCreate from "../feature/Blogs/BlogCreate";
import { AuthContext } from "../../context/AuthProvider";
import RectangleButton from "../shared/elements/clickables/RectangleButton";
import { BlogOverviewList } from "../../styles/List";
import { getBlogs } from "../../services/controllers/Blogs";
import { ButtonBox } from "../../styles/Form";
import { getProjectsFor } from "../../services/controllers/Projects";

export default function BlogOverview() {
    const utilityContext = useContext(UtilityContext);
    const { user } = useContext(AuthContext);
    const [ loadedBlogs, setLoadedBlogs ] = useState({});
    const [ writeBlog, setWriteBlog ] = useState(false)
    const [pageable, setPageable] = useState('');

    useEffect(() => {
        const source = axios.CancelToken.source();

        getBlogs(utilityContext, pageable).then((response) => setLoadedBlogs(response.data.content))


        console.log(loadedBlogs)

        return function clearData() {
            source.cancel();
        };


    }, [utilityContext.creationCount]);

    // function closeWindow(is) {
    //     if (utilityContext.isLoading) {
    //         return;
    //     } else {
    //         setWriteBlog(false)
    //     }
    // }



    return (
        <PageContainer>
            <CenteredHeader>
                Blogs
            </CenteredHeader>
            <SubTitle>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </SubTitle>
            <PageHeader>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, nam, unde. Ad aspernatur deserunt,
                odit quia rerum tempore ut. Aliquid culpa facilis ipsa minus. Adipisci architecto, atque deserunt
                ducimus eligendi expedita hic laudantium necessitatibus nesciunt, non obcaecati quis, repellat saepe sed
                velit. Adipisci amet animi debitis dolor dolores eaque iusto laboriosam magni omnis pariatur possimus
                reprehenderit, sed soluta, tempore voluptatibus.
            </PageHeader>


            { ( user?.authorities === "Project lord" && !writeBlog ) &&
                <ButtonBox>
                    <RectangleButton
                        type="button"
                        onClick={ () => setWriteBlog(true) }
                        buttonSize="btn--large"
                        buttonStyle="btn--danger--solid"
                    >
                        NEW
                    </RectangleButton>
                </ButtonBox>

            }
            { writeBlog &&
                <>
                    <ButtonBox>

                        <AiOutlineClose onClick={ () => setWriteBlog(false) } size={ 30 }/>
                    </ButtonBox>
                    <BlogCreate/>
                </>
            }


            <BlogOverviewList className="clearfix">
                { loadedBlogs.length > 0 &&
                    loadedBlogs.map((blog, index) => {
                        return (
                            <Blog blog={ blog } key={ index }/>

                        );
                    })
                }

            </BlogOverviewList>
        </PageContainer>

    )
}


/** Created by ownwindows on 04-01-22 **/
