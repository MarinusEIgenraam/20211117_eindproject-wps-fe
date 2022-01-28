////////////////////
//// Build
import React, { useState } from 'react'
////////////////////
//// Environmental
import { Header, SeeMore, SubTitle } from "../../styles/Typography";
import { BlogImage } from "../../styles/Images";
import { Gradient } from "../../styles/Graphics";
import { BlogContainer } from "../../styles/Layout";

export default function Blog({ blog: { blogName, blogOwner, imageUrl, description, startTime } }) {
    const [ showMore, setShowMore ] = useState(false)


    return (

        <BlogContainer className="card" showMore={ showMore } onClick={ () => setShowMore(!showMore) }>
            <Header>
                <h3>
                    { blogName }
                </h3>
                <SubTitle>
                    { blogOwner?.username }
                </SubTitle>
            </Header>
            <BlogImage src={ imageUrl } alt={ blogName }/>
            <p>
                { description }
            </p>


            <small>{ startTime }</small>

            { !showMore &&
                <Gradient>
                    <SeeMore>
                        Show more
                    </SeeMore>
                </Gradient>
            }

        </BlogContainer>
    )
}


/** Created by ownwindows on 04-01-22 **/
