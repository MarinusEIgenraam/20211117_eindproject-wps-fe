////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { UtilityContext } from "../../../context/UtilityProvider";
import styled from 'styled-components';

////////////////////
//// Environmental
import { HeaderContainer } from "../../shared/elements/TextLayout";
import { H1, H2, SubTitle } from "../../shared/elements/Text";
import { PageContainer, PageHeader } from "../../shared/elements/Layout";
import Blog from "./Blog";
import CreateBlog from "../../layout/forms/Blog/CreateBlog";
import { AuthContext } from "../../../context/AuthProvider";
import RectangleButton from "../../shared/elements/clickables/RectangleButton/RectangleButton";
import { BsFillSunFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/all";

const { REACT_APP_API_URL } = process.env;
////////////////////
//// External

export default function BlogOverview() {
    const { setIsLoading, isLoading } = useContext(UtilityContext);
    const { isAuth, user } = useContext(AuthContext);
    const [ loadedBlogs, setLoadedBlogs ] = useState();
    const [ hasError, setHasError ] = useState(false);
    const [ writeBlog, setWriteBlog ] = useState(false)
    const API_URL = `${ REACT_APP_API_URL }blogs/all`;

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function getData() {
            setHasError(false);
            setIsLoading(true)


            try {
                const result = await axios.get(API_URL, { cancelToken: source.token, });

                setLoadedBlogs(result.data);
                console.log(result)

            } catch (e) {
                console.error(e);
                setHasError(true);
            }
            console.log(loadedBlogs)
            setIsLoading(false)
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


            { (user?.authorities === "Project lord" && !writeBlog ) ?
                <RectangleButton
                    type="button"
                    onClick={ () => setWriteBlog(true) }
                    buttonSize="btn--large"
                    buttonStyle="btn--danger--solid"
                >
                    NEW
                </RectangleButton>
                :
                <AiOutlineClose onClick={ () => setWriteBlog(false) } size={ 30 }/>

            }
            { writeBlog &&
                <CreateBlog/>
            }

            <BlogsList className="clearfix">
                { loadedBlogs &&
                    loadedBlogs.map((blog) => {
                        return (
                            <Blog blog={ blog }/>

                        );
                    })
                }

            </BlogsList>
        </PageContainer>

    )
}

const BlogsList = styled.div`
  width: 70vw;
  margin-top: 2rem;
  padding: 1rem;
  column-count: 1;
  column-gap: 1em;

  @media (min-width: 768px) {
    column-count: 2;
    column-gap: 1em;
  }
  @media (min-width: 1000px) {
    column-count: 3;
    column-gap: 1em;
  }
`


/** Created by ownwindows on 04-01-22 **/
