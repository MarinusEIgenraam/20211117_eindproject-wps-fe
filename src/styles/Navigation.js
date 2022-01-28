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
`

/** Created by ownwindows on 15-01-22 **/

