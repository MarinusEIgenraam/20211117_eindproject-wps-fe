////////////////////
//// Build
import styled from 'styled-components';
import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'

////////////////////
//// Environmental
import { AuthContext } from "../../../context/AuthProvider";
import { UtilityContext } from "../../../context/UtilityProvider";
import LogoLoader from "../../shared/LogoLoader";
import Tooltip from "../../shared/elements/Tooltip";
import useMediaQuery from "../../../hooks/useMediaQuery";

////////////////////
//// External

export default function Navbar() {
    const [ menuOpen, setMenuOpen ] = useState(false);
    const { isAuthenticated } = useContext(AuthContext);
    const { isLoading } = useContext(UtilityContext);

    return (
        <Nav>
            <LogoLoader/>
            <Hamburger onClick={ () => setMenuOpen(!menuOpen) }>
                <span/>
                <span/>
                <span/>
            </Hamburger>
            <Menu menuOpen={ menuOpen }>
                <MenuLink href="/blogs">Blogs</MenuLink>
                <MenuLink href="/projects">Projects</MenuLink>
                {/*<MenuLink href="/register">Register</MenuLink>*/ }
                {/*<MenuLink href="/users">Users</MenuLink>*/ }
                <MenuLink href="/about">About</MenuLink>
                { isAuthenticated &&
                    <MenuLink href="/me">Portal</MenuLink>
                }
                { useMediaQuery('(max-width: 768px)') ?
                    <MenuLink href="/login">Login</MenuLink>

                    :
                    <MenuLink className="icon-link" href="/register">
                        <Tooltip text="Login">
                            <FontAwesomeIcon className="fontAwesome-small" icon={ faSignInAlt }/>
                        </Tooltip>
                    </MenuLink>


                }


            </Menu>
        </Nav>
    )
}


const Nav = styled.div`
  padding: 0 0.5rem;
  position: fixed;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: white;
  border-radius: 2px;

`

const Hamburger = styled.div`
  display: none;
  position: relative;
  flex-direction: column;
  cursor: pointer;


  span {
    height: 3px;
    width: 25px;
    background: var(--secondary);
    margin-bottom: 6px;
    border-radius: 1.5px;
  }


  @media (max-width: 768px) {
    display: flex;
  }
`


const MenuLink = styled.a`
  padding: 1rem 2rem;
  cursor: pointer;
  font-weight: 300;
  text-align: center;
  text-decoration: none;
  color: var(--secondary);
  transition: all 0.3s ease-in;
  font-size: 1.2rem;
  
  &.icon-link {
    padding: 0rem 0.5rem;
  }

  &:hover {
    color: var(--tertiary);
  }
`

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  color: var(--secondary);

  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;

    max-height: ${ ({ menuOpen }) => ( menuOpen ? "300px" : "0" ) };
    transition: max-height 0.3s ease-in;

  }
`

/** Created by ownwindows on 03-01-22 **/
