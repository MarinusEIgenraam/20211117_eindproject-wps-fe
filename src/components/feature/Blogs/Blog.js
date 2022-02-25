////////////////////
//// Build
import React, { useState } from 'react'
////////////////////
//// Environmental
import { Date, Header, Owner, PrimaryInfo, SecondaryInfo } from "../../../styles/Typography";
import { BlogImage } from "../../../styles/Images";
import { BlogContainer, DetailRow } from "../../../styles/Layout";
import { LinkHeader, LinkRow } from "../../../styles/Navigation";
import { BsArrowRightCircleFill } from "react-icons/all";

export default function Blog({ blog }) {
    const [ showMore, setShowMore ] = useState(false)


    return (

        <BlogContainer className="card" onClick={ () => setShowMore(!showMore) }>
            <Header>
                <LinkHeader className="blog" to={ `/blogs/${ blog.blogId }` }>
                    { blog.blogName }
                </LinkHeader>
            </Header>
            <BlogImage src={ blog.imageUrl } alt={ blog.blogName }/>
            <p>
                { blog.description }
            </p>
            <LinkRow to={ `/blogs/${ blog.blogId }` } className="double">
                For comments and more information
                <BsArrowRightCircleFill
                    size={ 15 }
                />
            </LinkRow>
            <DetailRow className="users no-margin">
                <PrimaryInfo>
                    <Owner>
                        { blog.blogOwner.username }
                    </Owner>
                </PrimaryInfo>
                <SecondaryInfo>
                    {/*<Category>{ project.category.name }</Category>*/ }
                    <Date className="blog">{ blog.startTime }</Date>
                </SecondaryInfo>
            </DetailRow>

        </BlogContainer>
    )
}


/** Created by ownwindows on 04-01-22 **/
