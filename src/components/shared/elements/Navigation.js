////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';
import { NavLink } from "react-router-dom";

////////////////////
//// Environmental

////////////////////
//// External

export const A = styled.a`
  color: ${ props => props.theme.text };
  &:hover {
    ${ props => props.theme.sub_text };
  }
`;

export const MenuLink = styled(NavLink)`
  cursor: pointer;
  font-weight: 300;
  text-decoration: none;
  color: ${ props => props.theme.text };
  transition: all 0.3s ease-in;
  font-size: 1.2rem;
  display: inline-flex;
  padding: 0.25em 2em;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  outline: 0;

  &:nth-child(1) {
    padding-left: 0;
  }

  &.active {
    font-weight: 500;
    color: ${ props => props.theme.boxShadow };

  }

  &.highlight {
    font-weight: 500;
  }

  &:hover {
    color: ${ props => props.theme.sub_text };
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
export const ProjectName = styled(NavLink)`
  //flex-grow: 3;
  color: ${ props => props.theme.header };

`

export const RepoLink = styled(A)`
  height: 100%;
  color: ${ props => props.theme.header };
  display: flex;
  align-items: center;
  width: 100%;
`;

export const bstyledButton = styled.button`
  display: inline-block;
  box-sizing: border-box;
  padding: 0.25em 2em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  border: 2px solid #41addd;
  color: #41addd;

  &:active {
    background: #41addd;
    color: #fff;
  }
`;

/** Created by ownwindows on 15-01-22 **/

