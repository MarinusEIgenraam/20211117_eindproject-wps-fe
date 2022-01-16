////////////////////
//// Build
import React, { useState } from 'react'
import styled from 'styled-components';
import { PageContainer } from "../../shared/elements/Layout";
import { SubTitle } from "../../shared/elements/Text";

////////////////////
//// Environmental

////////////////////
//// External

export default function Blog({ blog: { blogName, blogOwner, imageUrl, description, startTime } }) {
    const [ showMore, setShowMore ] = useState(false)


    return (

        <BlogContainer showMore={ showMore } onClick={ () => setShowMore(!showMore) }>
            <Header>
                <h3>
                    { blogName }
                </h3>
                <SubTitle>
                    { blogOwner?.username }
                    { imageUrl }

                </SubTitle>
            </Header>
            <p>
                { description }
            </p>
            <small>{ startTime }</small>

            {!showMore &&
                <Gradient>
                    <SeeMore>
                        Show more
                    </SeeMore>
                </Gradient>
            }

        </BlogContainer>
    )
}

const SeeMore = styled.p`
  color: ${ props => props.theme.text };

`

const Gradient = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  height: 70%;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: linear-gradient(hsla(0, 0%, 100%, 0), hsl(0, 0%, 100%));
`

const Header = styled.div`
  margin-bottom: 20px;
`

const Owner = styled.div`

`


const BlogContainer = styled.div`
  position: relative;
  padding: 1rem;
  width: 70vw;
  margin-top: 10px;
  background: ${ props => props.theme.background };
  border: solid var(--box-border-medium) ${ props => props.theme.border };
  box-shadow: ${ props => props.theme.shadow };
  overflow: hidden;
  height: ${ ({ showMore, theme }) =>
    ( showMore )
        ?
        "max-content"
        :
         "120px"
    };
  animation: height 15s ease-in;


`
const CreationDate = styled.div`

`

const Image = styled.div`

`

const Content = styled.div`

`

/** Created by ownwindows on 04-01-22 **/
