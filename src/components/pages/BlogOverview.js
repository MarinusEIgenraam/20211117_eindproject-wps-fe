////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { AiOutlineClose } from "react-icons/all";

////////////////////
//// Environmental
import { UtilityContext } from "../../context/UtilityProvider";
import { H1, SubTitle } from "../../styles/Typography";
import { PageContainer, PageHeader } from "../../styles/Layout";
import Blog from "./Blog";
import BlogCreate from "../feature/Blogs/BlogCreate";
import { AuthContext } from "../../context/AuthProvider";
import RectangleButton from "../shared/elements/clickables/RectangleButton";
import { BlogOverviewList } from "../../styles/List";
import { getBlogs } from "../../services/controllers/Blogs";

export default function BlogOverview() {
    const { setIsLoading, isLoading } = useContext(UtilityContext);
    const { isAuth, user } = useContext(AuthContext);
    const [ loadedBlogs, setLoadedBlogs ] = useState();
    const [ hasError, setHasError ] = useState(false);
    const [ writeBlog, setWriteBlog ] = useState(false)

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function getData() {
            const response = await getBlogs(setIsLoading, setHasError)
            setLoadedBlogs(response.data);
        }

        getData()

        return function clearData() {
            source.cancel();
        };

    }, []);

    function closeWindow(is) {
        if (isLoading) {
            return;
        } else {
            setWriteBlog(false)
        }
    }

    return (
        <PageContainer>
            <H1>
                Blogs
            </H1>
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
                <RectangleButton
                    type="button"
                    onClick={ () => setWriteBlog(true) }
                    buttonSize="btn--large"
                    buttonStyle="btn--danger--solid"
                >
                    NEW
                </RectangleButton>
            }
            { writeBlog &&
                <>
                    <AiOutlineClose onClick={ () => setWriteBlog(false) } size={ 30 }/>
                    <BlogCreate/>
                </>
            }


            <BlogOverviewList className="clearfix">
                { loadedBlogs &&
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
