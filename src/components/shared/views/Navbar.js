////////////////////
//// Build
import styled from 'styled-components';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
////////////////////
//// Environmental
import { QUERIES } from "../../../services/helpers/mediaQueries";
import useMediaQuery from "../../../hooks/useMediaQuery";
import { AuthContext } from "../../../context/AuthProvider";
import { RiLoginCircleFill } from "react-icons/ri";
import ThemeSwitch from "../elements/clickables/ThemeSwitch";
import LogoLoader from "../elements/messages/LogoLoader";
import Tooltip from "../elements/messages/Tooltip";

////////////////////
//// External

export default function Navbar() {
    const { isAuth, user, logout } = useContext(AuthContext);
    const [ menuOpen, setMenuOpen ] = useState(false);
    const [ navActive, setNavActive ] = useState(false);

    useEffect(() => {

    }, [ isAuth ]);

    const changeBackground = () => {
        if (window.scrollY >= 30) {
            setNavActive(true);
        } else {
            setNavActive(false)
        }
    };

    window.addEventListener('scroll', changeBackground);

    return (
        <Nav navActive={ navActive }>
            {/*<LogoLoader/>*/ }
            <LogoLoader navActive={ navActive }/>
            <Hamburger onClick={ () => setMenuOpen(!menuOpen) }>
                <span/>
                <span/>
                <span/>
            </Hamburger>
            <Menu menuOpen={ menuOpen } navActive={ navActive }>
                { !isAuth &&
                    <MenuLink className="highlight" onClick={ () => setMenuOpen(false) }
                              to="/register">Register</MenuLink> }
                <MenuLink onClick={ () => setMenuOpen(false) } to="/blogs">Blogs</MenuLink>
                <MenuLink onClick={ () => setMenuOpen(false) }
                          to="/projects">Projects</MenuLink>
                <MenuLink onClick={ () => setMenuOpen(false) } to="/about">About</MenuLink>
                <MenuLink onClick={ () => setMenuOpen(false) } to="/users">Users</MenuLink>
                <a>{ isAuth }</a>
                { isAuth &&
                    <MenuLink onClick={ () => setMenuOpen(false) } to="/me">Portal</MenuLink>
                }

                { useMediaQuery('(max-width: 768px)') ?
                    ( isAuth
                            ?
                            <MenuLink to="/"
                                      onClick={ ( logout, () => setMenuOpen(false) ) }>Logout</MenuLink>

                            :
                            <MenuLink onClick={ () => setMenuOpen(false) }
                                      to="/">Login</MenuLink>

                    )

                    :
                    ( isAuth
                            ?
                            <MenuLink onClick={ () => setMenuOpen(false) }
                                      className="icon-link" to="/" onClick={ logout }>
                                <Tooltip text="Logout">
                                    <RiLoginCircleFill size={ 30 }/>
                                </Tooltip>
                            </MenuLink>
                            :
                            <MenuLink onClick={ () => setMenuOpen(false) }
                                      className="icon-link" to="/login">
                                <Tooltip text="Login">
                                    <RiLoginCircleFill size={ 30 }/>
                                </Tooltip>
                            </MenuLink>
                    )

                }

                <ThemeSwitch onClick={() => setMenuOpen(false) }/>


            </Menu>

        </Nav>
    )
}


const Nav = styled.div`
  z-index: 5;
  display: flex;
  position: fixed;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  ${ ({ navActive, theme }) =>
          ( navActive )
                  ?
                  {
                    background: theme.windowBackground,
                    "box-shadow": `0 1px 10px ${ theme.boxShadow }`
                  }
                  :
                  "background: transparent"
  };
  border-radius: 2px;
  @media (min-width: 1154px) {
    align-items: baseline;

  }
`

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${ props => props.theme.text };
  position: relative;

  
  @media (max-width: 1154px) {
    justify-content: center;
    overflow: hidden;
    flex-direction: column;
    background: ${ props => props.theme.background };

    height: ${ ({ menuOpen }) => ( menuOpen ? "100vh" : "0" ) };
    transition: height 0.5s ease-in;
    width: 100%;
  }
`

const MenuLink = styled(NavLink)`

  cursor: pointer;
  padding: 1rem;
  text-decoration: none;
  color: ${ props => props.theme.text };
  transition: all 0.3s ease-in;
  font-size: 1.2rem;

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

`

const Hamburger = styled.div`
  display: flex;
  margin: 1rem;
  flex-direction: column;
  align-self: center;
  cursor: pointer;

  span {
    height: 4px;
    width: 25px;
    background: ${ props => props.theme.text };
    margin-bottom: 4px;
    border-radius: 5.5px;
  }

  @media (min-width: 1154px) {
    display: none;

  }
`
/** Created by ownwindows on 03-01-22 **/
