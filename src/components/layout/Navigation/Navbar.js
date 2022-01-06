////////////////////
//// Build
import styled from 'styled-components';
import React, { useContext, useEffect, useState } from 'react';
import { RiLoginCircleFill } from "react-icons/ri";

////////////////////
//// Environmental
import { AuthContext } from "../../../context/AuthProvider";
import { UtilityContext } from "../../../context/UtilityProvider";
import LogoLoader from "../../shared/elements/LogoLoader";
import Tooltip from "../../shared/elements/Tooltip";
import useMediaQuery from "../../../hooks/useMediaQuery";
import ThemeSwitch from "../../shared/elements/clickables/ThemeSwitch";

////////////////////
//// External

export default function Navbar() {
    const [ menuOpen, setMenuOpen ] = useState(false);
    const { isAuth, user } = useContext(AuthContext);

    useEffect(() => {

    },[isAuth]);

    return (
        <Nav>
            <LogoLoader/>
            <Hamburger onClick={ () => setMenuOpen(!menuOpen) }>
                <span/>
                <span/>
                <span/>
            </Hamburger>
            <Menu menuOpen={ menuOpen }>
                <MenuLink className="hightlight" href="/register">Register</MenuLink>
                <MenuLink href="/blogs">Blogs</MenuLink>
                <MenuLink href="/projects">Projects</MenuLink>
                <MenuLink href="/about">About</MenuLink>
                <MenuLink href="/users">Users</MenuLink>
                <a>{isAuth}</a>
                { isAuth &&
                    <MenuLink href="/me">Portal</MenuLink>
                }
                { useMediaQuery('(max-width: 768px)') ?
                    <MenuLink href="/login">Login</MenuLink>

                    :
                    <MenuLink className="icon-link" href="/register">
                        <Tooltip text="Logout">
                            <RiLoginCircleFill size={ 30 }/>
                        </Tooltip>
                    </MenuLink>
                }
                <ThemeSwitch/>


            </Menu>
        </Nav>
    )
}


const Nav = styled.div`
  z-index: 5;
  padding: 0 0.5rem;
  position: fixed;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: ${ props => props.theme.windowBackground };
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
    background: ${ props => props.theme.text };
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
  color: ${ props => props.theme.text };
  transition: all 0.3s ease-in;
  font-size: 1.2rem;

  &.icon-link {
    padding: 0rem 0.5rem;
  }

  &:hover {
    color: ${ props => props.theme.sub_text };
  }

  &.hightlight {
font-weight: 500;
  }
`

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  color: ${ props => props.theme.text };

  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${ ({ menuOpen }) => ( menuOpen ? "300px" : "0" ) };
    transition: max-height 0.3s ease-in;
  }
`

/** Created by ownwindows on 03-01-22 **/
