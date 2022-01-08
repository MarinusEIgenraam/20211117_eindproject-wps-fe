////////////////////
//// Build
import styled from 'styled-components';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
////////////////////
//// Environmental
import { RiLoginCircleFill } from "react-icons/ri";
import { AuthContext } from "../../../context/AuthProvider";
import { UtilityContext } from "../../../context/UtilityProvider";
import LogoLoader from "../../shared/elements/LogoLoader";
import Tooltip from "../../shared/elements/Tooltip";
import useMediaQuery from "../../../hooks/useMediaQuery";
import ThemeSwitch from "../../shared/elements/clickables/ThemeSwitch";
import LogoLoaderV2 from "../../shared/elements/LogoLoader";

////////////////////
//// External

export default function Navbar() {
    const { isAuth, user } = useContext(AuthContext);
    const [ menuOpen, setMenuOpen ] = useState(false);
    const [ navActive, setNavActive ] = useState(false);

    useEffect(() => {

    }, [ isAuth ]);

    const changeBackground = () => {
        if (window.scrollY >= 80) {
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
                    <MenuLink activeClassName="active" className="highlight" to="/register">Register</MenuLink> }
                <MenuLink activeClassName="active" to="/blogs">Blogs</MenuLink>
                <MenuLink activeClassName="active" to="/projects">Projects</MenuLink>
                <MenuLink activeClassName="active" to="/about">About</MenuLink>
                <MenuLink activeClassName="active" to="/users">Users</MenuLink>
                <a>{ isAuth }</a>
                { isAuth &&
                    <MenuLink to="/me">Portal</MenuLink>
                }

                { useMediaQuery('(max-width: 768px)') ?
                    <MenuLink activeClassName="active" to="/login">Login</MenuLink>

                    :
                    <MenuLink activeClassName="active" className="icon-link" to="/login">
                        <Tooltip text="Login">
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
  display: flex;
  padding: 1rem 1rem;
  position: fixed;
  width: 100%;
  flex-direction: row;
  align-items: baseline;
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
  @media (max-width: 888px) {
    align-items: center;

  }
`;


const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${ props => props.theme.text };
  position: relative;


  @media (max-width: 768px) {
    justify-content: center;
    overflow: hidden;
    flex-direction: column;
    background: ${ props => props.theme.background };

    height: ${ ({ menuOpen }) => ( menuOpen ? "92vh" : "0" ) };
    transition: height 1s ease-in;
    width: 100%;
  }
`
const MenuLink = styled(NavLink)`

  cursor: pointer;
  padding: 0rem 1rem;
  font-weight: 300;
  text-decoration: none;
  color: ${ props => props.theme.text };
  transition: all 0.3s ease-in;
  font-size: 1.2rem;

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
`

const Hamburger = styled.div`
  display: none;
  margin-top: 5px;
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

  @media (max-width: 768px) {
    display: flex;
  }
`
/** Created by ownwindows on 03-01-22 **/
