////////////////////
//// Build
import React, { useState } from 'react'
import styled from 'styled-components';
import { PageContainer } from "../../shared/styling/Layout";
import { SubTitle } from "../../shared/styling/Text";
import { BackgroundImage } from "../../shared/styling/Images";

////////////////////
//// Environmental

////////////////////
//// External

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
            <Image src={ imageUrl } alt={ blogName }/>
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

const SeeMore = styled.p`
  color: ${ props => props.theme.text };
`


const Header = styled.div`
  margin-bottom: 20px;
`

const Image = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  border: solid var(--box-border-medium) ${ props => props.theme.border };
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


const BlogContainer = styled.div`
  padding: 1rem;
  position: relative;
  width: 100%;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.2);
  border: solid var(--box-border-medium) ${ props => props.theme.border };
  float: left;
  margin-bottom: 12px;
  overflow: hidden;
  margin-top: 10px;


  height: ${ ({ showMore, theme }) =>
          ( showMore )
                  ?
                  "min-content"
                  :
                  "500px"
  };

`


/** Created by ownwindows on 04-01-22 **/
