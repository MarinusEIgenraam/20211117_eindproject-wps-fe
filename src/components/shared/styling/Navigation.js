////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import { QUERIES } from "../../../services/helpers/mediaQueries";

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

/** Created by ownwindows on 15-01-22 **/

