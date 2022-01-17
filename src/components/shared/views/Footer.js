////////////////////
//// Build
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { DetailContainer, H2 } from "../elements/Text";

////////////////////
//// Environmental

////////////////////
//// External

export default function Footer() {
    const [ fixed, setFixed ] = useState(true);


    const changeBackground = () => {
        if (window.scrollY <= 1) {
            setFixed(true);
        } else {
            setFixed(false)
        }
    };


    window.addEventListener('scroll', changeBackground);

    console.log(fixed)
    return (
        <Wrapper fixed={fixed}>
            <DetailContainer>
                <H2>
                    Contact:
                </H2>
            </DetailContainer>
        </Wrapper>
    )
}

const Wrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem;
  background: ${ props => props.theme.windowBackground };
  margin-top: 250px;
  width: 100%;
  transition: all 500ms;
  //z-index: 10;


  ${ ({ fixed, theme }) => ( fixed )
          ?
          {
            "position": "fixed;",
            "bottom": 0,
            "box-shadow": `0 5px 15px ${ theme.boxShadow }`
          }
          :
          {
            "position": "relative;",

          }
  }
  transition: 0


`


/** Created by ownwindows on 15-01-22 **/

