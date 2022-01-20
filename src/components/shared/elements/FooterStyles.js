////////////////////
//// Build
import React, { useState } from 'react'
import styled from 'styled-components';
import { QUERIES } from "../../../services/helpers/mediaQueries";

////////////////////
//// Environmental

////////////////////
//// External


export const FooterContainer = styled.footer`
  max-width: 100%;
  padding: 0.5rem 1rem ;
  background: ${ props => props.theme.windowBackground };
  margin-top: 250px;
  width: 100%;
  transition: all 500ms;

  @media ${QUERIES.tabletMini} {
    padding: 0rem 2rem;
  }

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
  transition: 0;
`;



/** Created by ownwindows on 19-01-22 **/
