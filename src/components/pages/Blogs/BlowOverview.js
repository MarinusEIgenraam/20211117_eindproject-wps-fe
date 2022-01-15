////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { UtilityContext } from "../../../context/UtilityProvider";
////////////////////
//// Environmental
import Blog from "./Blog";
import { HeaderContainer } from "../../shared/elements/TextLayout";
import { H1 } from "../../shared/elements/Text";
import { AppWrapper, BlogsContainer } from "../../shared/elements/Layout";

const { REACT_APP_API_URL } = process.env;
////////////////////
//// External

export default function BlowOverview() {
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
        <AppWrapper>
            <HeaderContainer>
                <H1>Blogs</H1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam delectus incidunt mollitia
                    quisquam veritatis? Ducimus eum, ipsam laboriosam minima sit vero voluptates. Ab consequatur cum
                    cumque delectus ducimus eveniet hic ipsum libero maxime molestias nam natus nobis numquam omnis,
                    quia quis sint sit unde, veniam vitae? Dolore impedit molestiae quo!
                </p>
            </HeaderContainer>
            <BlogsContainer>
                { loadedBlogs &&
                    loadedBlogs.map((blog) => {
                        return (
                            <Blog blog={ blog }/>
                        );
                    })
                }
            </BlogsContainer>
        </AppWrapper>

    )
}

/** Created by ownwindows on 04-01-22 **/
