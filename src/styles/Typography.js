////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';
import { QUERIES } from "../services/helpers/mediaQueries";

////////////////////
//// Environmental

////////////////////
//// External

export const CenteredHeader = styled.h1`
  text-align: center;
  font-size: 2em;
  margin-bottom: 0.25em;
  ${ props => props.theme.text };
`;

export const CenteredSubHeader = styled.h2`
  text-align: center;
  font-size: 1.5em;
  margin-bottom: 0.25em;
  ${ props => props.theme.text };
`;

export const SubHeader = styled.h4`
  margin-bottom: .5rem;
  color: ${ props => props.theme.sub_text };
`
export const Owner = styled.span`
  font-weight: 500;
`

export const Date = styled.span`
  font-size: 0.9rem;
  font-weight: 700;
  margin-right: 1rem;

  &.blog {
    margin: 0;
  }
`

export const Category = styled.span`
  font-size: 0.9rem;
  margin-right: 1rem;
`

export const SecondaryInfo = styled.div`
  display: flex;
  flex-direction: row;
`
export const PrimaryInfo = styled.div`
`
export const User = styled.span`
  font-size: 0.9rem;
  justify-content: start;

  &:before {
    content: ',';
    vertical-align: baseline;
    opacity: 0;
    transition: opacity .5s;
    margin: 0 .25rem 0 0;
  }

  &.on {
    opacity: 1;
  }

  &.on ~ &.on {
    &:before {
      opacity: 1;
    }
  }

`

export const Users = styled.div`
  font-size: 0.9rem;

`

export const Votes = styled.footer`
  font-size: 0.9rem;
`

export const Description = styled.div`
  flex: 4;
  padding: 0 1rem;
`

export const SubTitle = styled.small`
  margin-bottom: 30px;
  font-size: 1rem;
  color: ${ props => props.theme.text };
`

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  min-height: 200px;

  &.userListDetails {
    min-height: 0;
  }

  &.projectDetails {
    justify-content: space-between;
  }

`

export const SeeMore = styled.p`
  color: ${ props => props.theme.text };
`

export const Header = styled.div`
  margin-bottom: 20px;
`

export const FormSectionHeading = styled.h3`
  margin: 2rem 0rem 1rem 0rem;
  font-size: 0.9rem;
  color: ${ props => props.theme.sub_text };
`;

export const Heading = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 2rem;
  padding: 0;
  color: ${ props => props.theme.text };

  @media ${ QUERIES.tabletMini } {
    font-size: 2rem;
  }
`;

export const SubHeading = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 2rem;
  font-weight: 300;
  color: ${ props => props.theme.text };

  @media ${ QUERIES.tabletMini } {
    font-size: 2rem;
  }
`;


export const SubFormHeading = styled.h4`
  width: 100%;
  margin: 0.5rem 0rem 0.5rem 0rem;
  font-size: 0.8rem;
  color: ${ props => props.theme.text };
`;

export const ProjectDescription = styled.p`
  margin-top: 0.5rem;
  font-size: 0.9rem;
`

export const ProjectMain = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

export const HeaderBox = styled.div`
  display: flex;
  align-items: end;
  
  width: 100%;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const HeaderBar = styled.div`
  background: ${ props => props.theme.sub_text };
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  padding: 1rem 1rem 0.5rem 1rem;
  font-size: 1rem;
  color: var(--white);
  border: solid var(--box-border-medium) ${ props => props.theme.createBorder };
  box-shadow: ${ props => props.theme.createShadow };

  h3 {
    font-weight: 300;
  }
`

/** Created by ownwindows on 15-01-22 **/
