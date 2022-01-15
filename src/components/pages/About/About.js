////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import { UtilityContext } from "../../../context/UtilityProvider";
import axios from "axios";
import AboutAdmin from "./AboutAdmin";
import { HeaderContainer } from "../../shared/elements/TextLayout";
import { H1 } from "../../shared/elements/Text";
import { ListWrapper } from "../../shared/elements/List";
import { AppWrapper } from "../../shared/elements/Layout";

////////////////////
//// Environmental
const { REACT_APP_API_URL } = process.env;
////////////////////
//// External

export default function About() {
    const { setIsLoading } = useContext(UtilityContext);
    const [ loadedAdmins, setLoadedAdmins ] = useState();
    const [ hasError, setHasError ] = useState(false);
    const [ category, setCategory ] = useState(false);

    const API_URL = `${ REACT_APP_API_URL }users/admins`;


    useEffect(() => {
        const source = axios.CancelToken.source();

        async function getData() {
            setHasError(false);
            setIsLoading(true)
            try {
                const result = await axios.get(API_URL, { cancelToken: source.token, });

                setLoadedAdmins(result.data);
                console.log(loadedAdmins)

            } catch (e) {
                console.error(e);
                setHasError(true);
            }
            console.log(loadedAdmins)
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
                <H1>About</H1>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam delectus incidunt mollitia
                quisquam veritatis? Ducimus eum, ipsam laboriosam minima sit vero voluptates. Ab consequatur cum
                cumque delectus ducimus eveniet hic ipsum libero maxime molestias nam natus nobis numquam omnis,
                quia quis sint sit unde, veniam vitae? Dolore impedit molestiae quo!
            </HeaderContainer>
            { loadedAdmins &&
                <ListWrapper>
                    { loadedAdmins.map((admin) => {
                        return (
                            <AboutAdmin admin={ admin }/>
                        );
                    })
                    }
                </ListWrapper>
            }
        </AppWrapper>
    )
}

/** Created by ownwindows on 04-01-22 **/
