////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';
import { NavLink } from "react-router-dom";

export const ProjectLink = styled(NavLink)`
  display: inline-block;
  margin-left: 1ch;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
  color: ${ props => props.theme.sub_text };

  max-width: 20ch;
`

export const ProjectCardLink = styled(NavLink)`
  display: inline-block;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
  padding-right: 1rem;
  font-weight: 700;
  color: ${ props => props.theme.text };

  &.blog {
    overflow: initial;
    white-space: initial;
  }
`

export const ListLink = styled(NavLink)`
  font-size: 1rem;
  color: ${ props => props.theme.text };
  width: 100%;

  :visited {
    color: ${ props => props.theme.sub_text };


`

export const LinkRow = styled(NavLink)`
  display: flex;
  font-size: 0.8rem;
  color: ${ props => props.theme.text };
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
  padding: 0.25rem 0;
  border-top: solid var(--box-border-medium) ${ props => props.theme.border };

  :visited {
    color: ${ props => props.theme.sub_text };

  }
  &.active {
    color: ${ props => props.theme.sub_text };

  }

  &.double {
    align-items: end;

  }

  &.no-margin {
    margin-top: 0;
  }

  .light {
    font-weight: 300;
  }
`
/** Created by ownwindows on 15-01-22 **/

