////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export const Img = styled.img`
  width: 100%;
  margin: 0 auto;
  display: block;
`;

export const Image = styled.img`
  height: 200px;
  aspect-ratio: 1/1;
  
  &.with-margin{
   margin-left: 1rem; 
  }
`

export const ProfileImage = styled.img`
  aspect-ratio: 1/1;
  border: solid var(--box-border-medium) ${ props => props.theme.border };
`

export const BackgroundImage = styled.img`
  filter: invert(15%) sepia(28%) saturate(788%) hue-rotate(146deg) brightness(90%) contrast(97%);
  
  width: 70vw;
  overflow: hidden;
  

  &.hero-logo {
    width: 90vw;
  }
`

export const WindowVisual = styled.img`
  grid-area: visual;
  width: 100%;
  max-width: 500px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`
export const BannerVisual = styled.img`
  grid-area: visual;
  width: 70vw;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

export const ProjectHero = styled.div`
  flex: 1 1 auto;
  background-image: url('${image=> image.image}');
  background-size: cover;
  border: solid var(--box-border-medium) ${ props => props.theme.border };
  min-width: 100px;
  max-height: 200px;
  aspect-ratio: 1 / 1;
`
export const Hero = styled.div`
  background-image: url('${image=> image.image}');
  background-size: cover;
  border: solid var(--box-border-medium) ${ props => props.theme.border };
  width: 100%;
  max-height: 200px;
  aspect-ratio: 1 / 1;
`

export const BlogImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  border: solid var(--box-border-thin) ${ props => props.theme.border };
`

/** Created by ownwindows on 15-01-22 **/
