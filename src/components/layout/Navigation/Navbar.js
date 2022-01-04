////////////////////
//// Build
import styled from 'styled-components';
import React, { useContext, useState } from 'react';

////////////////////
//// Environmental
import { AuthContext } from "../../../context/AuthProvider";
import { UtilityContext } from "../../../context/UtilityProvider";
import LogoLoader from "../../shared/LogoLoader";

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
                <MenuLink href="">About</MenuLink>
                <MenuLink href="">Register</MenuLink>
                <MenuLink href="">Contact</MenuLink>
            </Menu>
        </Nav>
    )
}

const Nav = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: white;
`

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    height: 3px;
    width: 25px;
    background: var(--primary);
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
  color: var(--primary);
  transition: all 0.3s ease-in;
  font-size: 1.2rem;

  &:hover {
    color: var(--tertiary);
  }
`

/** Created by ownwindows on 03-01-22 **/

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;

    max-height: ${ ({ menuOpen }) => ( menuOpen ? "300px" : "0" ) };
    transition: max-height 0.3s ease-in;

  }
`
