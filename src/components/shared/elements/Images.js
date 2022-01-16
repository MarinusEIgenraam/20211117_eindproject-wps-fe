////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export const Img = styled.image`
  width: 100%;
  margin: 0 auto;
  display: block;
`;

export const Image = styled.img`
  width: 100%;
  height: 200px;
  aspect-ratio: 1/1;
`

export const BackgroundImage = styled.img`
  width: 100vw;
  overflow: hidden;
`

export const ProjectHero = styled.div`
  flex: 0 4 auto;
  border: solid var(--box-border-medium) ${ props => props.theme.border };
  min-width: 100px;
  background: blue;
  aspect-ratio: 1 / 1;
`


/** Created by ownwindows on 15-01-22 **/
