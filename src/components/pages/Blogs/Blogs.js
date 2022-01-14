////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from "axios";
import { UtilityContext } from "../../../context/UtilityProvider";
////////////////////
//// Environmental
import PageContainer from "../../layout/containers/PageContainer";
import PageHeader from "../../layout/containers/PageHeader";
import Blog from "./Blog";

const { REACT_APP_API_URL } = process.env;
////////////////////
//// External

export default function Blogs() {
    const { setIsLoading } = useContext(UtilityContext);
    const [ loadedBlogs, setLoadedBlogs ] = useState();
    const [ hasError, setHasError ] = useState(false);
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

    return (
        <PageContainer>
            <PageHeader>
                <h1>Blogs</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam delectus incidunt mollitia
                    quisquam veritatis? Ducimus eum, ipsam laboriosam minima sit vero voluptates. Ab consequatur cum
                    cumque delectus ducimus eveniet hic ipsum libero maxime molestias nam natus nobis numquam omnis,
                    quia quis sint sit unde, veniam vitae? Dolore impedit molestiae quo!
                </p>
            </PageHeader>
            <BlogsContainer>
                { loadedBlogs &&
                    loadedBlogs.map((blog) => {
                        return (
                            <Blog blog={ blog }/>
                        );
                    })
                }
            </BlogsContainer>
        </PageContainer>

    )
}

const BlogsContainer = styled.div`
    display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`
/** Created by ownwindows on 04-01-22 **/
