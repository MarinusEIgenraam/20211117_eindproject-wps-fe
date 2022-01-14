////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export default function Blog({blog:{blogName, blogOwner, url, description, startTime}}) {

    return (
        <>
            <Header>
                {blogName}
            </Header>
            <Owner>
                {blogOwner.username}
            </Owner>
            <CreationDate>
                {startTime}
            </CreationDate>
            <Image>
                {url}
            </Image>
            <Content>
                {description}
            </Content>
        </>
    )
}

const Header = styled.div`

`

const Owner = styled.div`

`
const CreationDate = styled.div`

`

const Image = styled.div`

`

const Content = styled.div`

`

/** Created by ownwindows on 04-01-22 **/
